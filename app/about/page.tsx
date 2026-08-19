import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Magic of Numbers",
  description:
    "Magic of Numbers is a numerology guidance platform created by Vinod. We blend Chaldean, Vedic, and Western Pythagorean methods into a single coherent reading.",
  alternates: { canonical: "https://magicofnumbers.in/about" },
  openGraph: {
    title: "About Magic of Numbers | Magic of Numbers",
    description:
      "Magic of Numbers is a numerology guidance platform created by Vinod. We blend Chaldean, Vedic, and Western Pythagorean methods into a single coherent reading.",
    url: "https://magicofnumbers.in/about",
  },
};

export default function AboutPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cosmic-field px-5 pt-36 pb-20 sm:px-8 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-copper/10 blur-3xl" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[.2em] text-goldlite">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            About us
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl md:text-6xl">
            Numerology as a <em className="bg-gradient-to-r from-gold via-goldlite to-copper bg-clip-text text-transparent">reflective tool</em>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-lav md:text-lg">
            Magic of Numbers helps you explore your numbers — not as a prediction
            system, but as a framework for self-understanding and reflection.
          </p>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="font-display text-3xl text-cream">What we believe</h2>
          <div className="space-y-4 text-sm leading-relaxed text-lav">
            <p>
              We believe numerology is a reflective practice — not a factual
              system. Our goal is not to predict your future or tell you what to
              do. It is to help you explore patterns, reflect on your strengths
              and challenges, and consider different angles of your life
              direction.
            </p>
            <p>
              Every reading we provide is grounded in calculation, not
              interpretation of energy or spiritual forces. We do not make
              unsupported claims about guarantees, outcomes, or fate.
            </p>
            <p>
              We use multiple numerology traditions — Chaldean, Vedic, and
              Western Pythagorean — to give you a more complete picture than any
              single system provides on its own.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-cosmic-field px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="font-display text-3xl text-cream">How we work</h2>
          <div className="space-y-4 text-sm leading-relaxed text-lav">
            <p>
              <strong className="text-cream">Transparency first.</strong> Every
              number we show you is calculated from your name and date of birth
              using well-known numerology methods. There is no black-box AI
              deciding what your number means.
            </p>
            <p>
              <strong className="text-cream">Free before paid.</strong> You can
              calculate your core numbers for free. If you want deeper
              interpretation, a downloadable report, or a live consultation, those
              are available as separate paid options.
            </p>
            <p>
              <strong className="text-cream">Real conversation.</strong> Our
              consultations are private, direct, and focused on your question.
              No scripts, no chatbots, no pressure.
            </p>
            <p>
              <strong className="text-cream">Privacy respected.</strong> Your
              name, date of birth, and consultation notes are handled
              confidentially. We do not share personal data with third parties.
            </p>
          </div>
        </div>
      </section>

      {/* What We Are Not */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-cream">What we are not</h2>
          <div className="mt-6 space-y-3">
            {[
              "We are not a medical, legal, or financial advisory service.",
              "We do not guarantee outcomes based on numerology.",
              "We do not claim to predict the future with certainty.",
              "We do not use your personal data for advertising or selling to third parties.",
              "We do not pressure you into bookings or purchases.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gold/10 bg-[#101225]/40 p-4 text-sm text-lav"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
