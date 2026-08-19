import crypto from "crypto";
import { db } from "@/lib/db";
import { getService, isServiceType, type ServiceType } from "@/lib/services";

export const PAYMENT_PRODUCTS = ["report", "numerology", "name-balancing"] as const;
export type PaymentProduct = (typeof PAYMENT_PRODUCTS)[number];

export function isPaymentProduct(value: string): value is PaymentProduct {
  return PAYMENT_PRODUCTS.includes(value as PaymentProduct);
}

export function getProductPrice(product: PaymentProduct) {
  return product === "report" ? 99 : getService(product as ServiceType).price;
}

export function isMockPaymentsAllowed() {
  return process.env.NODE_ENV !== "production" && process.env.ALLOW_MOCK_PAYMENTS === "true";
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function getVerifiedPayment(paymentId: string, productType: PaymentProduct, amount: number) {
  return db.payment.findFirst({
    where: {
      providerPaymentId: paymentId,
      productType,
      amountPaise: amount * 100,
      currency: "INR",
      status: "paid",
    },
  });
}

export async function markPaymentPaid(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  if (!verifyRazorpaySignature(input.orderId, input.paymentId, input.signature)) return null;
  return db.payment.update({
    where: { providerOrderId: input.orderId },
    data: {
      providerPaymentId: input.paymentId,
      status: "paid",
    },
  });
}
