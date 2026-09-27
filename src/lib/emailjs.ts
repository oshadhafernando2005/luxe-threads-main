import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_bcv032d";
const TEMPLATE_ID = "template_x0g97ab";
const PUBLIC_KEY = "SvZ-CDs6Shj2iO6Mn";

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

export async function sendOrderEmail(
  params: OrderEmailParams,
): Promise<void> {
  console.log("========== EMAILJS START ==========");
  console.log("Service ID:", SERVICE_ID);
  console.log("Template ID:", TEMPLATE_ID);
  console.log("Parameters:", params);

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      params,
      {
        publicKey: PUBLIC_KEY,
      },
    );

    console.log("EmailJS SUCCESS");
    console.log("Status:", response.status);
    console.log("Text:", response.text);
  } catch (error: any) {
    console.error("========== EMAILJS ERROR ==========");
    console.error("Error:", error);
    console.error("Status:", error?.status);
    console.error("Text:", error?.text);
    console.error("Message:", error?.message);
    console.error("====================================");

    throw error;
  }
}