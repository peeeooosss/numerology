import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using Magic of Numbers numerology services.",
  alternates: { canonical: "https://magicofnumbers.in/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />
      <section className="bg-cosmic-field px-5 pt-36 pb-20 sm:px-8">
        <article className="mx-auto max-w-3xl prose prose-invert prose-p:text-sm prose-p:leading-relaxed prose-p:text-lav prose-headings:font-display prose-headings:text-cream prose-strong:text-cream">
          <h1>Terms of Service</h1>
          <p className="text-xs text-lav/60">Last updated: August 2026</p>

          <h2>1. Acceptance of terms</h2>
          <p>
            By using the Magic of Numbers website and services, you agree to
            these Terms of Service. If you do not agree, please do not use our
            services.
          </p>

          <h2>2. Description of services</h2>
          <p>Magic of Numbers provides:</p>
          <ul>
            <li>Free numerology calculations and analysis.</li>
            <li>Paid numerology reports (₹99).</li>
            <li>Name Balance consultations (₹499).</li>
            <li>Numerology consultations (₹999).</li>
          </ul>

          <h2>3. Nature of numerology</h2>
          <p>
            Numerology is a reflective practice for self-understanding. It is
            not a scientific, medical, legal, or financial system. Our services
            are not a substitute for professional advice in any of these fields.
          </p>
          <p>
            We do not guarantee specific outcomes, predictions, or results based
            on numerology readings.
          </p>

          <h2>4. Payments</h2>
          <p>
            All payments are processed through Razorpay. We do not store your
            payment card details. Prices are listed in Indian Rupees (₹) and are
            subject to change.
          </p>

          <h2>5. Delivery</h2>
          <p>
            Reports are generated and available for download in your dashboard
            within minutes of purchase. Consultations are scheduled through our
            booking system and conducted online.
          </p>

          <h2>6. Refunds</h2>
          <p>
            Please refer to our{" "}
            <a href="/refund" className="text-gold">
              Refund Policy
            </a>{" "}
            for details on refund eligibility and process.
          </p>

          <h2>7. Account responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. If you believe your account has been
            compromised, contact us immediately.
          </p>

          <h2>8. Prohibited use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services for any unlawful purpose.</li>
            <li>Reproduce or redistribute our reports without authorization.</li>
            <li>Attempt to access other users&apos; accounts or data.</li>
            <li>Use automated tools to scrape or download content.</li>
          </ul>

          <h2>9. Intellectual property</h2>
          <p>
            All content on this website — including reports, calculations,
            text, and design — is the property of Magic of Numbers and is
            protected by copyright. You may not reproduce or distribute our
            content without written permission.
          </p>

          <h2>10. Limitation of liability</h2>
          <p>
            Magic of Numbers shall not be liable for any indirect, incidental,
            or consequential damages arising from the use of our services. Our
            total liability shall not exceed the amount you paid for the specific
            service in question.
          </p>

          <h2>11. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our
            services after changes constitutes acceptance of the updated terms.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about these Terms, contact us at{" "}
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
