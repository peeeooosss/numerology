import Link from "next/link";
import { Calculator, Heart, Calendar, Building2, Clock, Layers, MessageSquare, ArrowRight } from "lucide-react";

const featured = [
  {
    title: "Name Comparison",
    description: "Compare two or three name options by Chaldean Name Number and birth-number harmony.",
    href: "/name-comparison-calculator",
    icon: Calculator,
    category: "Name Analysis",
    ctaFor: "Name Balance · ₹499",
  },
  {
    title: "Personal Day",
    description: "Calculate your Personal Day Number for any date with the Personal Year and Month context.",
    href: "/personal-day-calculator",
    icon: Calendar,
    category: "Timing",
    ctaFor: "Report · ₹99",
  },
  {
    title: "Compatibility",
    description: "Compare two people's Driver Numbers, Life Paths, and Name Numbers in one view.",
    href: "/numerology-compatibility-calculator",
    icon: Heart,
    category: "Relationships",
    ctaFor: "Consultation · ₹999",
  },
];

const allTools = [
  { label: "Driver Number", href: "/driver-number-calculator" },
  { label: "Conductor Number", href: "/conductor-number-calculator" },
  { label: "Life Path", href: "/life-path-number-calculator" },
  { label: "Lo Shu Grid", href: "/lo-shu-grid-calculator" },
  { label: "Personal Year", href: "/personal-year-calculator" },
  { label: "Business Name", href: "/business-name-numerology-calculator" },
  { label: "Lucky Date", href: "/lucky-date-calculator" },
  { label: "Cycles", href: "/numerology-cycles-calculator" },
  { label: "Question Builder", href: "/session-question-builder" },
];

export function HomeTools() {
  return (
    <section id="free-tools" className="bg-cosmic-field px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">
            Free calculators
          </p>
          <h2 className="font-display text-2xl font-semibold text-cream md:text-3xl">
            12 free numerology tools
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-lav md:text-base">
            Each tool shows a transparent formula and a short reflection. No
            signup required. For your complete profile, use the free analysis.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {featured.map((tool) => {
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
                  <p className="text-[11px] uppercase tracking-[.15em] text-gold/70">
                    {tool.category}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-xl text-cream group-hover:text-gold transition">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-lav">
                  {tool.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="text-gold">Try it free</span>
                  <span className="text-lav/60">Leads to {tool.ctaFor}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {allTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-full border border-gold/15 bg-white/[.04] px-4 py-2 text-xs text-lav transition hover:border-gold/30 hover:text-gold"
            >
              {tool.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-goldlite transition"
          >
            View all 12 tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
