import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  CATEGORIES,
  COLOR_SWATCHES,
  SIZES,
  formatPrice,
  products,
  type Gender,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type Sort = "newest" | "popular" | "price-asc" | "price-desc";

const SORTS: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press rounded-full border px-4 py-2 text-sm font-medium",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function CollectionView({
  gender,
  title,
  blurb,
}: {
  gender: Gender;
  title: string;
  blurb: string;
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(80);
  const [sort, setSort] = useState<Sort>("newest");

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const activeCount = categories.length + sizes.length + colors.length + (maxPrice < 80 ? 1 : 0);

  const list = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        p.gender === gender &&
        p.price <= maxPrice &&
        (categories.length === 0 || categories.includes(p.category)) &&
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c))),
    );
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sort === "newest") return b.createdAt - a.createdAt;
      if (sort === "popular") return b.popularity - a.popularity;
      if (sort === "price-asc") return a.price - b.price;
      return b.price - a.price;
    });
    return sorted;
  }, [gender, categories, sizes, colors, maxPrice, sort]);

  const reset = () => {
    setCategories([]);
    setSizes([]);
    setColors([]);
    setMaxPrice(80);
    setSort("newest");
  };

  const availableColors = useMemo(
    () => Array.from(new Set(products.filter((p) => p.gender === gender).flatMap((p) => p.colors))),
    [gender],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="display-xl text-3xl sm:text-5xl">{title}</h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{blurb}</p>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="press relative inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {activeCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[11px] text-coral-foreground">
                  {activeCount}
                </span>
              )}
            </button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="max-h-[88vh] overflow-y-auto rounded-t-3xl border-none bg-background p-0 sm:max-w-lg"
          >
            <SheetHeader className="sticky top-0 z-10 flex-row items-center justify-between border-b border-border bg-background px-5 py-4">
              <SheetTitle className="font-display text-xl">Filters</SheetTitle>
              <button type="button" onClick={reset} className="text-sm font-medium text-coral">
                Reset
              </button>
            </SheetHeader>

            <div className="space-y-7 px-5 py-6">
              <div>
                <p className="mb-3 text-sm font-semibold">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <Chip
                      key={c}
                      active={categories.includes(c)}
                      onClick={() => toggle(categories, setCategories, c)}
                    >
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold">Size</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <Chip
                      key={s}
                      active={sizes.includes(s)}
                      onClick={() => toggle(sizes, setSizes, s)}
                    >
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold">Colour</p>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggle(colors, setColors, c)}
                      className="press flex flex-col items-center gap-1.5"
                    >
                      <span
                        className={cn(
                          "h-10 w-10 rounded-full border-2",
                          colors.includes(c) ? "border-coral" : "border-border",
                        )}
                        style={{ backgroundColor: COLOR_SWATCHES[c] }}
                      />
                      <span className="text-[11px] text-muted-foreground">{c}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">Max price</p>
                  <span className="text-sm text-muted-foreground">{formatPrice(maxPrice)}</span>
                </div>
                <Slider
                  value={[maxPrice]}
                  onValueChange={(v) => setMaxPrice(v[0] ?? 80)}
                  min={40}
                  max={80}
                  step={2}
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold">Sort by</p>
                <div className="flex flex-wrap gap-2">
                  {SORTS.map((s) => (
                    <Chip key={s.value} active={sort === s.value} onClick={() => setSort(s.value)}>
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-border bg-background px-5 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="press h-13 w-full rounded-full bg-coral py-4 text-sm font-semibold text-coral-foreground"
              >
                Show {list.length} {list.length === 1 ? "item" : "items"}
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {activeCount > 0 && (
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
          {[...categories, ...sizes, ...colors].map((tag) => (
            <span
              key={tag}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium"
            >
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  toggle(categories, setCategories, tag);
                  toggle(sizes, setSizes, tag);
                  toggle(colors, setColors, tag);
                }}
              />
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} locked={p.id !== "noir-oversized"} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-20 text-center text-sm text-muted-foreground">
          No pieces match these filters yet.
        </p>
      )}
    </section>
  );
}
