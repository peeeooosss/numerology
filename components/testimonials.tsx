import { Quote } from "lucide-react";

const reflections = [
  "The report gave me a clear way to reflect on my current priorities.",
  "I appreciated seeing the calculations and the explanation side by side.",
  "The session helped me organize the questions I wanted to explore.",
];

export function Testimonials() {
  return <section id="testimonials" className="bg-cosmic px-5 py-20 sm:px-8 md:py-28"><div className="mx-auto max-w-6xl"><div className="mb-14 text-center"><p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">Client reflections</p><h2 className="font-display text-3xl font-semibold text-cream md:text-4xl">A calmer way to explore your numbers.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-lav">Numerology is most useful when it helps you slow down, notice patterns, and make your own decisions.</p></div><div className="grid gap-6 md:grid-cols-3">{reflections.map((reflection) => <article key={reflection} className="rounded-2xl border border-gold/15 bg-white/[.04] p-6"><Quote className="h-7 w-7 text-gold/60" /><p className="mt-5 leading-relaxed text-cream">“{reflection}”</p><p className="mt-5 text-xs uppercase tracking-wider text-lav">Client reflection</p></article>)}</div></div></section>;
}
