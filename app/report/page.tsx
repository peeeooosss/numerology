import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  BookOpen,
  Check,
  Clock3,
  FileText,
  LockKeyhole,
  Sparkles,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Personalized Numerology Report",
  description:
    "Explore your Name Number, Driver Number, Life Path, Lo Shu Grid and 12-month guidance in a personalized numerology report. One-time ₹99 PDF.",
  alternates: { canonical: "https://magicofnumbers.in/report" },
  openGraph: {
    title: "Personalized Numerology Report | Magic of Numbers",
    description:
      "Explore your Name Number, Driver Number, Life Path, Lo Shu Grid and 12-month guidance in a personalized numerology report.",
    url: "https://magicofnumbers.in/report",
  },
};

const sections = [
  {
    title: "Core Numbers",
    desc: "Life Path, Driver, Conductor, Expression, Soul Urge, and Personality — each number explained in plain language.",
  },
  {
    title: "Lo Shu Grid Breakdown",
    desc: "Your 9-cell grid with missing numbers, repetitions, and what each placement suggests about your tendencies.",
  },
  {
    title: "Name Harmony",
    desc: "How your current name aligns with your birth numbers through Chaldean and Vedic calculation methods.",
  },
  {
    title: "Career & Finance",
    desc: "Work tendencies, money patterns, leadership style, and the professional environments where your numbers tend to perform best.",
  },
  {
    title: "Relationships",
    desc: "Communication style, emotional needs, compatibility themes, and relationship patterns your numbers suggest.",
  },
  {
    title: "12-Month Forecast",
    desc: "Month-by-month Personal Year and Personal Day guidance to help you reflect on timing and decisions.",
  },
];

const faqs = [
  {
    q: "What does the ₹99 report include?",
    a: "Your full Name Number, Driver Number, Life Path, Lo Shu Grid, relationship themes, career guidance, and a 12-month forecast — delivered as a downloadable PDF.",
  },
  {
    q: "How is this different from the free analysis?",
    a: "The free analysis gives you a calculation-only preview. The ₹99 report adds full interpretations, Lo Shu Grid detail, and a personalized 12-month forecast.",
  },
  {
    q: "How soon will I receive the report?",
    a: "Reports are generated instantly after payment and are available for download from your dashboard within minutes.",
  },
  {
    q: "Can I request a correction after purchase?",
    a: "If there is an error in the calculation or report content, contact support and we will issue a corrected version.",
  },
];

export default function ReportPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cosmic-field px-5 pt-36 pb-20 sm:px-8 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[.2em] text-goldlite">
            <FileText className="h-3.5 w-3.5 text-gold" />
            Personalized report
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl md:text-6xl">
            Your numbers, <em className="bg-gradient-to-r from-gold via-goldlite to-copper bg-clip-text text-transparent">fully decoded</em>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-lav md:text-lg">
            A detailed numerology report covering your core numbers, Lo Shu Grid, name harmony, career patterns, relationships, and a 12-month forecast — one-time ₹99.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="/analyzer"
              className="animate-pulse-glow inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-7 py-4 text-sm font-semibold text-midnight transition hover:scale-[1.03] sm:px-8 sm:text-base"
            >
              <Sparkles className="h-5 w-5" />
              Start with free analysis
            </a>
            <p className="flex items-center gap-2 text-xs text-lav/80">
              <LockKeyhole className="h-3.5 w-3.5 text-gold" />
              Secure checkout · Download from your dashboard
            </p>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-cream sm:text-4xl">
            What&apos;s inside the report
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-lav">
            Six focused sections covering the areas most people ask about —
            calculated from your full name and date of birth.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-6"
              >
                <h3 className="font-display text-lg text-gold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lav">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Paid Comparison */}
      <section className="bg-cosmic-field px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl text-cream">
            Free analysis vs. ₹99 report
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/15">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gold/10 bg-gold/5">
                  <th className="px-5 py-3 text-xs uppercase tracking-wider text-gold">
                    Feature
                  </th>
                  <th className="px-5 py-3 text-xs uppercase tracking-wider text-gold">
                    Free
                  </th>
                  <th className="px-5 py-3 text-xs uppercase tracking-wider text-gold">
                    ₹99 Report
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Name Number & Driver", true, true],
                  ["Life Path & Personal Year", true, true],
                  ["Lo Shu Grid preview", true, true],
                  ["Core number interpretations", false, true],
                  ["Full Lo Shu Grid breakdown", false, true],
                  ["Career & finance guidance", false, true],
                  ["Relationship patterns", false, true],
                  ["12-month forecast", false, true],
                  ["Downloadable PDF", false, true],
                ].map(([label, free, paid]) => (
                  <tr key={label as string} className="border-b border-gold/5">
                    <td className="px-5 py-3 text-cream">{label}</td>
                    <td className="px-5 py-3 text-center">
                      {free ? (
                        <Check className="mx-auto h-4 w-4 text-gold" />
                      ) : (
                        <span className="text-lav/40">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {paid ? (
                        <Check className="mx-auto h-4 w-4 text-gold" />
                      ) : (
                        <span className="text-lav/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl text-cream">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Zap className="h-6 w-6 text-gold" />,
                step: "1",
                title: "Calculate free",
                desc: "Enter your name and date of birth in the free analysis tool. Your numbers are calculated instantly.",
              },
              {
                icon: <FileText className="h-6 w-6 text-gold" />,
                step: "2",
                title: "Unlock the report",
                desc: "If you want full interpretations and the 12-month forecast, unlock the ₹99 report through secure checkout.",
              },
              {
                icon: <BookOpen className="h-6 w-6 text-gold" />,
                step: "3",
                title: "Download & reflect",
                desc: "Your PDF is available immediately in your dashboard. Read through each section at your own pace.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
                  {item.icon}
                </div>
                <p className="text-xs uppercase tracking-wider text-gold">
                  Step {item.step}
                </p>
                <h3 className="mt-2 font-display text-lg text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-lav">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-cosmic-field px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-display text-3xl text-cream">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-gold/15 bg-[#101225]/60 p-5"
              >
                <summary className="cursor-pointer font-display text-base text-cream">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-lav">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
