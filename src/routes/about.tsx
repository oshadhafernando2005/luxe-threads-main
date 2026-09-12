import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | WESTCORE" },
      {
        name: "description",
        content:
          "WESTCORE is a Sri Lankan fashion label built around a simple idea: clothing should feel like more than clothing.",
      },
      { property: "og:title", content: "About Us | WESTCORE" },
      {
        property: "og:description",
        content: "Made with intention. Made in Sri Lanka. Less, but better.",
      },
    ],
  }),
  component: AboutPage,
});

const sections = [
  {
    title: "Made with intention",
    body: "Every WESTCORE piece begins with the details. From the weight and feel of the fabric to the fit, finishing and artwork, we care about how a piece looks, how it feels and how it exists in the real world. We keep our approach intentional rather than excessive. Instead of producing endless collections, we focus on individual pieces and limited quantities that we genuinely want to wear.",
  },
  {
    title: "Made in Sri Lanka",
    body: "WESTCORE is proudly made in Sri Lanka. We believe great fashion does not need to come from somewhere else. Our goal is to build a brand from here that can stand confidently alongside the brands we admire around the world. Sri Lanka is where WESTCORE started. It is part of where we are going.",
  },
  {
    title: "Less, but better",
    body: "We don't believe in making something simply because we can. Our collections are intentionally limited, allowing us to put more thought into each release and keep every piece feeling special. When something is gone, it may not come back.",
  },
  {
    title: "The world of WESTCORE",
    body: "WESTCORE is more than the products we release. It is the places, people, music, visuals, late nights, quiet moments and everyday experiences around them. We want WESTCORE to feel like a world you can step into — not just a logo printed on a T-shirt. This is only the beginning.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <section className="rise-in relative overflow-hidden rounded-3xl bg-secondary">
        <img
          src={heroImg}
          alt="WESTCORE"
          width={1408}
          height={1008}
          className="h-[42vh] min-h-[280px] w-full object-cover object-top sm:h-[48vh]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5 pt-20 sm:p-10 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">
            From here, forward.
          </p>
          <h1 className="display-xl mt-2 max-w-xl text-3xl sm:text-5xl">WESTCORE</h1>
        </div>
      </section>

      <section className="mt-10 max-w-2xl">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          WESTCORE is a Sri Lankan fashion label built around a simple idea: clothing should feel
          like more than clothing.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Born in Sri Lanka and shaped by contemporary culture, WESTCORE explores the space between
          streetwear, everyday essentials and modern fashion. We create pieces that are considered,
          wearable and distinctive without trying too hard.
        </p>
        <p className="mt-6 font-display text-lg font-semibold sm:text-xl">
          We are not here to follow every trend.
          <br />
          We are here to build our own.
        </p>
      </section>

      <section className="mt-14 max-w-2xl space-y-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="display-xl text-xl sm:text-2xl">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {s.body}
            </p>
          </div>
        ))}
      </section>

      <section className="my-16 rounded-3xl bg-secondary p-6 text-center sm:p-10">
        <p className="font-display text-xl font-extrabold sm:text-2xl">WESTCORE</p>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">From here, forward.</p>
        <Link
          to="/women"
          className="press mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-coral px-6 text-sm font-semibold text-coral-foreground"
        >
          Shop now <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
