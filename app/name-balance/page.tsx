import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Check,
  Clock3,
  FileText,
  LockKeyhole,
  PenTool,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Name Balance Consultation",
  description:
    "Compare your current name, birth name, and possible spelling variations in a focused 10-minute numerology consultation. ₹499.",
  alternates: { canonical: "https://magicofnumbers.in/name-balance" },
  openGraph: {
    title: "Name Balance Consultation | Magic of Numbers",
    description:
      "Compare your current name, birth name, and possible spelling variations in a focused 10-minute numerology consultation.",
    url: "https://magicofnumbers.in/name-balance",
  },
};

const topics = [
  {
    title: "Birth name vs. current name",
    desc: "How the name you were given at birth compares to the name you use today — and what that difference means in your chosen numerology system.",
  },
  {
    title: "Professional name",
    desc: "Whether your business name, stage name, or professional alias carries the kind of energy you want behind it.",
  },
  {
    title: "Spelling variations",
    desc: "Send 2–3 candidate spellings before the session and compare their vibrations against your birth numbers.",
  },
  {
    title: "Pronunciation & cultural context",
    desc: "How the way a name sounds and is used in your cultural context affects its numerological weight.",
  },
];

const faqs = [
  {
    q: "How is this different from the ₹999 session?",
    a: "The ₹499 Name Balance session is a focused 10-minute consultation specifically about name spelling and vibration. The ₹999 session is a broader 15-minute consultation covering career, relationships, timing, and personal direction.",
  },
  {
    q: "What if I want to change my name after the session?",
    a: "We provide reflective guidance, not legal advice. The session helps you understand the numerological patterns of each option — the decision to change is entirely yours.",
  },
  {
    q: "Can I bring multiple name options?",
    a: "Yes. Send up to 3 candidate spellings before your session and we will compare each one against your birth numbers.",
  },
  {
    q: "Is this legal name change advice?",
    a: "No. This is a numerology-based reflection session. For legal name changes, consult a legal professional in your jurisdiction.",
  },
];

export default function NameBalancePage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cosmic-field px-5 pt-36 pb-20 sm:px-8 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-copper/10 blur-3xl" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[.2em] text-goldlite">
            <PenTool className="h-3.5 w-3.5 text-gold" />
            Name consultation
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl md:text-6xl">
            Your name, <em className="bg-gradient-to-r from-gold via-goldlite to-copper bg-clip-text text-transparent">through numbers</em>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-lav md:text-lg">
            Compare your current name, birth name, and spelling variations in a focused 10-minute consultation — ₹499.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="/#name-balancing"
              className="animate-pulse-glow inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-7 py-4 text-sm font-semibold text-midnight transition hover:scale-[1.03] sm:px-8 sm:text-base"
            >
              <Sparkles className="h-5 w-5" />
              Book name balance session · ₹499
            </a>
            <p className="flex items-center gap-2 text-xs text-lav/80">
              <LockKeyhole className="h-3.5 w-3.5 text-gold" />
              10-minute focused session · Send spellings in advance
            </p>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-cream sm:text-4xl">
            What we cover
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {topics.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-6"
              >
                <h3 className="font-display text-lg text-gold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lav">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before You Book */}
      <section className="bg-cosmic-field px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl text-cream">
            Before you book
          </h2>
          <div className="mt-10 space-y-4">
            {[
              "Send up to 3 candidate name spellings before your session.",
              "Share your date of birth and current name with the spelling you use professionally or personally.",
              "If you have a specific question — such as a business name or a name you are considering — mention it when booking.",
              "The session is reflective, not legal guidance. We help you understand the numerological patterns of each option.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-gold/10 bg-[#101225]/40 p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <p className="text-sm text-lav">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
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
