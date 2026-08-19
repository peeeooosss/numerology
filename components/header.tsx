"use client";

import { ArrowRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const primaryLinks: [string, string][] = [
    ["Free Analysis", "/analyzer"],
    ["Reports", "/report"],
    ["Name Balance", "/name-balance"],
    ["Consultation", "/consultation"],
    ["Guides", "/blog"],
  ];

  const toolLinks: [string, string][] = [
    ["Personal Day", "/personal-day-calculator"],
    ["Name Comparison", "/name-comparison-calculator"],
    ["Compatibility", "/numerology-compatibility-calculator"],
    ["Business Name", "/business-name-numerology-calculator"],
    ["Lucky Date", "/lucky-date-calculator"],
    ["Cycles", "/numerology-cycles-calculator"],
    ["Question Builder", "/session-question-builder"],
    ["All Tools", "/tools"],
  ];

  const secondaryLinks: [string, string][] = [
    ["Methodology", "/methodology"],
    ["About", "/about"],
    ["Client Login", "/login"],
  ];

  return (
    <header className="safe-top fixed inset-x-0 top-0 z-40 border-b border-gold/10 bg-midnight/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="/"
          className="shrink-0 font-display text-lg tracking-wide text-cream sm:text-xl"
        >
          <span className="text-gold">Magic</span> of Numbers
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {primaryLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="min-h-11 inline-flex items-center rounded-lg px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream"
            >
              {label}
            </a>
          ))}

          {/* Tools dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setToolsOpen((v) => !v)}
              className="min-h-11 inline-flex items-center gap-1 rounded-lg px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Free Tools
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-2xl border border-gold/15 bg-[#101225] p-2 shadow-xl">
                {toolLinks.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setToolsOpen(false)}
                    className="flex min-h-10 items-center rounded-xl px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {secondaryLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="min-h-11 inline-flex items-center rounded-lg px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/analyzer"
            className="group hidden min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-3 py-2 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110 sm:inline-flex sm:px-5"
          >
            <Sparkles className="h-4 w-4" />
            Free analysis
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 text-lav transition hover:bg-white/5 hover:text-cream lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="safe-bottom border-t border-gold/10 bg-midnight px-5 pb-4 pt-2 lg:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-1">
            {primaryLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="min-h-11 inline-flex items-center rounded-xl px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream"
              >
                {label}
              </a>
            ))}
            <div className="my-1 h-px bg-gold/10" />
            <p className="px-3 pt-2 text-[11px] uppercase tracking-[.15em] text-gold/60">
              Free Tools
            </p>
            {toolLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="min-h-11 inline-flex items-center rounded-xl px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream"
              >
                {label}
              </a>
            ))}
            <div className="my-1 h-px bg-gold/10" />
            {secondaryLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="min-h-11 inline-flex items-center rounded-xl px-3 text-sm text-lav transition hover:bg-white/5 hover:text-cream"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
