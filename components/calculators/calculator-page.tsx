import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NumerologyCalculator, type CalculatorKind } from "@/components/calculators/numerology-calculator";

type Props = { kind: CalculatorKind; label: string; title: string; description: string; explanation: string; related: string };

export function CalculatorPage({ kind, label, title, description, explanation, related }: Props) {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />
      <section className="bg-cosmic-field px-5 pb-20 pt-36 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[.2em] text-gold">Free numerology calculator</p>
            <h1 className="mt-4 font-display text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">{title}</h1>
            <p className="mt-4 text-base leading-relaxed text-lav sm:text-lg">{description}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/analyzer" className="inline-flex min-h-11 items-center rounded-full border border-gold/30 px-5 py-3 text-sm text-cream hover:bg-white/5">Full free analysis</Link>
              <Link href="/methodology" className="inline-flex min-h-11 items-center rounded-full border border-gold/30 px-5 py-3 text-sm text-cream hover:bg-white/5">How the method works</Link>
            </div>
          </div>

          {/* Form + explanation */}
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
              <div className="space-y-5 text-sm leading-relaxed text-lav">
                <p>{explanation}</p>
                <p>This tool shows the calculation and a short reflection. For your complete profile, use the full free analysis. The ₹99 report adds detailed interpretation, synthesis, and a 12-month forecast.</p>
              </div>
              <div className="w-full">
                <NumerologyCalculator kind={kind} label={label} />
              </div>
            </div>
          </div>

          {/* Comparison cards */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-5">
              <h2 className="font-display text-xl text-cream">Free result</h2>
              <p className="mt-2 text-sm leading-relaxed text-lav">See the number, formula, and a concise interpretation without creating an account.</p>
            </div>
            <div className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-5">
              <h2 className="font-display text-xl text-cream">Detailed report</h2>
              <p className="mt-2 text-sm leading-relaxed text-lav">The ₹99 PDF explains how your numbers interact across personality, career, relationships, Lo Shu, and timing.</p>
            </div>
            <div className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-5">
              <h2 className="font-display text-xl text-cream">Live session</h2>
              <p className="mt-2 text-sm leading-relaxed text-lav">Ask a specific question in a focused ₹999 consultation with Vinod.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
