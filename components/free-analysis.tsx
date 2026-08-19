"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Grid3X3, Loader2, LockKeyhole, Sparkles } from "lucide-react";
import { MobileFreeAnalysisBar } from "@/components/mobile-free-analysis-bar";

type AnalysisData = {
  core: {
    lifePath: number;
    expression: number;
    soulUrge: number;
    personality: number;
    personalYear: number;
    luckyNumbers: number[];
    driver: number;
    conductor: number;
    nameNumber: number;
  };
  lifePathTitle: string;
  personalYearTheme: string;
  nameHarmony: { score: number; label: string; method: string };
  loShu: {
    rows: number[][];
    counts: Record<string, number>;
    present: number[];
    missing: number[];
    repeated: Array<{ digit: number; count: number }>;
  };
  insights: {
    summary: string;
    strengths: string[];
    challenges: string[];
    career: string;
    relationships: string;
    loShuStrength: { label: string; text: string };
  };
};

const today = new Date().toISOString().slice(0, 10);

export function FreeAnalysis() {
  const [currentName, setCurrentName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/numerology/free-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentName, dateOfBirth }),
      });
      const payload = await response.json() as { success: boolean; data?: AnalysisData; error?: string };
      if (!response.ok || !payload.success || !payload.data) throw new Error(payload.error || "Analysis could not be prepared.");
      setResult(payload.data);
      window.setTimeout(() => document.getElementById("free-analysis-results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : "Analysis could not be prepared.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError("");
  }

  return <main id="top" className="min-h-screen-dynamic bg-cosmic-field pb-20 text-cream sm:pb-0">
    <MobileFreeAnalysisBar />
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[.18em] text-goldlite"><Sparkles className="h-3.5 w-3.5 text-gold" />Chaldean Numerology · Sound-based name analysis</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl md:text-6xl">Free Numerology Analysis</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-lav md:text-lg">Calculate your name number, Driver Number, Life Path Number, lucky numbers, Personal Year, Lo Shu pattern, and name harmony from your name and date of birth.</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-xs uppercase tracking-[.16em] text-lav sm:gap-4">
        {[["1", "Details"], ["2", "Analysis"], ["3", "Full Report"]].map(([number, label], index) => <div key={label} className="flex items-center gap-2"><span className={`flex h-8 w-8 items-center justify-center rounded-full border ${result && index === 1 ? "border-gold bg-gold text-midnight" : "border-gold/40 text-gold"}`}>{number}</span><span className="hidden sm:inline">{label}</span>{index < 2 && <span className="h-px w-5 bg-gold/20 sm:w-12" />}</div>)}
      </div>

      {!result ? <section className="mx-auto mt-10 max-w-xl rounded-3xl border border-gold/25 bg-[#101225]/90 p-6 shadow-cardglow sm:p-8">
        <p className="text-xs uppercase tracking-[.2em] text-gold">Step 1, your details</p>
        <h2 className="mt-3 font-display text-2xl text-cream">See what your numbers say</h2>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="free-current-name" className="mb-2 block text-sm font-medium text-cream">Your current name</label>
            <input id="free-current-name" required minLength={2} maxLength={100} value={currentName} onChange={(event) => setCurrentName(event.target.value)} placeholder="The name you use every day" className="h-12 w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 text-base text-cream outline-none placeholder:text-lav/70 focus:border-gold focus:ring-2 focus:ring-gold/20" />
          </div>
          <div>
            <label htmlFor="free-date-of-birth" className="mb-2 block text-sm font-medium text-cream">Date of birth</label>
            <input id="free-date-of-birth" required type="date" min="1900-01-01" max={today} value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} className="h-12 w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 text-base text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
          </div>
          {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
          <button type="submit" disabled={loading} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-5 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70">{loading ? <><Loader2 className="h-4 w-4 animate-spin" />Calculating your numbers…</> : <>Reveal My Chaldean Numbers <ArrowRight className="h-4 w-4" /></>}</button>
          <p className="flex items-center justify-center gap-2 text-center text-xs text-lav"><LockKeyhole className="h-3.5 w-3.5 text-gold" />Takes 10 seconds · 100% free · No signup</p>
        </form>
      </section> : <AnalysisResult result={result} reset={reset} />}
    </div>
  </main>;
}

function AnalysisResult({ result, reset }: { result: AnalysisData; reset: () => void }) {
  const { core, insights, loShu } = result;
  return <section id="free-analysis-results" className="scroll-mt-32 space-y-6">
    <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-cosmic2 to-[#101127] p-6 shadow-cardglow sm:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div><p className="text-xs uppercase tracking-[.2em] text-gold">Your reading at a glance</p><h2 className="mt-2 font-display text-3xl text-cream">Life Path {core.lifePath} · {result.lifePathTitle}</h2><p className="mt-3 max-w-2xl leading-relaxed text-lav">{insights.summary}</p></div>
        <div className="shrink-0 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-center"><p className="text-xs text-lav">Name Harmony</p><p className="mt-1 font-display text-4xl text-gold">{result.nameHarmony.score}%</p><p className="text-xs text-goldlite">{result.nameHarmony.label}</p></div>
      </div>
      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-lav">{result.nameHarmony.method}</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {[["Name Number", core.nameNumber], ["Driver", core.driver], ["Conductor", core.conductor], ["Life Path", core.lifePath], ["Personal Year", core.personalYear]].map(([label, value]) => <div key={label} className="rounded-2xl border border-gold/15 bg-white/[.04] p-5 text-center"><p className="text-sm text-lav">{label}</p><p className="mt-2 font-display text-4xl text-gold">{value}</p></div>)}
    </div>

    <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
      <div className="rounded-3xl border border-gold/20 bg-[#101225] p-6">
        <div className="flex items-center gap-2"><Grid3X3 className="h-5 w-5 text-gold" /><h3 className="font-display text-2xl text-cream">Your Lo Shu Grid</h3></div>
        <div className="mt-5 grid grid-cols-3 gap-2">{loShu.rows.flat().map((digit) => <div key={digit} className="flex min-h-20 flex-col items-center justify-center rounded-xl border border-gold/20 bg-midnight"><span className="font-display text-2xl text-gold">{digit}</span><span className="mt-1 text-sm text-cream">{loShu.counts[String(digit)] ? "• ".repeat(loShu.counts[String(digit)]).trim() : "—"}</span></div>)}</div>
        <p className="mt-4 text-sm leading-relaxed text-lav"><span className="text-gold">Missing:</span> {loShu.missing.join(" · ") || "None"}</p>
        <p className="mt-2 text-sm leading-relaxed text-lav"><span className="text-gold">Repeated:</span> {loShu.repeated.map((item) => `${item.digit} × ${item.count}`).join(" · ") || "None"}</p>
      </div>
      <div className="rounded-3xl border border-gold/20 bg-[#101225] p-6 sm:p-8"><p className="text-xs uppercase tracking-[.2em] text-gold">Your first insight</p><h3 className="mt-2 font-display text-2xl text-cream">{insights.loShuStrength.label}</h3><p className="mt-3 leading-relaxed text-lav">{insights.loShuStrength.text}</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4"><p className="text-sm font-semibold text-emerald-200">A natural strength</p><p className="mt-2 text-sm leading-relaxed text-lav">{insights.strengths[0]}</p></div><div className="rounded-2xl border border-copper/30 bg-copper/5 p-4"><p className="text-sm font-semibold text-copper">A balance area</p><p className="mt-2 text-sm leading-relaxed text-lav">{insights.challenges[0]}</p></div></div></div>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
      <InsightCard title="Career preview" text={insights.career} />
      <InsightCard title="Relationship preview" text={insights.relationships} />
      <InsightCard title={result.personalYearTheme} text="Your complete yearly rhythm and month-by-month focus are included in the detailed report." locked />
    </div>

    <div className="rounded-3xl border border-gold/30 bg-gold/10 p-6 text-center sm:p-8"><p className="text-xs uppercase tracking-[.2em] text-gold">Want to go deeper?</p><h3 className="mt-2 font-display text-3xl text-cream">Your free result shows the pattern. The ₹99 report explains it.</h3><p className="mx-auto mt-3 max-w-2xl leading-relaxed text-lav">Unlock detailed personality, career, money, relationship, Driver and Conductor, Lo Shu, and 12-month guidance in a personalized PDF.</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><a href="/#offer-99" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-midnight hover:bg-goldlite">Get My Detailed Report · ₹99 <ArrowRight className="h-4 w-4" /></a><a href="/#comparison" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-goldlite hover:bg-gold/10">Compare all options</a></div></div>
    <div className="flex justify-center"><button type="button" onClick={reset} className="min-h-11 px-4 text-sm text-lav underline-offset-4 hover:text-cream hover:underline">← Start a new analysis</button></div>
  </section>;
}

function InsightCard({ title, text, locked = false }: { title: string; text: string; locked?: boolean }) {
  return <article className="rounded-2xl border border-gold/15 bg-white/[.04] p-5"><div className="flex items-center justify-between gap-3"><h3 className="font-display text-xl text-cream">{title}</h3>{locked && <LockKeyhole className="h-4 w-4 text-gold" />}</div><p className={`mt-3 text-sm leading-relaxed ${locked ? "text-lav/80" : "text-lav"}`}>{text}</p>{locked && <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-gold"><Check className="h-3.5 w-3.5" />Detailed in the ₹99 report</p>}</article>;
}
