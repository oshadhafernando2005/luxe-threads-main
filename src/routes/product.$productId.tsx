import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { COLOR_SWATCHES, formatPrice, getProduct, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | Lumen Studio" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | Lumen Studio` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} | Lumen Studio` },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0] ?? "M");
  const [color, setColor] = useState(product.colors[0] ?? "Black");
  const hasStickers = !!product.stickers && product.stickers.length > 0;
  const [sticker, setSticker] = useState(hasStickers ? product.stickers![0] : undefined);
  const displayImage = product.images?.[color] ?? product.image;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="rise-in relative overflow-hidden rounded-3xl bg-secondary">
          <img
            src={displayImage}
            alt={product.name}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover"
          />
          <Link
            to={product.gender === "men" ? "/men" : "/women"}
            aria-label="Back to collection"
            className="press absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-card/85 backdrop-blur"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>
        </div>

        <div className="pb-32 pt-6 lg:pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">{product.category}</p>
          <h1 className="display-xl mt-2 text-3xl sm:text-4xl">{product.name}</h1>
          <p className="mt-2 font-display text-2xl font-bold">{formatPrice(product.price)}</p>

          <div className="mt-7">
            <p className="mb-3 text-sm font-semibold">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "press h-12 min-w-12 rounded-full border px-4 text-sm font-medium",
                    size === s ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold">
              Colour <span className="font-normal text-muted-foreground">— {color}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "press h-11 w-11 rounded-full border-2",
                    color === c ? "border-coral" : "border-border",
                  )}
                  style={{ backgroundColor: COLOR_SWATCHES[c] }}
                />
              ))}
            </div>
          </div>

          <p className="mt-7 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {hasStickers && (
            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold">Choose a sticker</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {product.stickers!.map((src) => (
                  <button
                    key={src}
                    type="button"
                    aria-label="Select sticker"
                    onClick={() => setSticker(src)}
                    className={cn(
                      "press aspect-square overflow-hidden rounded-2xl border-2 bg-secondary",
                      sticker === src ? "border-coral" : "border-border",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              add(product, size, color);
              toast.success(`${product.name} · ${size} added to bag`);
            }}
            className="press mt-7 hidden h-14 w-full rounded-full bg-coral text-sm font-semibold text-coral-foreground lg:block"
          >
            Add to Cart · {formatPrice(product.price)}
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-card/95 p-3 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => {
            add(product, size, color);
            toast.success(`${product.name} · ${size} added to bag`);
          }}
          className="press h-14 w-full rounded-full bg-coral text-sm font-semibold text-coral-foreground"
        >
          Add to Cart · {formatPrice(product.price)}
        </button>
      </div>
    </div>
  );
}