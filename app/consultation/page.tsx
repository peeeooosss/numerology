import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  CalendarDays,
  Check,
  Clock3,
  FileText,
  LockKeyhole,
  MessageCircle,
  Sparkles,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Online Numerology Consultation",
  description:
    "Book a private 15-minute numerology consultation with Vinod. Discuss your current question and receive a free 12-month forecast PDF. ₹999.",
  alternates: { canonical: "https://magicofnumbers.in/consultation" },
  openGraph: {
    title: "Online Numerology Consultation | Magic of Numbers",
    description:
      "Book a private 15-minute numerology consultation with Vinod. Discuss your current question directly.",
    url: "https://magicofnumbers.in/consultation",
  },
};

const focusAreas = [
  "Career decisions and direction",
  "Relationship patterns and timing",
  "Personal year and monthly themes",
  "Business naming and partnerships",
  "Name balance follow-up",
  "General life direction questions",
];

const faqs = [
  {
    q: "What happens after I book?",
    a: "After booking, you will receive a confirmation with your scheduled time. You will also get access to your personal dashboard where you can see upcoming sessions and download your free 12-month forecast PDF.",
  },
  {
    q: "How is the session conducted?",
    a: "Sessions are conducted online via a video or voice link shared after booking. You will receive the meeting details in your dashboard.",
  },
  {
    q: "What is the free 12-month forecast?",
    a: "Every ₹999 session includes a free 12-month personalized forecast PDF — a month-by-month breakdown of your Personal Year and Personal Day energies.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes. You can reschedule from your dashboard as long as it is done before the session start time.",
  },
  {
    q: "What is the difference between the ₹999 and ₹499 sessions?",
    a: "The ₹999 session is a broader 15-minute consultation covering career, relationships, timing, and direction. The ₹499 session is a focused 10-minute consultation specifically about name spelling and vibration.",
  },
];

export default function ConsultationPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cosmic-field px-5 pt-36 pb-20 sm:px-8 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[.2em] text-goldlite">
            <CalendarDays className="h-3.5 w-3.5 text-gold" />
            Private consultation
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl md:text-6xl">
            Talk through your numbers <em className="bg-gradient-to-r from-gold via-goldlite to-copper bg-clip-text text-transparent">directly</em>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-lav md:text-lg">
            A private 15-minute consultation with Vinod. Discuss your current question and receive a free 12-month forecast PDF — ₹999.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="/#offer-999"
              className="animate-pulse-glow inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-7 py-4 text-sm font-semibold text-midnight transition hover:scale-[1.03] sm:px-8 sm:text-base"
            >
              <Sparkles className="h-5 w-5" />
              Book consultation · ₹999
            </a>
            <p className="flex items-center gap-2 text-xs text-lav/80">
              <LockKeyhole className="h-3.5 w-3.5 text-gold" />
              15-minute session · Free forecast PDF included
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-cream sm:text-4xl">
            What you get
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Clock3 className="h-5 w-5 text-gold" />,
                title: "15-minute session",
                desc: "A focused conversation about your current question — career, relationships, timing, or direction.",
              },
              {
                icon: <FileText className="h-5 w-5 text-gold" />,
                title: "Free 12-month forecast",
                desc: "A personalized month-by-month PDF included with every ₹999 session — yours to keep.",
              },
              {
                icon: <MessageCircle className="h-5 w-5 text-gold" />,
                title: "Direct access",
                desc: "Speak directly with Vinod. No chatbots, no generic scripts — a real conversation.",
              },
              {
                icon: <CalendarDays className="h-5 w-5 text-gold" />,
                title: "Flexible scheduling",
                desc: "Choose a time that works for you. Reschedule anytime from your dashboard.",
              },
              {
                icon: <Zap className="h-5 w-5 text-gold" />,
                title: "Dashboard access",
                desc: "After your session, access your daily predictions, Lo Shu Blueprint, and booking history.",
              },
              {
                icon: <Sparkles className="h-5 w-5 text-gold" />,
                title: "AURA daily insights",
                desc: "After your session is completed, unlock personalized daily AURA insights in your dashboard.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-gold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lav">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-cosmic-field px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl text-cream">
            Common focus areas
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-lav">
            You do not need to decide everything beforehand. Most people come
            with one clear question.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 rounded-xl border border-gold/10 bg-[#101225]/40 p-4"
              >
                <Check className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm text-cream">{area}</span>
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
