import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Ruler, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | West Core" },
      {
        name: "description",
        content:
          "West Core makes small-batch, long-staple cotton t-shirts built to last. Learn about our story and materials.",
      },
      { property: "og:title", content: "About Us | West Core" },
      {
        property: "og:description",
        content: "Small-batch premium t-shirts, made with long-staple cotton and a fit that holds.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Leaf,
    title: "Considered materials",
    body: "Every tee starts with long-staple cotton, garment-dyed in small batches so colour stays true wash after wash.",
  },
  {
    icon: Ruler,
    title: "A fit that holds",
    body: "We obsess over pattern-making so the drape and shoulder line stay right — not just on day one, but a year in.",
  },
  {
    icon: Sparkles,
    title: "Small batches, less waste",
    body: "We produce in limited runs instead of chasing volume, which means less overstock and fewer compromises on quality.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <section className="rise-in relative overflow-hidden rounded-3xl bg-secondary">
        <img
          src={heroImg}
          alt="West Core t-shirts"
          width={1408}
          height={1008}
          className="h-[42vh] min-h-[280px] w-full object-cover object-top sm:h-[48vh]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5 pt-20 sm:p-10 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">Our story</p>
          <h1 className="display-xl mt-2 max-w-xl text-3xl sm:text-5xl">
            Built around one perfect tee.
          </h1>
        </div>
      </section>

      <section className="mt-10 max-w-2xl">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          West Core started with a simple frustration: most t-shirts are either cheap and shapeless,
          or expensive for no reason you can feel. So we set out to make one thing well — a t-shirt
          cut from proper cotton, finished carefully, and priced for what it actually costs to do
          that right.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          We're a small team, and we release new pieces in limited runs rather than restocking
          endlessly. It means some designs sell out — and that's on purpose. We'd rather make less,
          and make it count.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="display-xl text-2xl sm:text-3xl">What we care about</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card rounded-3xl p-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-16 flex flex-col items-start gap-4 rounded-3xl bg-secondary p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">
            Ready to see it for yourself?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Shop the current women's collection.</p>
        </div>
        <Link
          to="/women"
          className="press inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-coral px-6 text-sm font-semibold text-coral-foreground"
        >
          Shop now <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
