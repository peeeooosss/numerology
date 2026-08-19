import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Our Numerology Method",
  description:
    "Magic of Numbers blends Chaldean name calculation, Vedic Driver and Conductor numbers, Western Pythagorean Life Path, and Lo Shu Grid analysis into one coherent reading.",
  alternates: { canonical: "https://magicofnumbers.in/methodology" },
  openGraph: {
    title: "Our Numerology Method | Magic of Numbers",
    description:
      "Blending Chaldean, Vedic, and Western Pythagorean methods with Lo Shu Grid analysis into one coherent reading.",
    url: "https://magicofnumbers.in/methodology",
  },
};

const methods = [
  {
    title: "Western Pythagorean",
    numbers: "Life Path, Expression, Soul Urge, Personality",
    desc: "The Western Pythagorean system uses a standard letter-to-number mapping across the full alphabet. It is one of the most widely recognized numerology methods in the world and forms the basis for the Life Path Number and the core expression numbers.",
    detail:
      "Life Path is calculated from the full date of birth. Expression, Soul Urge, and Personality are derived from the full birth name. This system is particularly strong at mapping life direction, inner desires, and outward presentation.",
  },
  {
    title: "Chaldean Name Numerology",
    numbers: "Name Number, Vibration Score",
    desc: "The Chaldean system is one of the oldest numerology traditions. It assigns values based on sound vibration rather than alphabetical order, and considers only the name you are commonly known by — not necessarily the full birth certificate name.",
    detail:
      "In our system, Chaldean calculation is used for the Name Number and the Name Harmony comparison. This is why the same letters can carry different weight depending on the method — each system has its own logic.",
  },
  {
    title: "Vedic Numerology",
    numbers: "Driver Number, Conductor Number",
    desc: "Vedic numerology is rooted in Indian mathematical and astrological traditions. It emphasizes the birth date itself as the primary source of the two most important numbers in a person's chart: the Driver and the Conductor.",
    detail:
      "The Driver Number (Moolank) is the single-digit reduction of the birth date. The Conductor Number (Bhagyank) is the full reduction of the birth date digits. These two numbers together form the core of Vedic numerological interpretation.",
  },
  {
    title: "Lo Shu Grid",
    numbers: "9-cell grid with missing and repeated numbers",
    desc: "The Lo Shu Grid is a 3x3 square arranged with numbers 1 to 9. In the Magic of Numbers implementation, non-zero birth-date digits are used together with the documented Driver and Conductor inputs. The presence, absence, or repetition of numbers is presented as a traditional reflection pattern, not an objective personality test.",
    detail:
      "Missing numbers in the grid are treated as areas for conscious reflection. Repeated numbers indicate strong tendencies or emphasis in certain traits. The grid provides a visual map for discussion, not a diagnosis or fixed prediction.",
  },
];

const faqs = [
  {
    q: "Why do you use multiple systems?",
    desc: "Each numerology tradition emphasizes different aspects of a person's numbers. By combining them, we get a more layered and complete picture than any single system provides on its own.",
  },
  {
    q: "Is this traditional or modern numerology?",
    desc: "It is a blend. Chaldean and Vedic numerology are ancient traditions. Western Pythagorean is more widely known in the modern West. We combine them into a single coherent reading.",
  },
  {
    q: "How do you calculate the Name Harmony score?",
    desc: "The Name Harmony score compares the vibrations of your current name against your birth numbers using both Chaldean and Vedic methods. A higher score means stronger alignment between your name and your birth numbers.",
  },
  {
    q: "Do you guarantee accuracy?",
    desc: "We do not guarantee accuracy or predictive outcomes. Numerology is a reflective tool for self-understanding, not a factual or scientific system. Our goal is to help you explore patterns and reflect on your direction.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="pb-20 sm:pb-0">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cosmic-field px-5 pt-36 pb-20 sm:px-8 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[.2em] text-goldlite">
            Our methodology
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-cream sm:text-5xl md:text-6xl">
            Four systems. <em className="bg-gradient-to-r from-gold via-goldlite to-copper bg-clip-text text-transparent">One reading</em>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-lav md:text-lg">
            Magic of Numbers blends Chaldean name calculation, Vedic Driver and
            Conductor numbers, Western Pythagorean Life Path, and Lo Shu Grid
            analysis into one coherent reading.
          </p>
        </div>
      </section>

      {/* Methods */}
      <section className="bg-midnight px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {methods.map((m, i) => (
            <div
              key={m.title}
              className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-lg text-gold">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-display text-2xl text-cream">{m.title}</h2>
                  <p className="mt-1 text-xs uppercase tracking-wider text-gold">
                    {m.numbers}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-lav">{m.desc}</p>
              <p className="mt-3 text-sm leading-relaxed text-lav/70">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Blending Note */}
      <section className="bg-cosmic-field px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-cream">
            Why the numbers look different
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-lav">
            You may notice that the same name or date of birth produces
            different numbers depending on the system. This is expected. Each
            method measures something different — and that is precisely why
            combining them gives a richer, more complete picture.
          </p>
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
                  {faq.desc}
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
