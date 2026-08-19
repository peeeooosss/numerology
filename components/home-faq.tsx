export const HOME_FAQS = [
  ["What is a numerology calculation?", "A numerology calculation uses your name and date of birth to derive numbers such as Life Path, Driver, Conductor, Name Number, and Lo Shu Grid placement. Magic of Numbers presents these calculations as a reflective tool, not as scientific prediction."],
  ["What does the free analysis show?", "The free analysis calculates your Name Number, Driver Number, Conductor Number, Life Path, Personal Year, lucky numbers, Name Harmony preview, and Lo Shu pattern from the information you provide."],
  ["What is included in the ₹99 report?", "The ₹99 report adds detailed interpretations, full Lo Shu analysis, career and relationship reflections, name and birth-number synthesis, and a 12-month forecast in a downloadable PDF."],
  ["How is Name Balance different from the ₹999 session?", "The ₹499 Name Balance consultation focuses on current names and spelling options. The ₹999 consultation is a broader 15-minute conversation about a personal question, timing, career, relationships, or direction."],
] as const;

export function HomeFaq() {
  return <section className="bg-midnight px-5 py-20 sm:px-8"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">Questions answered</p><h2 className="font-display text-3xl text-cream sm:text-4xl">Start with clarity, not certainty.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-lav">Learn how the calculations work, what the free analysis includes, and when a detailed report or session may be useful.</p></div><div className="mt-10 space-y-4">{HOME_FAQS.map(([question, answer]) => <details key={question} className="rounded-2xl border border-gold/15 bg-[#101225]/60 p-5"><summary className="cursor-pointer font-display text-base text-cream">{question}</summary><p className="mt-3 text-sm leading-relaxed text-lav">{answer}</p></details>)}</div></div></section>;
}
