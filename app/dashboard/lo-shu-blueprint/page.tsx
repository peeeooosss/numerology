"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Blueprint = {
  client: { name: string; dateOfBirth: string };
  driver: number;
  conductor: number;
  rows: number[][];
  counts: Record<string, number>;
  missing: number[];
  repeated: Array<{ digit: number; count: number }>;
  completedLines: Array<{ label: string; kind: string; digits: number[] }>;
  missingDetails: Array<{ number: number; title: string; impact: string; remedies: string[] }>;
};

export default function LoShuBlueprintPage() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [status, setStatus] = useState<"loading" | "locked" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/dashboard/lo-shu", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json() as Blueprint & { error?: string };
        if (response.status === 403) {
          setMessage(data.error || "Book your ₹999 session to unlock this blueprint.");
          setStatus("locked");
          return;
        }
        if (!response.ok) throw new Error(data.error || "Unable to load blueprint");
        setBlueprint(data);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        setMessage(error instanceof Error ? error.message : "Unable to load blueprint");
        setStatus("error");
      });
  }, []);

  if (status === "loading") {
    return <main className="flex min-h-screen-dynamic items-center justify-center bg-cosmic-field text-lav">Preparing your private blueprint…</main>;
  }

  if (status !== "ready" || !blueprint) {
    return (
        <main className="min-h-screen-dynamic bg-cosmic-field px-5 py-12 text-cream sm:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-gold/20 bg-[#13162c] p-8 text-center shadow-cardglow">
          <LockKeyhole className="mx-auto h-12 w-12 text-gold" />
          <p className="mt-5 text-xs uppercase tracking-[.2em] text-gold">Full Lo Shu Blueprint</p>
          <h1 className="mt-3 font-display text-3xl">Your private map is locked</h1>
          <p className="mt-4 leading-relaxed text-lav">{message}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full rounded-full sm:w-auto"><ArrowLeft className="h-4 w-4" /> Back to dashboard</Button>
            </Link>
            <Link href="/#offer-999">
              <Button className="w-full rounded-full sm:w-auto"><Sparkles className="h-4 w-4" /> Book ₹999 session</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen-dynamic bg-cosmic-field px-5 py-10 text-cream sm:px-8 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-lav hover:text-gold"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-gold">Private session benefit</p>
            <h1 className="mt-2 font-display text-4xl">{blueprint.client.name}&apos;s Lo Shu Blueprint</h1>
            <p className="mt-2 text-sm text-lav">Driver {blueprint.driver} · Conductor {blueprint.conductor} · {blueprint.client.dateOfBirth}</p>
          </div>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs text-gold">Unlocked after completed session</span>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
          <div className="rounded-2xl border border-gold/20 bg-[#13162c] p-6 shadow-cardglow">
            <p className="text-xs uppercase tracking-[.2em] text-gold">Complete energy map</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {blueprint.rows.flat().map((digit) => (
                <div key={digit} className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-gold/20 bg-[#0d0f20]">
                  <span className="font-display text-3xl text-gold">{digit}</span>
                  <span className="mt-1 text-sm tracking-[.15em] text-cream">{"• ".repeat(blueprint.counts[String(digit)] || 0).trim() || "—"}</span>
                   <span className="mt-1 text-xs text-lav">{blueprint.counts[String(digit)] || 0} present</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-gold/20 bg-gold/5 p-4 text-sm text-lav">
              <span className="text-gold">Completed lines:</span>{" "}
              {blueprint.completedLines.map((line) => line.label).join(", ") || "No complete line"}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gold/20 bg-[#13162c] p-6">
              <p className="text-xs uppercase tracking-[.2em] text-gold">The numbers asking for attention</p>
              <h2 className="mt-2 font-display text-2xl">{blueprint.missing.length} missing numbers</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {blueprint.missing.map((number) => <span key={number} className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-sm text-red-200">Number {number}</span>)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-lav">These gaps are interpreted as areas where conscious structure and personalised guidance can help you create more balance.</p>
            </div>

            <div className="rounded-2xl border border-gold/20 bg-[#13162c] p-6">
              <p className="text-xs uppercase tracking-[.2em] text-gold">Personalised remedies</p>
              <div className="mt-4 space-y-4">
                {blueprint.missingDetails.map((detail) => (
                  <article key={detail.number} className="rounded-xl border border-white/10 bg-[#0d0f20] p-4">
                    <h3 className="font-display text-xl text-gold">{detail.number} · {detail.title}</h3>
                    <p className="mt-2 text-sm text-lav">This missing vibration {detail.impact}.</p>
                    <ul className="mt-3 space-y-1 text-sm text-cream">
                      {detail.remedies.map((remedy) => <li key={remedy}>• {remedy}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
