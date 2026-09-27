import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { sendOrderEmail } from "@/lib/emailjs";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | West Core" },
      {
        name: "description",
        content: "Review the premium t-shirts in your West Core bag and checkout.",
      },
      { property: "og:title", content: "Your Bag | West Core" },
      {
        property: "og:description",
        content: "Review the premium t-shirts in your bag and checkout.",
      },
    ],
  }),
  component: CartPage,
});

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
};

const initialForm: CheckoutForm = {
  name: "",
  phone: "",
  address: "",
};

function createOrderId() {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  const random = Math.floor(100 + Math.random() * 900);
  return `WC-${stamp}-${random}`;
}

function CartPage() {
  const { lines, setQty, remove, clear, subtotal } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [confirmedCustomerName, setConfirmedCustomerName] = useState("");
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  const openCheckout = () => {
    setError("");
    setConfirmedOrderId("");
    setConfirmedCustomerName("");
    setCheckoutOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending || lines.length === 0) return;

    setIsSending(true);
    setError("");

    const orderId = createOrderId();
    const items = lines
      .map((line) => {
        const product = getProduct(line.productId);
        return product
          ? `${product.name} | Size: ${line.size} | Colour: ${line.color} | Qty: ${line.qty} | ${formatPrice(product.price * line.qty)}`
          : null;
      })
      .filter((item): item is string => Boolean(item))
      .join("\n");

    try {
      await sendOrderEmail({
        order_id: orderId,
        customer_name: form.name.trim(),
        customer_phone: form.phone.trim(),
        customer_address: form.address.trim(),
        items,
        subtotal: formatPrice(subtotal),
        shipping: shipping === 0 ? "Free" : formatPrice(shipping),
        total: formatPrice(total),
        payment_method: "Cash on Delivery (COD)",
      });

      clear();
      setConfirmedCustomerName(form.name.trim());
      setForm(initialForm);
      setConfirmedOrderId(orderId);
      setCheckoutOpen(false);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not place the order. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <h1 className="display-xl text-3xl sm:text-4xl">Your Bag</h1>

      {confirmedOrderId ? (
        <div className="surface-card mt-8 px-6 py-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-bold">Order confirmed!</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Thank you, {confirmedCustomerName || "your order"}. Your Cash on Delivery order has been sent successfully.
          </p>
          <p className="mt-4 text-sm font-semibold">Order reference: {confirmedOrderId}</p>
          <p className="mt-2 text-xs text-muted-foreground">We will contact you using the phone number you provided.</p>
          <Link
            to="/women"
            className="press mt-6 inline-flex h-12 items-center rounded-full bg-coral px-6 text-sm font-semibold text-coral-foreground"
          >
            Continue shopping
          </Link>
        </div>
      ) : lines.length === 0 ? (
        <div className="surface-card mt-8 flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary">
            <ShoppingBag className="h-6 w-6" />
          </span>
          <p className="text-sm text-muted-foreground">
            Your bag is empty — the good stuff is one tap away.
          </p>
          <Link
            to="/women"
            className="press inline-flex h-12 items-center rounded-full bg-coral px-6 text-sm font-semibold text-coral-foreground"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {lines.map((line) => {
              const product = getProduct(line.productId);
              if (!product) return null;
              return (
                <li key={line.id} className="surface-card rise-in flex gap-3 p-3">
                  <Link
                    to="/product/$productId"
                    params={{ productId: product.id }}
                    className="shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="h-28 w-22 rounded-xl object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{product.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {line.size} · {line.color}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => remove(line.id)}
                        className="press grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(line.id, line.qty - 1)}
                          className="press grid h-8 w-8 place-items-center rounded-full bg-card"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(line.id, line.qty + 1)}
                          className="press grid h-8 w-8 place-items-center rounded-full bg-card"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display font-bold">
                        {formatPrice(product.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="surface-card mt-6 space-y-3 p-5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-display text-xl font-bold">{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              onClick={openCheckout}
              className="press mt-2 h-14 w-full rounded-full bg-coral text-sm font-semibold text-coral-foreground"
            >
              Checkout · Cash on Delivery
            </button>
          </div>

          {checkoutOpen ? (
            <div className="surface-card mt-6 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Delivery details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter your details to place this Cash on Delivery order.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold">Full name</span>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">Phone number</span>
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="07X XXX XXXX"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">Delivery address</span>
                  <textarea
                    required
                    rows={4}
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="House number, street, city, district"
                  />
                </label>

                <div className="rounded-xl bg-secondary p-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="font-semibold">Cash on Delivery</span>
                  </div>
                  <div className="mt-2 flex justify-between gap-4">
                    <span className="text-muted-foreground">Order total</span>
                    <span className="font-bold">{formatPrice(total)}</span>
                  </div>
                </div>

                {error ? (
                  <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSending}
                  className="press h-14 w-full rounded-full bg-coral text-sm font-semibold text-coral-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Placing order…" : `Place COD Order · ${formatPrice(total)}`}
                </button>
              </form>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
