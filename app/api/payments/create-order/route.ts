import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getService, isServiceType } from "@/lib/services";

const schema = z.object({
  amount: z.number().positive().optional(),
  serviceType: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount: requestedAmount, serviceType, name, email } = schema.parse(body);
    const amount = serviceType && isServiceType(serviceType) ? getService(serviceType).price : requestedAmount ?? 99;

    // Only initialize Razorpay if keys are configured
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || keyId.includes("YOUR_KEY")) {
      // Return a mock order for development
      return NextResponse.json({
        success: true,
        orderId: `order_dev_${Date.now()}`,
        amount: amount * 100, // paise
        currency: "INR",
        keyId: "rzp_test_dev",
        mode: "development",
        serviceType,
        note: "Razorpay keys not configured — using development mock",
      });
    }

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { name, email: email ?? "", serviceType: serviceType ?? "" },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      serviceType,
    });
  } catch (err) {
    console.error("[payments/create-order]", err);
    const message = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
