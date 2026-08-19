import { ArrowRight, Sparkles } from "lucide-react";

export function MobileFreeAnalysisBar() {
  return <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-midnight/95 px-4 pt-3 shadow-[0_-12px_35px_rgba(8,9,20,.7)] backdrop-blur-xl sm:hidden">
    <a href="/analyzer" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-5 text-sm font-semibold text-midnight shadow-goldglow">
      <Sparkles className="h-4 w-4" /> Get Free Analysis <ArrowRight className="h-4 w-4" />
    </a>
  </div>;
}
