import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Return Policy | WESTCORE" },
      {
        name: "description",
        content: "WESTCORE's policy on returns, exchanges, defective items and refunds.",
      },
      { property: "og:title", content: "Return Policy | WESTCORE" },
    ],
  }),
  component: ReturnsPage,
});

function Email() {
  return (
    <a href="mailto:info@westcore.shop" className="font-medium text-coral">
      info@westcore.shop
    </a>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-semibold">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>;
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">Legal</p>
      <h1 className="display-xl mt-2 text-3xl sm:text-4xl">Return Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: September 8, 2026</p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        This Return Policy explains how WESTCORE handles returns, exchanges, defective or incorrect
        items, refunds and order cancellations. It forms part of our full{" "}
        <Link to="/terms" className="font-medium text-coral">
          Terms &amp; Conditions
        </Link>
        .
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <H2>Returns</H2>
          <P>
            We do not accept returns simply because a customer has changed their mind about a
            purchase.
          </P>
          <P>Returns are accepted only in the following circumstances:</P>
          <UL
            items={[
              "The wrong item was sent.",
              "The item received is defective or has a manufacturing issue.",
            ]}
          />
          <P>
            Items returned for an approved reason may be eligible for a replacement, exchange or
            refund, depending on the circumstances and availability. Please contact us as soon as
            possible after receiving your order if there is an issue.
          </P>
        </div>

        <div>
          <H2>Exchanges</H2>
          <P>We allow exchanges, including exchanges due to size selection.</P>
          <P>
            For a change-of-mind or size exchange, the customer is responsible for the applicable
            delivery costs associated with returning the original item and sending the replacement
            item.
          </P>
          <P>
            Before sending anything back, please contact <Email />. We will provide the relevant
            instructions for your exchange.
          </P>
          <P>
            Replacement items are subject to availability. If the requested replacement is
            unavailable, we may offer another available option or another appropriate resolution.
          </P>
        </div>

        <div>
          <H2>Defective or incorrect items</H2>
          <P>We want every WESTCORE order to arrive as it should.</P>
          <P>
            If you receive a defective item or an item that is different from what you ordered,
            please contact us with your order details and information about the issue.
          </P>
          <P>
            Where the issue is confirmed to be the responsibility of WESTCORE, we will provide an
            appropriate resolution, which may include a replacement, exchange or refund.
          </P>
          <P>
            We may request photographs or other reasonable information to help us assess the issue.
            For confirmed defective or incorrect orders, WESTCORE will handle the applicable
            resolution without charging the customer for the relevant return process.
          </P>
        </div>

        <div>
          <H2>Return &amp; exchange conditions</H2>
          <P>
            For hygiene, product quality and resale reasons, items must not have been washed or
            worn.
          </P>
          <P>
            Opening the original packaging does not automatically make an item ineligible for an
            exchange or return. However, an item that has been washed, worn or otherwise used may
            not qualify.
          </P>
          <P>
            We recommend trying the item on carefully before washing or wearing it. All returned
            items must be in a condition that allows us to reasonably assess the product.
          </P>
        </div>

        <div>
          <H2>How to request an exchange or return</H2>
          <P>
            To request a return or exchange, email <Email />. Please include:
          </P>
          <UL
            items={[
              "Order number",
              "Customer name",
              "Phone number",
              "Reason for the request",
              "Relevant photographs, where applicable",
            ]}
          />
          <P>Please do not send an item back before contacting us and receiving instructions.</P>
        </div>

        <div>
          <H2>Refunds</H2>
          <P>
            Where a refund is approved, the refund will be processed through an appropriate payment
            method based on the original order and payment method. The time required for a refund to
            appear may depend on the payment provider or financial institution involved.
          </P>
          <P>
            For COD orders, we will provide the appropriate refund instructions once the return has
            been approved.
          </P>
        </div>

        <div>
          <H2>Order cancellations</H2>
          <P>Please contact us as soon as possible if you need to cancel an order.</P>
          <P>
            Because orders may be processed or dispatched quickly, we cannot guarantee that a
            cancellation will be possible after processing has begun. Once an order has been
            dispatched, it will generally be handled under our applicable delivery, return and
            exchange policies.
          </P>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-secondary p-5 sm:p-6">
        <h2 className="font-semibold">Need to start a return or exchange?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Email us at <Email /> or visit our{" "}
          <Link to="/contact" className="font-medium text-coral">
            Contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
