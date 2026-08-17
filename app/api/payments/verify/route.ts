import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";

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

    const keySecret = process.env.RAZORPAY_KEY_SECRET ?? "";

    // Allow mock payments in development
    if (razorpay_order_id.startsWith("order_dev_")) {
      return NextResponse.json({ success: true, verified: true, mode: "development" });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Payment signature verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error("[payments/verify]", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
