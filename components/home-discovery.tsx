import Link from "next/link";
import { Calculator, ScrollText, BookOpen, ArrowRight } from "lucide-react";

const entryPoints = [
  {
    icon: ScrollText,
    title: "Free Analysis",
    description: "See your Driver Number, Life Path, Personal Year, and Lo Shu pattern in one result.",
    href: "/analyzer",
    cta: "Calculate free",
    badge: "Start here",
  },
  {
    icon: Calculator,
    title: "Free Tools",
    description: "12 focused calculators: name comparison, compatibility, personal day, business name, and more.",
    href: "/tools",
    cta: "Explore tools",
    badge: "12 calculators",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description: "Plain-language numerology guides covering Driver Numbers, Lo Shu Grid, name analysis, and timing.",
    href: "/blog",
    cta: "Read guides",
    badge: "8 articles",
  },
];

export function HomeDiscovery() {
  return (
    <section id="start-here" className="bg-cosmic px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">
          Start anywhere
        </p>
        <h2 className="font-display text-2xl font-semibold text-cream md:text-3xl">
          Three free ways to explore your numbers
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {entryPoints.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-2xl border border-gold/15 bg-[#101225]/60 p-6 text-left transition hover:border-gold/30 hover:bg-[#101225]/80"
              >
                <span className="absolute right-4 top-4 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {item.badge}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-xl text-cream group-hover:text-gold transition">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-lav">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
