"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarClock } from "lucide-react";
import { loadAvailability, nextSlots, type AvailabilitySlot } from "@/lib/portal-data";

export function AvailabilityPreview() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  useEffect(() => { const refresh = () => setSlots(nextSlots(loadAvailability())); refresh(); window.addEventListener("aura-availability-updated", refresh); return () => window.removeEventListener("aura-availability-updated", refresh); }, []);
  return <section className="border-y border-gold/10 bg-[#101225] px-5 py-12 sm:px-8"><div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><div className="flex items-center gap-2 text-xs uppercase tracking-[.2em] text-gold"><CalendarClock className="h-4 w-4" />Next available sessions</div><h2 className="mt-2 font-display text-2xl text-cream">Choose a time that feels right.</h2><p className="mt-2 text-sm text-lav">Private 15-minute sessions. More times are available after you enter the portal.</p></div><div className="flex flex-wrap gap-2">{slots.length ? slots.map(slot => <a key={slot.id} href="/login" className="group rounded-xl border border-gold/20 bg-gold/[.06] px-4 py-3 transition hover:border-gold/60 hover:bg-gold/10"><span className="block text-xs text-lav">{slot.day}</span><span className="mt-1 flex items-center gap-2 text-sm font-medium text-goldlite">{slot.start}–{slot.end}<ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" /></span></a>) : <span className="text-sm text-lav">New session times are being prepared.</span>}</div></div></section>;
}
