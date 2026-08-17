/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Home,
  LockKeyhole,
  Menu,
  Play,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingSlots } from "@/components/dashboard/booking-slots";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  buildNumerologyProfile,
  LIFE_PATH_TITLES,
  PERSONAL_YEAR_THEMES,
} from "@/lib/numerology-engine";
import { PERSONAL_DAY_GUIDANCE } from "@/lib/interpretations";
import { getService } from "@/lib/services";

const resources = [
  { title: "Your Life Path, decoded", type: "8 min watch", locked: false, color: "from-copper/70 to-[#27244f]" },
  { title: "The wealth number ritual", type: "12 min watch", locked: false, color: "from-[#74532b] to-[#191a38]" },
  { title: "Compatibility & connection", type: "Premium lesson", locked: true, color: "from-[#513252] to-[#171a3c]" },
  { title: "Your personal year ahead", type: "Premium lesson", locked: true, color: "from-[#263e54] to-[#171a3c]" },
];

// Demo client (in production this comes from session/auth)
const DEMO_CLIENT = {
  name: "Aarav Mehta",
  dob: "14 May 1992",
  fullBirthName: "Aarav Rajesh Mehta",
  email: "demo@aura-numerology.com",
};

type DashboardSession = {
  id: string;
  focusArea: string;
  subFocusArea?: string | null;
  scheduledAt: string;
  status: string;
  serviceType?: string;
  duration?: number;
  pricePaid?: number;
  question?: string | null;
  createdAt: string;
  availabilitySlot?: { startsAt: string } | null;
};

function formatSessionDate(scheduledAt: string, createdAt: string, slotStart?: string) {
  const date = new Date(slotStart || scheduledAt.replace(" · IST", ""));
  const fallback = new Date(createdAt);
  const value = Number.isNaN(date.getTime()) ? fallback : date;
  return Number.isNaN(value.getTime()) ? scheduledAt : new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(value) + " IST";
}

function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-gold/10 bg-[#0d0f20] p-5 transition-transform lg:static lg:flex lg:w-64 lg:shrink-0 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between px-2 py-3">
          <span className="font-display text-xl text-cream">
            <span className="text-gold">AURA</span> portal
          </span>
          <button className="text-lav lg:hidden" onClick={close} aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-10 space-y-2">
          {(
            [
              [Home, "Dashboard", "#"],
              [BookOpen, "My Resources", "#resources"],
              [CalendarDays, "Booking History", "#history"],
            ] as const
          ).map(([Icon, label, href], index) => (
            <a
              key={label}
              href={href}
              onClick={close}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                index === 0
                  ? "bg-gold/10 font-medium text-gold"
                  : "text-lav hover:bg-white/5 hover:text-cream"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
        <div className="mt-auto border-t border-white/10 pt-5">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream">
            <ArrowUpRight className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<ReturnType<typeof buildNumerologyProfile> | null>(null);
  const [dailyGuidance, setDailyGuidance] = useState<{
    theme: string;
    prediction: string;
    dos: string[];
    donts: string[];
    energyScore: number;
    luckyNumbers: number[];
    personalDay: number;
  } | null>(null);
  const [sessionHistory, setSessionHistory] = useState<DashboardSession[]>([]);
  const [sessionSummary, setSessionSummary] = useState({ total: 0, upcoming: 0, completed: 0, cancelled: 0 });

  useEffect(() => {
    // Build real numerology profile from demo client data
    const core = buildNumerologyProfile(DEMO_CLIENT.dob, DEMO_CLIENT.fullBirthName, "blended");
    setProfile(core);

    // Build daily guidance from personal day number
    const guidance = PERSONAL_DAY_GUIDANCE[core.personalDay] ?? PERSONAL_DAY_GUIDANCE[1];

    // Calculate energy score locally
    const lifePathReduced = core.lifePath > 9 ? (core.lifePath === 11 ? 2 : core.lifePath === 22 ? 4 : 6) : core.lifePath;
    let score = 60;
    if (core.personalDay === lifePathReduced) score += 20;
    if (core.personalDay === core.personalYear) score += 10;
    if (core.personalDay === 1 || core.personalDay === 8) score += 8;
    if (core.personalDay === 7) score -= 15;
    score = Math.max(40, Math.min(100, score));

    setDailyGuidance({
      theme: guidance.theme,
      prediction: guidance.prediction,
      dos: guidance.dos,
      donts: guidance.donts,
      energyScore: score,
      luckyNumbers: core.luckyNumbers,
      personalDay: core.personalDay,
    });
  }, []);

  async function refreshSessions() {
    try {
      const email = window.localStorage.getItem("aura_user_email") || DEMO_CLIENT.email;
      const response = await fetch(`/api/sessions?email=${encodeURIComponent(email)}`, { cache: "no-store" });
      const data = await response.json();
      if (response.ok && data.success) {
        setSessionHistory(data.sessions as DashboardSession[]);
        setSessionSummary(data.summary);
      }
    } catch {
      // The booking panel remains usable if history is temporarily unavailable.
    }
  }

  useEffect(() => { void refreshSessions(); }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const firstName = DEMO_CLIENT.name.split(" ")[0];
  const lpTitle = profile ? (LIFE_PATH_TITLES[profile.lifePath] ?? "Your Path") : "…";
  const pyTheme = profile ? (PERSONAL_YEAR_THEMES[profile.personalYear] ?? "") : "";

  return (
    <main className="min-h-screen bg-cosmic-field text-cream">
      <div className="flex min-h-screen">
        <Sidebar open={menuOpen} close={() => setMenuOpen(false)} />
        {menuOpen && (
          <button
            className="fixed inset-0 z-30 bg-midnight/70 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation overlay"
          />
        )}

        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-gold/10 bg-midnight/35 px-5 py-4 sm:px-8 lg:px-10">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-lav hover:bg-white/5 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-right sm:block">
                <span className="block text-sm font-medium">{DEMO_CLIENT.name}</span>
                <span className="text-xs text-lav">
                  Life Path {profile?.lifePath ?? "…"} · {lpTitle}
                </span>
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-gold">
                {DEMO_CLIENT.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Welcome */}
            <div>
              <p className="text-sm text-gold">{today}</p>
              <h1 className="mt-2 font-display text-3xl text-cream md:text-4xl">
                Welcome back, {firstName}
              </h1>
              <p className="mt-2 text-sm text-lav">
                Personal Day {profile?.personalDay ?? "…"} ·{" "}
                {dailyGuidance?.theme ?? "Calculating your numbers…"}
              </p>
            </div>

            {/* Daily AURA Card */}
            <Card className="glass overflow-hidden border-gold/25">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-gold">
                      <Sparkles className="h-4 w-4" />
                      Daily AURA AI insights
                    </div>
                    <h2 className="mt-3 font-display text-2xl">
                      {dailyGuidance?.theme ?? "Calculating…"}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-lav">
                      {dailyGuidance?.prediction ?? "Your numbers are being calculated…"}
                    </p>

                    {/* Do's and Don'ts */}
                    {dailyGuidance && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold/70">
                            Today's Do's
                          </p>
                          <ul className="space-y-1.5">
                            {dailyGuidance.dos.slice(0, 3).map((d) => (
                              <li key={d} className="flex items-start gap-2 text-xs text-lav">
                                <Check className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400/70">
                            Today's Don'ts
                          </p>
                          <ul className="space-y-1.5">
                            {dailyGuidance.donts.slice(0, 2).map((d) => (
                              <li key={d} className="flex items-start gap-2 text-xs text-lav">
                                <X className="mt-0.5 h-3 w-3 shrink-0 text-red-400/70" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Energy + lucky numbers */}
                  <div className="flex flex-col gap-3 md:items-end">
                    <div className="rounded-2xl border border-gold/20 bg-gold/10 px-5 py-4 text-center">
                      <p className="text-xs text-lav">Energy score</p>
                      <p className="font-display text-4xl text-gold">
                        {dailyGuidance?.energyScore ?? "—"}
                        <span className="text-xl text-lav">/100</span>
                      </p>
                      <p className="mt-1 text-[10px] text-lav">
                        Personal Day {profile?.personalDay ?? "…"}
                      </p>
                    </div>
                    {dailyGuidance && (
                      <div className="rounded-xl border border-gold/15 bg-white/5 px-4 py-3 text-center">
                        <p className="mb-2 text-[10px] uppercase tracking-widest text-lav">
                          Lucky numbers
                        </p>
                        <div className="flex gap-2">
                          {dailyGuidance.luckyNumbers.map((n) => (
                            <span
                              key={n}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-display text-sm text-gold"
                            >
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Numbers Row */}
            {profile && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { label: "Life Path", value: profile.lifePath, sub: lpTitle },
                  { label: "Expression", value: profile.expression, sub: "Your Destiny" },
                  { label: "Soul Urge", value: profile.soulUrge, sub: "Heart's Desire" },
                  { label: "Personality", value: profile.personality, sub: "How You Appear" },
                  { label: "Personal Year", value: profile.personalYear, sub: pyTheme.replace("A Year of ", "") },
                ].map(({ label, value, sub }) => (
                  <Card key={label} className="border-gold/15">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-lav">{label}</p>
                      <p className="mt-1 font-display text-3xl text-gold">{value}</p>
                      <p className="mt-1 text-[10px] text-lav/70">{sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Booking */}
              <Card className="border-gold/15">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock3 className="h-4 w-4 text-gold" />
                    Book a session
                  </CardTitle>
                </CardHeader>
                  <CardContent className="space-y-6">
                    <BookingSlots serviceType="numerology" onBooked={() => void refreshSessions()} />
                    <BookingSlots serviceType="name-balancing" onBooked={() => void refreshSessions()} />
                  </CardContent>
              </Card>

              {/* Resources */}
              <div id="resources">
                <h2 className="mb-4 flex items-center gap-2 text-base font-medium text-cream">
                  <BookOpen className="h-4 w-4 text-gold" />
                  My Resources
                </h2>
                <div className="space-y-3">
                  {resources.map((r) => (
                    <div
                      key={r.title}
                      className={`flex items-center justify-between rounded-xl bg-gradient-to-r ${r.color} p-4`}
                    >
                      <div className="flex items-center gap-3">
                        {r.locked ? (
                          <LockKeyhole className="h-4 w-4 text-lav/50" />
                        ) : (
                          <Play className="h-4 w-4 text-gold" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${r.locked ? "text-lav/50" : "text-cream"}`}>
                            {r.title}
                          </p>
                          <p className="text-xs text-lav/60">{r.type}</p>
                        </div>
                      </div>
                      {!r.locked && (
                        <button className="rounded-lg border border-gold/20 px-3 py-1 text-xs text-gold hover:bg-gold/10">
                          Watch
                        </button>
                      )}
                    </div>
                  ))}
                  <a
                    href="/dashboard/lo-shu-blueprint"
                    className="flex items-center justify-between rounded-xl border border-gold/25 bg-gradient-to-r from-[#352b45] to-[#171a3c] p-4 transition hover:border-gold/50"
                  >
                    <div className="flex items-center gap-3">
                      <LockKeyhole className="h-4 w-4 text-gold" />
                      <div>
                        <p className="text-sm font-medium text-cream">Full Lo Shu Blueprint</p>
                        <p className="text-xs text-lav/70">Unlock after your ₹999 session</p>
                      </div>
                    </div>
                    <span className="rounded-lg border border-gold/30 px-3 py-1 text-xs text-gold">View map</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Booking History */}
            <div id="history">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-medium text-cream">
                  <CalendarDays className="h-4 w-4 text-gold" />
                  Booking History
                </h2>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4" />
                  Download report
                </Button>
              </div>
              <div className="mb-4 grid gap-3 sm:grid-cols-4">
                {[
                  ["Total sessions", sessionSummary.total],
                  ["Upcoming", sessionSummary.upcoming],
                  ["Completed", sessionSummary.completed],
                  ["Cancelled", sessionSummary.cancelled],
                ].map(([label, value]) => <Card key={label as string} className="border-gold/15"><CardContent className="p-4"><p className="text-xs text-lav">{label}</p><p className="mt-2 font-display text-2xl text-gold">{value}</p></CardContent></Card>)}
              </div>
              <Card className="border-gold/15">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Focus</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessionHistory.length ? sessionHistory.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-sm">{formatSessionDate(s.scheduledAt, s.createdAt, s.availabilitySlot?.startsAt)}</TableCell>
                        <TableCell className="text-sm text-gold">{getService(s.serviceType).shortName}</TableCell>
                        <TableCell className="text-sm text-lav">{s.focusArea}{s.subFocusArea ? <span className="block text-xs text-lav/60">{s.subFocusArea}</span> : null}</TableCell>
                        <TableCell className="text-sm text-lav">{s.duration ?? getService(s.serviceType).durationMinutes} min</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${s.status === "completed" ? "bg-emerald-500/10 text-emerald-300" : s.status === "cancelled" ? "bg-rose-500/10 text-rose-300" : "bg-gold/10 text-gold"}`}>
                            {s.status === "completed" && <Check className="h-3 w-3" />}
                            {s.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    )) : <TableRow><TableCell colSpan={5} className="py-8 text-center text-sm text-lav">Your booked sessions will appear here.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Upgrade nudge if no dashboard access yet */}
            <Card className="border-gold/25 bg-gradient-to-r from-[#1a1a3e] to-[#0d0f20]">
              <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
                <TrendingUp className="h-8 w-8 shrink-0 text-gold" />
                <div className="flex-1">
                  <p className="font-medium text-cream">Unlock full daily predictions</p>
                  <p className="mt-1 text-sm text-lav">
                    Book your first 1-on-1 session to activate personalised daily AURA insights,
                    monthly forecasts, and your 12-month deep dive PDF — included free.
                  </p>
                </div>
                <a href="/#offer-999" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold via-goldlite to-copper px-3 py-2 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110">
                  Book session · ₹999
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
