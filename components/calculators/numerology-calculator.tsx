"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Grid3X3, Loader2, LockKeyhole } from "lucide-react";

export type CalculatorKind = "driver" | "conductor" | "life-path" | "lo-shu" | "personal-year";

type Props = { kind: CalculatorKind; label: string };

export function NumerologyCalculator({ kind, label }: Props) {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/numerology/calculator", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, dateOfBirth, year: kind === "personal-year" ? Number(year) : undefined }) });
      const data = await response.json() as Record<string, unknown>;
      if (!response.ok || !data.success) throw new Error(String(data.error || "Calculation failed."));
      setResult(data);
    } catch (calculationError) {
      setError(calculationError instanceof Error ? calculationError.message : "Calculation failed.");
    } finally {
      setLoading(false);
    }
  }

  const value = typeof result?.value === "number" ? result.value : null;
  return <div className="rounded-3xl border border-gold/25 bg-[#101225]/90 p-6 shadow-cardglow sm:p-8"><form onSubmit={submit} className="space-y-5"><div><label htmlFor={`${kind}-dob`} className="mb-2 block text-sm font-medium text-cream">Date of birth</label><input id={`${kind}-dob`} required type="date" min="1900-01-01" max={new Date().toISOString().slice(0, 10)} value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} className="h-12 w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 text-base text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" /></div>{kind === "personal-year" && <div><label htmlFor="personal-year-target" className="mb-2 block text-sm font-medium text-cream">Year to calculate</label><input id="personal-year-target" required type="number" min="1900" max="2200" value={year} onChange={(event) => setYear(event.target.value)} className="h-12 w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 text-base text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" /></div>}{error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}<button type="submit" disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-5 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110 disabled:opacity-70">{loading ? <><Loader2 className="h-4 w-4 animate-spin" />Calculating...</> : <>Calculate my {label}<ArrowRight className="h-4 w-4" /></>}</button><p className="flex items-center justify-center gap-2 text-center text-xs text-lav"><LockKeyhole className="h-3.5 w-3.5 text-gold" />Free calculation · No signup required</p></form>{result && <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-6 text-center">{kind === "lo-shu" ? <><div className="flex items-center justify-center gap-2"><Grid3X3 className="h-5 w-5 text-gold" /><h2 className="font-display text-2xl text-cream">Your Lo Shu Grid</h2></div><div className="mx-auto mt-5 grid max-w-xs grid-cols-3 gap-2">{(result.rows as number[][]).flat().map((digit) => <div key={digit} className="flex min-h-16 flex-col items-center justify-center rounded-xl border border-gold/20 bg-midnight"><span className="font-display text-2xl text-gold">{digit}</span><span className="text-xs text-lav">{(result.present as number[]).includes(digit) ? `${(result.repeated as Array<{ digit: number; count: number }>).find((item) => item.digit === digit)?.count || 1} present` : "missing"}</span></div>)}</div><div className="mt-5 grid gap-3 text-left sm:grid-cols-2"><p className="rounded-xl border border-gold/15 p-3 text-sm text-lav"><span className="text-gold">Missing:</span> {(result.missing as number[]).join(" · ") || "None"}</p><p className="rounded-xl border border-gold/15 p-3 text-sm text-lav"><span className="text-gold">Repeated:</span> {(result.repeated as Array<{ digit: number; count: number }>).map((item) => `${item.digit} x ${item.count}`).join(" · ") || "None"}</p></div></> : <><p className="text-xs uppercase tracking-[.2em] text-gold">{label}</p><p className="mt-2 font-display text-6xl text-gold">{value}</p><p className="mt-3 text-sm leading-relaxed text-lav">{String(result.explanation || result.theme || "Your result has been calculated.")}</p><p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-lav">{String(result.formula)}</p></>}</div>}{result && <div className="mt-6 rounded-2xl border border-gold/20 bg-midnight p-5 text-center"><p className="font-display text-xl text-cream">Want the complete profile?</p><p className="mt-2 text-sm text-lav">Calculate your Driver, Conductor, Life Path, Name Number, Personal Year, and Lo Shu pattern together in the free analysis.</p><a href="/analyzer" className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold text-goldlite hover:bg-gold/10">Open full free analysis <Check className="h-4 w-4" /></a></div>}</div>;
}
