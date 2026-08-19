import { ChartNoAxesColumnIncreasing, LockKeyhole, ScrollText, ShieldCheck, Sparkles } from "lucide-react";
import { Mandala } from "./mandala";
import { LandingImage } from "./landing-image";

export function Hero() {
  return <section id="top" className="relative overflow-hidden bg-cosmic-field px-5 pb-24 pt-36 sm:px-8 md:pb-32 md:pt-48">
    <div className="pointer-events-none absolute inset-0 opacity-20"><LandingImage kind="hero" className="object-cover" /></div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/60 to-[#1b1d3a]/90" />
    <div className="pointer-events-none absolute -right-36 -top-24 h-[520px] w-[520px] text-gold opacity-25" aria-hidden="true"><Mandala /></div>
    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] text-copper opacity-20" aria-hidden="true"><Mandala reverse /></div>
    <div className="relative mx-auto max-w-4xl text-center">
       <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-xs uppercase tracking-[.2em] text-goldlite"><Sparkles className="h-3.5 w-3.5 text-gold" />Free numerology calculator and guidance</p>
       <h1 className="font-display text-4xl font-semibold leading-[1.08] text-cream sm:text-5xl md:text-7xl">Calculate your numbers. <em className="bg-gradient-to-r from-gold via-goldlite to-copper bg-clip-text text-transparent">Understand</em> your patterns.</h1>
      <p className="mx-auto mt-6 max-w-2xl font-display text-xl leading-relaxed text-goldlite md:text-2xl">Your Date of Birth Has a Story. Let’s Decode It.</p>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-lav md:text-lg">Discover your unique numerological patterns and gain personalized insights into your personality, career, relationships, money tendencies, strengths, challenges, and life direction.</p>
       <div className="mt-10 flex flex-col items-center gap-4"><a href="/analyzer" className="animate-pulse-glow inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-7 py-4 text-sm font-semibold text-midnight transition hover:scale-[1.03] sm:px-8 sm:text-base"><ScrollText className="h-5 w-5" /> Start your free analysis</a><p className="flex items-center gap-2 text-xs text-lav/80"><LockKeyhole className="h-3.5 w-3.5 text-gold" /> No signup · See your core numbers in seconds</p></div>
      <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-lav sm:gap-x-10"><span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-gold" />Structured analysis</span><span className="flex items-center gap-2"><ChartNoAxesColumnIncreasing className="h-4 w-4 text-gold" />Personalized insights</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" />Private & confidential</span></div>
    </div>
  </section>;
}
