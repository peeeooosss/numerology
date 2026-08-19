import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare, User } from "lucide-react";
import type { ToolPrimaryCta } from "@/lib/tools/tool-types";

type Props = {
  primaryCta: ToolPrimaryCta;
  primaryCtaLabel: string;
  secondaryCta?: ToolPrimaryCta;
  secondaryCtaLabel?: string;
};

const CTA_MAP: Record<ToolPrimaryCta, { href: string; icon: React.ReactNode }> = {
  report: { href: "/report", icon: <Calendar className="h-4 w-4" /> },
  "name-balance": { href: "/name-balance", icon: <User className="h-4 w-4" /> },
  consultation: { href: "/consultation", icon: <MessageSquare className="h-4 w-4" /> },
  "free-analysis": { href: "/analyzer", icon: <ArrowRight className="h-4 w-4" /> },
};

export function ToolUpsell({
  primaryCta,
  primaryCtaLabel,
  secondaryCta,
  secondaryCtaLabel,
}: Props) {
  const primary = CTA_MAP[primaryCta];
  const secondary = secondaryCta ? CTA_MAP[secondaryCta] : null;

  return (
    <div className="rounded-3xl border border-gold/30 bg-gold/10 p-6 text-center sm:p-8">
      <p className="text-xs uppercase tracking-[.2em] text-gold">Want to go deeper?</p>
      <h3 className="mt-2 font-display text-2xl text-cream sm:text-3xl">
        This free result shows the pattern. A detailed profile explains it.
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-lav">
        Unlock full interpretation, cross-number synthesis, career and relationship
        reflection, and a 12-month forecast — either in a personalized PDF or a
        live session.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={primary.href}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-midnight hover:bg-goldlite"
        >
          {primary.icon}
          {primaryCtaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {secondary && secondaryCtaLabel && (
          <Link
            href={secondary.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-goldlite hover:bg-gold/10"
          >
            {secondary.icon}
            {secondaryCtaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
