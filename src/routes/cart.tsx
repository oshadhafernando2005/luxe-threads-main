import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag | Lumen Studio" },
      { name: "description", content: "Review the premium t-shirts in your Lumen Studio bag and checkout." },
      { property: "og:title", content: "Your Bag | Lumen Studio" },
      { property: "og:description", content: "Review the premium t-shirts in your bag and checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <h1 className="display-xl text-3xl sm:text-4xl">Your Bag</h1>

      {lines.length === 0 ? (
        <div className="surface-card mt-8 flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary">
            <ShoppingBag className="h-6 w-6" />
          </span>
          <p className="text-sm text-muted-foreground">Your bag is empty — the good stuff is one tap away.</p>
          <Link
            to="/men"
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
                  <Link to="/product/$productId" params={{ productId: product.id }} className="shrink-0">
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
                      <span className="font-display font-bold">{formatPrice(product.price * line.qty)}</span>
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
              <span className="font-display text-xl font-bold">{formatPrice(subtotal + shipping)}</span>
            </div>
            <button
              type="button"
              className="press mt-2 h-14 w-full rounded-full bg-coral text-sm font-semibold text-coral-foreground"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
