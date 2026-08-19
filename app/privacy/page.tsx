import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Magic of Numbers collects, uses, and protects your personal information.",
  alternates: { canonical: "https://magicofnumbers.in/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />
      <section className="bg-cosmic-field px-5 pt-36 pb-20 sm:px-8">
        <article className="mx-auto max-w-3xl prose prose-invert prose-p:text-sm prose-p:leading-relaxed prose-p:text-lav prose-headings:font-display prose-headings:text-cream prose-strong:text-cream">
          <h1>Privacy Policy</h1>
          <p className="text-xs text-lav/60">Last updated: August 2026</p>

          <h2>1. Who we are</h2>
          <p>
            Magic of Numbers is a numerology guidance platform operated by Vinod.
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our website, services, and
            consultations.
          </p>

          <h2>2. Information we collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Name and contact details</strong> — your full name, email
              address, and phone number when you book a session, purchase a
              report, or create an account.
            </li>
            <li>
              <strong>Date of birth</strong> — used to calculate your numerology
              numbers and generate your report.
            </li>
            <li>
              <strong>Payment information</strong> — processed through Razorpay.
              We do not store your credit card or UPI details on our servers.
            </li>
            <li>
              <strong>Session notes</strong> — notes taken during consultations
              to support your reading. These are stored securely and not shared.
            </li>
            <li>
              <strong>Usage data</strong> — anonymous analytics such as pages
              visited and time spent on the site, collected through standard web
              analytics.
            </li>
          </ul>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To calculate and deliver your numerology report.</li>
            <li>To schedule and conduct your consultation.</li>
            <li>To provide access to your personal dashboard.</li>
            <li>To communicate about your bookings, reports, and account.</li>
            <li>To improve our website and services.</li>
          </ul>

          <h2>4. How we protect your information</h2>
          <p>
            We use industry-standard security measures including encrypted
            storage, secure authentication, and HTTPS. Your payment information
            is handled by Razorpay and is never stored on our servers.
          </p>

          <h2>5. Data sharing</h2>
          <p>
            We do not sell, trade, or share your personal information with third
            parties for marketing purposes. We may share limited information with
            service providers (such as Razorpay for payments, Vercel for hosting,
            Neon for database hosting, Resend for transactional email, and
            OpenRouter or its underlying model provider for AI-assisted report
            narrative generation) solely to operate our services.
          </p>
          <p>
            AI-assisted report generation receives only the information needed to
            prepare the requested report, such as your name, date of birth, focus
            area, question, and calculated numerology facts. The numerical
            calculations are performed by our application. We do not use your
            information to train a public model, and you may contact us to ask
            about deletion or correction of stored report data.
          </p>

          <h2>6. Cookies and analytics</h2>
          <p>
            We use essential cookies for authentication and session management.
            We may use anonymous analytics tools to understand how visitors use
            our site. These tools do not collect personally identifiable
            information.
          </p>

          <h2>7. Your rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Opt out of non-essential communications.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:support@magicofnumbers.in" className="text-gold">
              support@magicofnumbers.in
            </a>
            .
          </p>

          <h2>8. Data retention</h2>
          <p>
            We retain your data for as long as your account is active or as
            needed to provide our services. If you request deletion, we will
            remove your personal data within 30 days, except where we are
            legally required to retain certain records.
          </p>

          <h2>9. Sensitive questions</h2>
          <p>
            Please do not submit medical diagnoses, financial account details,
            government identification numbers, passwords, or other highly
            sensitive information in consultation questions. Numerology guidance
            is reflective and does not replace qualified medical, legal, or
            financial advice.
          </p>

          <h2>10. Children&apos;s privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not
            knowingly collect data from children.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The latest version will
            always be available on this page with the updated date.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about this Privacy Policy, contact us at{" "}
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
