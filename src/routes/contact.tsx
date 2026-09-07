import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | West Core" },
      {
        name: "description",
        content: "Get in touch with the West Core team — orders, sizing, or anything else.",
      },
      { property: "og:title", content: "Contact Us | West Core" },
    ],
  }),
  component: ContactPage,
});

const info = [
  { icon: Mail, label: "info@westcore.shop", href: "mailto:info@westcore.shop" },
  { icon: Phone, label: "078 574 2630", href: "tel:+94785742630" },
  { icon: MapPin, label: "Studio by appointment only" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/westcore.shop/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@westcore.shop", label: "TikTok" },
];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;

    // Simulated submit — wire this up to your email/service of choice.
    setTimeout(() => {
      toast.success("Message sent — we'll get back to you soon.");
      form.reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">Get in touch</p>
      <h1 className="display-xl mt-2 text-3xl sm:text-4xl">Contact us</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Questions about an order, sizing, or a wholesale enquiry? Send us a message and we'll reply
        within one to two business days.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-[minmax(0,1fr)_1.3fr] sm:gap-10">
        <div>
          <div className="surface-card space-y-4 rounded-3xl p-5 sm:p-6">
            {info.map(({ icon: Icon, label, href }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary">
                  <Icon className="h-4 w-4" />
                </span>
                {href ? (
                  <a href={href} className="font-medium hover:text-coral">
                    {label}
                  </a>
                ) : (
                  <span className="font-medium">{label}</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="press grid h-10 w-10 place-items-center rounded-full bg-secondary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="surface-card space-y-4 rounded-3xl p-5 sm:p-6">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-coral"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-coral"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="How can we help?"
              className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:border-coral"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="press h-14 w-full rounded-full bg-coral text-sm font-semibold text-coral-foreground disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
