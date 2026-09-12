import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | WESTCORE" },
      {
        name: "description",
        content: "WESTCORE's terms of use covering orders, pricing, payment, shipping and more.",
      },
      { property: "og:title", content: "Terms & Conditions | WESTCORE" },
    ],
  }),
  component: TermsPage,
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

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">Legal</p>
      <h1 className="display-xl mt-2 text-3xl sm:text-4xl">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: September 8, 2026</p>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Welcome to WESTCORE. These Terms &amp; Conditions explain how our website, orders, payments
        and deliveries are handled. By using the WESTCORE website or placing an order, you agree to
        the terms below. For information on returns, exchanges and refunds, see our{" "}
        <Link to="/returns" className="font-medium text-coral">
          Return Policy
        </Link>
        , and for how we handle your data, see our{" "}
        <Link to="/privacy" className="font-medium text-coral">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-10 space-y-8">
        <div>
          <H2>1. About WESTCORE</H2>
          <P>This website and the WESTCORE brand are operated under the name WESTCORE.</P>
          <P>
            For questions regarding orders, products, returns, exchanges or your personal
            information, please contact: <Email />
          </P>
        </div>

        <div>
          <H2>2. Orders</H2>
          <P>
            When you place an order through our website, you are submitting a request to purchase
            the selected products. Once your order has been received, you should receive an order
            confirmation containing the relevant order details.
          </P>
          <P>
            Please make sure your name, phone number, email address and delivery address are
            accurate before completing your order. WESTCORE is not responsible for delays or failed
            deliveries caused by incorrect or incomplete customer information.
          </P>
          <P>
            We reserve the right to cancel or decline an order in situations including, but not
            limited to, incorrect product information, stock availability issues, suspected
            fraudulent activity or technical errors.
          </P>
        </div>

        <div>
          <H2>3. Product availability</H2>
          <P>
            Our products may be released in limited quantities. Product availability is displayed on
            the website and may change without notice. Because some WESTCORE releases are
            intentionally limited, a product may become unavailable before you complete your
            purchase.
          </P>
          <P>
            We aim to ensure that product images and descriptions are as accurate as possible. Due
            to screen settings, lighting and photography, colours may appear slightly different from
            the actual product.
          </P>
        </div>

        <div>
          <H2>4. Pricing</H2>
          <P>
            All prices displayed on the WESTCORE website are in Sri Lankan Rupees (LKR) unless
            otherwise stated.
          </P>
          <P>
            We reserve the right to change product prices at any time before an order is placed.
            Once an order has been successfully placed, the price confirmed at checkout will apply
            to that order, subject to correction of genuine pricing or technical errors.
          </P>
        </div>

        <div>
          <H2>5. Payment</H2>
          <P>
            WESTCORE currently accepts online payments through PayHere as well as Cash on Delivery
            (COD) where available.
          </P>
          <P>
            For online payments, payment processing is handled through the payment service used at
            checkout. WESTCORE does not directly handle or store your full payment-card details
            through our website.
          </P>
          <P>COD orders are payable to the delivery provider when the order is delivered.</P>
        </div>

        <div>
          <H2>6. Shipping &amp; delivery</H2>
          <P>WESTCORE currently delivers within Sri Lanka.</P>
          <P>
            During our initial launch period, orders may take approximately 7–14 business days to
            arrive depending on the delivery location, courier operations and other circumstances.
            As our delivery operations develop, we aim to reduce delivery times where possible.
          </P>
          <P>
            Delivery estimates are not guaranteed and may occasionally be affected by circumstances
            outside our control, including courier delays, public holidays, weather conditions or
            incorrect delivery information. Once an order has been handed to the delivery provider,
            delivery is subject to the provider's operating procedures.
          </P>
          <P>
            If you believe your order has been significantly delayed, please contact us at <Email />
            .
          </P>
        </div>

        <div>
          <H2>7. Delivery address</H2>
          <P>
            Customers are responsible for providing a complete and accurate delivery address and
            contact number. If a delivery cannot be completed because the information provided is
            incorrect, incomplete or the customer is unavailable to receive the order, additional
            delivery charges may apply for re-delivery.
          </P>
          <P>
            Please ensure that someone is available to receive a COD order when delivery is
            attempted.
          </P>
        </div>

        <div>
          <H2>8. Third-party services</H2>
          <P>
            WESTCORE may use trusted third-party services to operate parts of the business, such as:
          </P>
          <UL
            items={[
              "Payment providers",
              "Delivery and courier services",
              "Website hosting and technology providers",
              "Email or communication services",
            ]}
          />
          <P>
            These providers may receive information necessary to perform the services they provide
            to us. We only intend to share information where reasonably necessary for these purposes
            or where required by applicable obligations.
          </P>
        </div>

        <div>
          <H2>9. Intellectual property</H2>
          <P>
            All WESTCORE branding, logos, designs, graphics, photographs, written content, product
            artwork and other original materials displayed on this website are owned by or used by
            WESTCORE with appropriate permission. You may not reproduce, copy, modify, distribute,
            sell or commercially use WESTCORE content without prior written permission.
          </P>
        </div>

        <div>
          <H2>10. Website information</H2>
          <P>
            We make reasonable efforts to ensure that information displayed on the website is
            accurate and up to date. However, occasional errors may occur, including errors
            involving product descriptions, images, pricing, availability or website functionality.
            WESTCORE reserves the right to correct errors and update website information when
            necessary.
          </P>
        </div>

        <div>
          <H2>11. Changes to these terms</H2>
          <P>
            WESTCORE may update these Terms &amp; Conditions from time to time to reflect changes to
            our products, services, website or business operations. Any updated version will be
            posted on this page with a revised Last Updated date.
          </P>
        </div>

        <div>
          <H2>12. Contact us</H2>
          <P>
            For questions about orders, products, delivery, exchanges, returns or anything else
            relating to WESTCORE:
          </P>
          <P>
            WESTCORE
            <br />
            Email: <Email />
          </P>
          <P>We'd rather you ask than be unsure.</P>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-secondary p-5 sm:p-6">
        <h2 className="font-semibold">Still have a question?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Reach us at <Email /> or visit our{" "}
          <Link to="/contact" className="font-medium text-coral">
            Contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
