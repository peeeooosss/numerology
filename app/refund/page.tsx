import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund policy for Magic of Numbers numerology reports and consultations.",
  alternates: { canonical: "https://magicofnumbers.in/refund" },
  robots: { index: true, follow: true },
};

export default function RefundPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />
      <section className="bg-cosmic-field px-5 pt-36 pb-20 sm:px-8">
        <article className="mx-auto max-w-3xl prose prose-invert prose-p:text-sm prose-p:leading-relaxed prose-p:text-lav prose-headings:font-display prose-headings:text-cream prose-strong:text-cream">
          <h1>Refund Policy</h1>
          <p className="text-xs text-lav/60">Last updated: August 2026</p>

          <h2>1. Numerology reports (₹99)</h2>
          <p>
            Reports are generated digitally and become available for download
            immediately after purchase. Because the product is delivered
            digitally and instantly, refunds are offered under the following
            conditions:
          </p>
          <ul>
            <li>
              <strong>Calculation error</strong> — if the report contains a
              calculation mistake, we will issue a corrected version at no
              charge. If a correction is not possible, a full refund will be
              provided.
            </li>
            <li>
              <strong>Duplicate purchase</strong> — if you accidentally
              purchased the same report twice, contact us within 7 days and we
              will refund the duplicate charge.
            </li>
          </ul>

          <h2>2. Name Balance consultation (₹499)</h2>
          <p>
            Refunds for Name Balance consultations are available if:
          </p>
          <ul>
            <li>
              You cancel more than 24 hours before the scheduled session.
            </li>
            <li>
              We are unable to conduct the session due to a technical issue on
              our end.
            </li>
          </ul>
          <p>
            If you cancel less than 24 hours before the session or fail to
            attend, a refund is not guaranteed but may be offered at our
            discretion.
          </p>

          <h2>3. Numerology consultation (₹999)</h2>
          <p>
            Refunds for Numerology consultations are available if:
          </p>
          <ul>
            <li>
              You cancel more than 24 hours before the scheduled session.
            </li>
            <li>
              We are unable to conduct the session due to a technical issue on
              our end.
            </li>
          </ul>
          <p>
            If you cancel less than 24 hours before the session or fail to
            attend, a refund is not guaranteed but may be offered at our
            discretion.
          </p>

          <h2>4. How to request a refund</h2>
          <p>
            Email us at{" "}
            <a href="mailto:support@magicofnumbers.in" className="text-gold">
              support@magicofnumbers.in
            </a>{" "}
            with your name, the service purchased, the date of purchase, and the
            reason for your refund request. We aim to respond within 48 hours
            and process approved refunds within 5–7 business days.
          </p>

          <h2>5. Processing refunds</h2>
          <p>
            Approved refunds are processed through Razorpay to the original
            payment method. Depending on your bank or payment provider, it may
            take 5–10 business days for the refund to appear in your account.
          </p>

          <h2>6. Non-refundable items</h2>
          <ul>
            <li>
              Free analysis calculations — no payment was made, so no refund
              applies.
            </li>
            <li>
              Sessions cancelled less than 24 hours before the scheduled time
              (unless at our discretion).
            </li>
          </ul>

          <h2>7. Contact</h2>
          <p>
            For refund requests or questions, contact us at{" "}
            <a href="mailto:support@magicofnumbers.in" className="text-gold">
              support@magicofnumbers.in
            </a>
            .
          </p>
        </article>
      </section>
      <Footer />
    </main>
  );
}
