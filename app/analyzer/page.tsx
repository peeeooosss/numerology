import type { Metadata } from "next";
import { Header } from "@/components/header";
import { FreeAnalysis } from "@/components/free-analysis";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Free Numerology Calculator by Name and Date of Birth",
  description:
    "Calculate your Name Number, Driver Number, Life Path, Personal Year, lucky numbers and Lo Shu pattern free. No signup required.",
  alternates: { canonical: "https://magicofnumbers.in/analyzer" },
  openGraph: {
    title: "Free Numerology Calculator by Name and Date of Birth | Magic of Numbers",
    description:
      "Calculate your Name Number, Driver Number, Life Path, Personal Year, lucky numbers and Lo Shu pattern free.",
    url: "https://magicofnumbers.in/analyzer",
  },
};

export default function AnalyzerPage() {
  return <><Header /><FreeAnalysis /><section className="bg-midnight px-5 py-16 text-cream sm:px-8"><div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3"><div className="md:col-span-2"><h2 className="font-display text-3xl">How this free numerology calculator works</h2><p className="mt-4 text-sm leading-relaxed text-lav">Enter the name you use and your date of birth to calculate a basic profile. Magic of Numbers shows your Name Number, Driver Number, Conductor Number, Life Path, Personal Year, lucky numbers, Name Harmony preview, and Lo Shu pattern.</p><p className="mt-4 text-sm leading-relaxed text-lav">The calculation is presented transparently as a traditional numerology reflection tool. It is not scientific proof, medical advice, financial advice, or a guarantee of future events.</p></div><div className="rounded-2xl border border-gold/15 bg-white/[.04] p-5"><h2 className="font-display text-xl">Want more detail?</h2><p className="mt-2 text-sm leading-relaxed text-lav">The ₹99 report adds complete interpretations, profile synthesis, and a 12-month forecast PDF.</p><a href="/report" className="mt-5 inline-flex min-h-11 items-center rounded-full border border-gold/30 px-4 py-2 text-sm text-goldlite hover:bg-gold/10">See the detailed report</a></div></div></section><Footer /></>;
}
