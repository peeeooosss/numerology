import { ArrowRight, Sparkles } from "lucide-react";

export function Header() {
  return <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/10 bg-midnight/75 backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
       <a href="#top" className="font-display text-xl tracking-wide text-cream"><span className="text-gold">ProsperPath</span> Numerology</a>
      <a href="#offer-99" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-4 py-2.5 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110 sm:px-5"><Sparkles className="h-4 w-4" /> <span className="hidden sm:inline">Get ₹99 Report</span><span className="sm:hidden">₹99 Report</span><ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></a>
    </div>
  </header>;
}
