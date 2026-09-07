import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | West Core" },
      {
        name: "description",
        content: "How West Core collects, uses, and protects your information.",
      },
      { property: "og:title", content: "Privacy Policy | West Core" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Information we collect",
    body: "When you browse West Core or place an order, we may collect information you give us directly — such as your name, email address, shipping address, and payment details — as well as information collected automatically, like your device type, browser, and how you interact with our site (pages viewed, items added to your bag).",
  },
  {
    title: "2. How we use your information",
    body: "We use this information to process and fulfil orders, respond to enquiries, improve our site and products, prevent fraud, and — where you've opted in — send you updates about new arrivals and offers. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Cookies",
    body: "We use cookies and similar technologies to keep your bag and preferences saved between visits, understand how our site is used, and measure the performance of our pages. You can control or disable cookies through your browser settings, though some features may not work as intended without them.",
  },
  {
    title: "4. Sharing your information",
    body: "We share information only with the service providers who help us run our business — such as payment processors and shipping carriers — and only to the extent needed for them to provide that service. We require these providers to protect your data and use it only for the purpose we've engaged them for.",
  },
  {
    title: "5. Data retention",
    body: "We keep your information for as long as your account is active or as needed to provide you services, comply with our legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    title: "6. Your rights",
    body: "Depending on where you live, you may have the right to access, correct, delete, or export the personal information we hold about you, or to object to certain uses of it. To exercise any of these rights, contact us using the details below.",
  },
  {
    title: "7. Changes to this policy",
    body: "We may update this policy from time to time. If we make material changes, we'll update the date below and, where appropriate, notify you directly.",
  },
];

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">Legal</p>
      <h1 className="display-xl mt-2 text-3xl sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: September 7, 2026</p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        This Privacy Policy explains how West Core ("we", "us", "our") collects, uses, and protects
        information when you visit our website or make a purchase. By using our site, you agree to
        the practices described here.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-secondary p-5 sm:p-6">
        <h2 className="font-semibold">Contact us</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          If you have questions about this policy or how we handle your data, reach us at{" "}
          <a href="mailto:hello@westcore.com" className="font-medium text-coral">
            hello@westcore.com
          </a>{" "}
          or visit our{" "}
          <Link to="/contact" className="font-medium text-coral">
            Contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
