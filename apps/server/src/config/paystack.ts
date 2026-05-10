import { env } from "./env";

interface InitializePaymentPayload {
  email: string;
  amount: number;
  plan?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}

export const paystack = {
  initializePayment: async (payload: InitializePaymentPayload) => {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: env.PAYSTACK_SECRET_KEY,
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  },

  verifyPayment: async (reference: string) => {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: env.PAYSTACK_SECRET_KEY,
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
      }
    );

    const data = await response.json();
    return { ok: response.ok, data };
  },
};
