import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calculator, Heart, Calendar, Building2, Clock, Layers, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

const siteUrl = "https://magicofnumbers.in";

export const metadata: Metadata = {
  title: "Free Numerology Calculators and Tools",
  description: "Explore free numerology calculators: Personal Day, Name Comparison, Compatibility, Business Name, Lucky Date, Cycles, and Session Question Builder.",
  alternates: { canonical: `${siteUrl}/tools` },
  openGraph: {
    type: "website",
    title: "Free Numerology Calculators and Tools",
    description: "Explore free numerology calculators for Personal Day, Name Comparison, Compatibility, Business Names, and more.",
    url: `${siteUrl}/tools`,
  },
};

const TOOLS = [
  {
    title: "Personal Day Calculator",
    description: "Calculate your Personal Day Number for any date. See the energy theme and a short reflection.",
    href: "/personal-day-calculator",
    icon: Calendar,
    category: "Timing",
  },
  {
    title: "Name Comparison Calculator",
    description: "Compare two or three name options by Chaldean Name Number and see how each relates to your birth numbers.",
    href: "/name-comparison-calculator",
    icon: Calculator,
    category: "Name Analysis",
  },
  {
    title: "Numerology Compatibility Calculator",
    description: "Compare two people's Driver Numbers, Life Paths, and Name Numbers for a traditional compatibility reflection.",
    href: "/numerology-compatibility-calculator",
    icon: Heart,
    category: "Relationships",
  },
  {
    title: "Business Name Numerology Calculator",
    description: "Compare candidate business names by Chaldean Name Number and see how each relates to the founder's birth numbers.",
    href: "/business-name-numerology-calculator",
    icon: Building2,
    category: "Business",
  },
  {
    title: "Lucky Date Calculator",
    description: "Explore any date using your Personal Day Number. See the energy theme and a short reflection for your chosen purpose.",
    href: "/lucky-date-calculator",
    icon: Clock,
    category: "Timing",
  },
  {
    title: "Numerology Cycles Calculator",
    description: "See your Pinnacle Cycles, Challenge Numbers, and current Personal Year in one overview.",
    href: "/numerology-cycles-calculator",
    icon: Layers,
    category: "Life Cycles",
  },
  {
    title: "Session Question Builder",
    description: "Build focused questions for a numerology consultation. Choose your concern and receive structured questions.",
    href: "/session-question-builder",
    icon: MessageSquare,
    category: "Consultation",
  },
];

const LEGACY_CALCULATORS = [
  { title: "Driver Number Calculator", href: "/driver-number-calculator", category: "Core Numbers" },
  { title: "Conductor Number Calculator", href: "/conductor-number-calculator", category: "Core Numbers" },
  { title: "Life Path Number Calculator", href: "/life-path-number-calculator", category: "Core Numbers" },
  { title: "Lo Shu Grid Calculator", href: "/lo-shu-grid-calculator", category: "Core Numbers" },
  { title: "Personal Year Calculator", href: "/personal-year-calculator", category: "Timing" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Numerology Calculators and Tools",
  description: "Explore free numerology calculators for Personal Day, Name Comparison, Compatibility, Business Names, and more.",
  url: `${siteUrl}/tools`,
};

export default function ToolsPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <section className="bg-cosmic-field px-5 pb-20 pt-36 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">
              Free numerology tools
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream sm:text-5xl">
              Calculators and reflection tools
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-lav md:text-lg">
              Each tool shows a transparent formula, a short interpretation, and a
              practical reflection prompt. No signup required. For your complete
              profile, use the free analysis.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/analyzer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-6 py-3 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110"
              >
                <Sparkles className="h-4 w-4" />
                Full free analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-gold/15 bg-[#101225]/60 p-6 transition hover:border-gold/30 hover:bg-[#101225]/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-gold/10">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[.15em] text-gold/70">
                        {tool.category}
                      </p>
                    </div>
                  </div>
                  <h2 className="mt-4 font-display text-xl text-cream group-hover:text-gold transition">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-lav">
                    {tool.description}
                  </p>
                  <p className="mt-4 flex items-center gap-1 text-xs font-medium text-gold">
                    Try it free
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-16">
            <h2 className="text-center font-display text-2xl text-cream">
              Core number calculators
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-lav">
              Calculate individual core numbers with these focused tools. Each
              shows the number, formula, and a short traditional interpretation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LEGACY_CALCULATORS.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group flex items-center justify-between rounded-2xl border border-gold/15 bg-white/[.04] px-5 py-4 transition hover:border-gold/30 hover:bg-white/[.07]"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[.15em] text-gold/60">
                      {calc.category}
                    </p>
                    <p className="mt-1 font-display text-base text-cream group-hover:text-gold transition">
                      {calc.title}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-lav group-hover:text-gold transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-gold/20 bg-[#101225]/60 p-6 text-center sm:p-8">
            <p className="text-xs uppercase tracking-[.2em] text-gold">
              Ready for more detail?
            </p>
            <h2 className="mt-2 font-display text-2xl text-cream sm:text-3xl">
              Your free result shows the pattern. The ₹99 report explains it.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-lav">
              Unlock detailed interpretation, cross-number synthesis, career and
              relationship reflection, Lo Shu analysis, and a 12-month forecast in
              a personalized PDF.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/report"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-midnight hover:bg-goldlite"
              >
                See the detailed report · ₹99
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/consultation"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-goldlite hover:bg-gold/10"
              >
                Book a live consultation · ₹999
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
