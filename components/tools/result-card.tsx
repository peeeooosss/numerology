"use client";

import { ArrowRight, CheckCircle2, Info, Loader2, LockKeyhole } from "lucide-react";
import type { ToolCalculationResult } from "@/lib/tools/tool-types";

type Props = {
  calculation: ToolCalculationResult;
  onReset?: () => void;
};

export function ResultCard({ calculation, onReset }: Props) {
  return (
    <div
      aria-live="polite"
      className="mt-8 space-y-5 scroll-mt-32"
      id="tool-result"
    >
      <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-cosmic2 to-[#101127] p-6 shadow-cardglow sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[.2em] text-gold">
              {calculation.primary.label}
            </p>
            <p className="mt-2 font-display text-4xl text-cream sm:text-5xl">
              {calculation.primary.value}
            </p>
            {calculation.primary.subtitle && (
              <p className="mt-2 text-base text-goldlite">
                {calculation.primary.subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 space-y-4">
          <div className="rounded-2xl border border-gold/20 bg-white/[.03] p-4">
            <p className="text-xs font-medium uppercase tracking-[.15em] text-gold">
              Formula
            </p>
            <p className="mt-2 text-sm leading-relaxed text-lav">
              {calculation.formula}
            </p>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-white/[.03] p-4">
            <p className="text-xs font-medium uppercase tracking-[.15em] text-gold">
              Interpretation
            </p>
            <p className="mt-2 text-sm leading-relaxed text-lav">
              {calculation.explanation}
            </p>
          </div>
          {calculation.reflection && (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.15em] text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Reflection prompt
              </p>
              <p className="mt-2 text-sm leading-relaxed text-lav">
                {calculation.reflection}
              </p>
            </div>
          )}
        </div>
      </div>

      {calculation.fields && calculation.fields.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {calculation.fields.map((field) => (
            <div
              key={field.label}
              className="rounded-2xl border border-gold/15 bg-white/[.04] p-4 text-center"
            >
              <p className="text-sm text-lav">{field.label}</p>
              <p className="mt-1 font-display text-3xl text-gold">{field.value}</p>
            </div>
          ))}
        </div>
      )}

      {calculation.sections && calculation.sections.length > 0 && (
        <div className="space-y-4">
          {calculation.sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-5"
            >
              <h3 className="font-display text-xl text-cream">
                {section.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-lav">
                {section.content}
              </p>
              {section.items && section.items.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed text-lav"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {calculation.limitation && (
        <div className="flex items-start gap-3 rounded-2xl border border-gold/15 bg-[#101225]/60 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="text-sm leading-relaxed text-lav">
            {calculation.limitation}
          </p>
        </div>
      )}

      {onReset && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="min-h-11 px-4 text-sm text-lav underline-offset-4 hover:text-cream hover:underline"
          >
            ← Calculate another
          </button>
        </div>
      )}
    </div>
  );
}
