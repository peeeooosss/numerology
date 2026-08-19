import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function isValidWebhookSignature(body: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";
  if (!isValidWebhookSignature(body, signature)) {
    return NextResponse.json({ success: false, error: "Invalid webhook signature" }, { status: 400 });
  }

  try {
    const event = JSON.parse(body) as {
      event?: string;
      payload?: {
        payment?: { entity?: { id?: string; order_id?: string; status?: string } };
        order?: { entity?: { id?: string; status?: string } };
      };
    };
    const paymentEntity = event.payload?.payment?.entity;
    const orderId = paymentEntity?.order_id || event.payload?.order?.entity?.id;
    if (!orderId) return NextResponse.json({ success: true, ignored: true });

    const payment = await db.payment.findUnique({ where: { providerOrderId: orderId } });
    if (!payment) return NextResponse.json({ success: true, ignored: true });

    const isPaid = event.event === "payment.captured" || event.event === "order.paid" || paymentEntity?.status === "captured";
    await db.payment.update({
      where: { id: payment.id },
      data: {
        providerPaymentId: paymentEntity?.id || payment.providerPaymentId,
        status: isPaid ? "paid" : payment.status,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[payments/webhook]", error);
    return NextResponse.json({ success: false, error: "Webhook processing failed" }, { status: 500 });
  }
}
