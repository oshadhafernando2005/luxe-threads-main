const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

type EmailJsResponse = {
  status: number;
  text: string;
};

export type OrderEmailParams = {
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: string;
  subtotal: string;
  shipping: string;
  total: string;
  payment_method: string;
};

export async function sendOrderEmail(params: OrderEmailParams): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured. Add the VITE_EMAILJS_* values to your .env file.");
  }

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: params,
    }),
  });

  const result = (await response.json().catch(() => null)) as EmailJsResponse | null;

  if (!response.ok) {
    throw new Error(result?.text || "EmailJS could not send the order.");
  }
}
