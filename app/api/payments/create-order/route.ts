import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getProductPrice, isMockPaymentsAllowed, isPaymentProduct, type PaymentProduct } from "@/lib/payments";
import { getRequestAddress, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  productType: z.string(),
  name: z.string().min(2),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const limit = rateLimit(`create-order:${getRequestAddress(req)}`, 10, 60 * 60 * 1000);
    if (!limit.allowed) return NextResponse.json({ success: false, error: "Please wait before creating another payment." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    const body = await req.json();
    const { productType: requestedProduct, name, email } = schema.parse(body);
    if (!isPaymentProduct(requestedProduct)) {
      return NextResponse.json({ success: false, error: "Unknown payment product" }, { status: 400 });
    }
    const productType: PaymentProduct = requestedProduct;
    const amount = getProductPrice(productType);

    // Only initialize Razorpay if keys are configured
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || keyId.includes("YOUR_KEY")) {
      if (!isMockPaymentsAllowed()) {
        return NextResponse.json({ success: false, error: "Payments are not configured" }, { status: 503 });
      }
      const orderId = `order_dev_${Date.now()}`;
      await db.payment.create({
        data: {
          providerOrderId: orderId,
          productType,
          amountPaise: amount * 100,
          metadataJson: JSON.stringify({ name, email }),
          status: "paid",
        },
      });
      return NextResponse.json({
        success: true,
        orderId,
        amount: amount * 100, // paise
        currency: "INR",
        keyId: "rzp_test_dev",
        mode: "development",
        productType,
      });
    }

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { name, email: email ?? "", productType },
    });

    await db.payment.create({
      data: {
        providerOrderId: order.id,
        productType,
        amountPaise: Number(order.amount),
        currency: String(order.currency),
        metadataJson: JSON.stringify({ name, email }),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      productType,
    });
  } catch (err) {
    console.error("[payments/create-order]", err);
    const message = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
