import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import mCard from "@/assets/m1.jpg";
import wCard from "@/assets/w1.jpg";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen Studio — Premium T-Shirts for Men & Women" },
      {
        name: "description",
        content:
          "Small-batch premium t-shirts in long-staple cotton. Shop the men's and women's collections at Lumen Studio.",
      },
      { property: "og:title", content: "Lumen Studio — Premium T-Shirts for Men & Women" },
      {
        property: "og:description",
        content: "Small-batch premium t-shirts in long-staple cotton. Shop men's and women's collections.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <section className="rise-in relative overflow-hidden rounded-3xl bg-secondary">
        <img
          src={heroImg}
          alt="A man and a woman wearing premium Lumen t-shirts"
          width={1408}
          height={1008}
          className="h-[62vh] min-h-[400px] w-full object-cover object-top sm:h-[70vh]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5 pt-24 sm:p-10 sm:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">Spring Edit 2026</p>
          <h1 className="display-xl mt-2 max-w-xl text-4xl sm:text-6xl">The perfect tee, perfected again.</h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            Long-staple cotton, garment-dyed colour and a fit that holds. Made in small batches.
          </p>
          <Link
            to="/men"
            className="press mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-coral px-6 text-sm font-semibold text-coral-foreground"
          >
            Shop the edit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5">
        {[
          { to: "/men" as const, label: "Shop Men", img: mCard, note: "12 new arrivals" },
          { to: "/women" as const, label: "Shop Women", img: wCard, note: "14 new arrivals" },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group press relative overflow-hidden rounded-3xl bg-card shadow-soft"
          >
            <img
              src={c.img}
              alt={c.label}
              width={800}
              height={1000}
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5">
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-extrabold text-background">{c.label}</h2>
                <p className="text-xs text-background/80">{c.note}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-background">
                <ArrowRight className="h-4.5 w-4.5" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
          <h2 className="display-xl text-2xl sm:text-3xl">Featured designs</h2>
          <Link to="/women" className="shrink-0 text-sm font-semibold text-coral">
            View all
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
