import { Link } from "@tanstack/react-router";
import { Heart, Lock, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { COLOR_SWATCHES, formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
  locked = false,
}: {
  product: Product;
  index?: number;
  locked?: boolean;
}) {
  const { add, toggleFavorite, favorites } = useCart();
  const faved = favorites.includes(product.id);

  if (locked) {
    return (
      <article
        className="group rise-in surface-card overflow-hidden"
        style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
      >
        <button
          type="button"
          onClick={() => toast("This piece is locked", { description: "Check back soon." })}
          aria-label={`${product.name} — locked`}
          className="relative block w-full overflow-hidden rounded-t-2xl bg-secondary"
        >
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={1000}
            loading="lazy"
            className="aspect-[4/5] w-full scale-105 object-cover blur-md brightness-[0.6]"
          />
          <div className="absolute inset-0 grid place-items-center bg-foreground/10">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-background/90 shadow-soft backdrop-blur">
              <Lock className="h-5 w-5 text-foreground" />
            </span>
          </div>
        </button>

        <div className="space-y-2.5 p-3 sm:p-4">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-muted-foreground sm:text-base">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.category}</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-base font-bold text-muted-foreground">
              {formatPrice(product.price)}
            </span>
            <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-secondary px-3.5 text-xs font-semibold text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Locked
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group rise-in surface-card overflow-hidden"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block overflow-hidden rounded-t-2xl bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={1000}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={faved ? "Remove from favourites" : "Add to favourites"}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          className="press absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-card/85 backdrop-blur"
        >
          <Heart
            className={cn("h-4.5 w-4.5", faved ? "fill-coral text-coral" : "text-foreground")}
          />
        </button>
      </Link>

      <div className="space-y-2.5 p-3 sm:p-4">
        <div className="min-w-0">
          <Link to="/product/$productId" params={{ productId: product.id }}>
            <h3 className="truncate text-sm font-semibold sm:text-base">{product.name}</h3>
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.category}</p>
        </div>

        <div className="flex items-center gap-1.5">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c}
              title={c}
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: COLOR_SWATCHES[c] }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-base font-bold">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={() => {
              add(
                product,
                product.sizes[Math.floor(product.sizes.length / 2)] ?? "M",
                product.colors[0] ?? "Black",
              );
              toast.success(`${product.name} added to bag`);
            }}
            className="press inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground hover:bg-coral hover:text-coral-foreground"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
