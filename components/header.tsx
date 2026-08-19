"use client";

import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Free Analysis", "/analyzer"],
    ["₹99 Report", "/#offer-99"],
    ["Insights", "/#insights"],
    ["Your Journey", "/#journey"],
    ["About", "/#about"],
    ["Client Login", "/login"],
  ];

  return <header className="safe-top fixed inset-x-0 top-0 z-40 border-b border-gold/10 bg-midnight/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
      <a href="#top" className="shrink-0 font-display text-lg tracking-wide text-cream sm:text-xl"><span className="text-gold">ProsperPath</span> Numerology</a>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={label} href={href} className="min-h-11 inline-flex items-center text-sm text-lav transition hover:text-cream">{label}</a>)}
      </nav>
      <div className="flex items-center gap-2">
        <a href="/#offer-99" className="group hidden min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-3 py-2 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110 sm:inline-flex sm:px-5"><Sparkles className="h-4 w-4" />Get ₹99 Report<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></a>
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 text-lav transition hover:bg-white/5 hover:text-cream lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="safe-bottom border-t border-gold/10 bg-midnight px-5 pb-4 pt-2 lg:hidden">
      <div className="mx-auto grid max-w-6xl gap-1">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="min-h-11 inline-flex items-center rounded-xl px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream">{label}</a>)}
      </div>
    </nav>}
  </header>;
}
