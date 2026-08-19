export type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

export function openRazorpayCheckout(input: {
  key: string;
  amount: number;
  currency: string;
  orderId: string;
  name: string;
  description: string;
  prefill?: { name?: string; email?: string; contact?: string };
}): Promise<RazorpayPaymentResponse> {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Secure checkout could not be loaded. Please refresh and try again."));
      return;
    }

    const checkout = new window.Razorpay({
      key: input.key,
      amount: input.amount,
      currency: input.currency,
      order_id: input.orderId,
      name: input.name,
      description: input.description,
      prefill: input.prefill,
      theme: { color: "#D4AF37" },
      handler: resolve,
      modal: { ondismiss: () => reject(new Error("Payment was cancelled.")) },
    });

    checkout.on("payment.failed", (response) => {
      reject(new Error(response.error?.description || "Payment failed. Please try again."));
    });
    checkout.open();
  });
}
