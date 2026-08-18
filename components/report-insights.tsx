import {
  BriefcaseBusiness,
  CalendarDays,
  Coins,
  Grid3X3,
  Hash,
  HeartHandshake,
  Brain,
  UserRound,
} from "lucide-react";

const insights = [
  { icon: UserRound, title: "Personality", description: "Understand your natural strengths, behavioural tendencies, and potential challenges." },
  { icon: BriefcaseBusiness, title: "Career & Business", description: "Explore professional tendencies, strengths, and areas that may suit your numerical profile." },
  { icon: Coins, title: "Money & Prosperity", description: "Understand your financial tendencies and numerical patterns associated with prosperity." },
  { icon: HeartHandshake, title: "Relationships", description: "Explore communication styles, emotional tendencies, and relationship dynamics." },
  { icon: Brain, title: "Strengths & Challenges", description: "Identify repeated numbers and areas that may require greater balance." },
  { icon: Grid3X3, title: "Lo Shu Grid", description: "Understand the presence, absence, and repetition of numbers within your birth-date pattern." },
  { icon: Hash, title: "Driver & Conductor Numbers", description: "Explore the influence of your key numerological numbers." },
  { icon: CalendarDays, title: "Important Numbers", description: "Discover numbers and numerical patterns that may have personal significance." },
];

export function ReportInsights() {
  return (
    <section id="insights" className="bg-cosmic px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">What your numbers reveal</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-cream md:text-4xl">Your Numbers. Your Patterns. Your Possibilities.</h2>
          <p className="mt-4 leading-relaxed text-lav">Every person has a unique numerical pattern. At ProsperPath Numerology, we use structured numerology analysis to help you understand the numbers associated with your date of birth and name.</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-gold/15 bg-white/[.04] p-5 transition hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[.06]">
              <Icon className="h-5 w-5 text-gold" />
              <h3 className="mt-5 font-display text-xl text-cream">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-lav">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
