import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import { db } from "@/lib/db";
import { isMockPaymentsAllowed, markPaymentPaid } from "@/lib/payments";

const schema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      schema.parse(body);

    if (razorpay_order_id.startsWith("order_dev_") && isMockPaymentsAllowed()) {
      const payment = await db.payment.findUnique({ where: { providerOrderId: razorpay_order_id } });
      if (!payment) return NextResponse.json({ success: false, error: "Payment order not found" }, { status: 404 });
      return NextResponse.json({ success: true, verified: true, mode: "development" });
    }

    const payment = await db.payment.findUnique({ where: { providerOrderId: razorpay_order_id } });
    if (!payment) return NextResponse.json({ success: false, error: "Payment order not found" }, { status: 404 });
    const verified = await markPaymentPaid({ orderId: razorpay_order_id, paymentId: razorpay_payment_id, signature: razorpay_signature });
    if (!verified) {
      return NextResponse.json(
        { success: false, error: "Payment signature verification failed" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ success: false, error: "Payments are not configured" }, { status: 503 });
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const [order, providerPayment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id),
    ]);
    if (Number(order.amount) !== payment.amountPaise || Number(providerPayment.amount) !== payment.amountPaise || order.currency !== payment.currency || providerPayment.order_id !== razorpay_order_id || providerPayment.status !== "captured") {
      await db.payment.update({ where: { id: payment.id }, data: { status: "failed" } });
      return NextResponse.json({ success: false, error: "Payment amount or capture status could not be verified" }, { status: 400 });
    }

    return NextResponse.json({ success: true, verified: true, productType: payment.productType });
  } catch (err) {
    console.error("[payments/verify]", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
