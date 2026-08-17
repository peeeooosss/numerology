"use client";

import { useEffect, useState } from "react";
import { CalendarClock, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slot = {
  id: string;
  startsAt: string;
  endsAt: string;
  bookedCount: number;
  capacity: number;
  label: string;
};

function today() {
  const date = new Date();
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function labelFor(slot: Slot) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date(slot.startsAt));
}

export function AvailabilityManager() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [date, setDate] = useState(today);
  const [start, setStart] = useState("11:00");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    const response = await fetch("/api/availability?includeBooked=true", { cache: "no-store" });
    const data = await response.json();
    if (response.ok && data.success) setSlots(data.slots as Slot[]);
  }

  useEffect(() => { void refresh(); }, []);

  async function addSlot() {
    setError("");
    const startsAt = new Date(`${date}T${start}:00+05:30`);
    const response = await fetch("/api/availability", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ startsAt: startsAt.toISOString() }) });
    const data = await response.json();
    if (!response.ok || !data.success) { setError(data.error || "Slot could not be published"); return; }
    setSaved(true);
    await refresh();
  }

  async function removeSlot(id: string) {
    await fetch(`/api/availability/${id}`, { method: "DELETE" });
    setSaved(true);
    await refresh();
  }

  return <section id="availability"><div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[.2em] text-gold">Calendar settings</p><h2 className="mt-2 font-display text-2xl">Availability slots</h2><p className="mt-2 max-w-xl text-sm text-lav">Create exact 15-minute windows clients can book. Published changes are shared by every dashboard.</p></div><span className="text-xs text-lav">Practice timezone: IST</span></div><div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="grid gap-3 rounded-xl border border-gold/15 bg-gold/[.04] p-4 md:grid-cols-[1fr_1fr_auto] md:items-end"><div><label htmlFor="slot-date" className="mb-2 block text-xs uppercase tracking-wider text-lav">Date</label><input id="slot-date" type="date" value={date} min={today()} onChange={(event) => setDate(event.target.value)} className="h-11 w-full rounded-lg border border-gold/20 bg-[#14162d] px-3 text-sm text-cream outline-none focus:border-gold [color-scheme:dark]" /></div><div><label htmlFor="slot-start" className="mb-2 block text-xs uppercase tracking-wider text-lav">Start time (IST)</label><input id="slot-start" type="time" value={start} onChange={(event) => setStart(event.target.value)} className="h-11 w-full rounded-lg border border-gold/20 bg-[#14162d] px-3 text-sm text-cream outline-none focus:border-gold [color-scheme:dark]" /></div><Button type="button" variant="outline" onClick={() => void addSlot()}><Plus className="h-4 w-4" />{saved ? "Add another slot" : "Publish 15-min slot"}</Button></div>{error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}<div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{slots.map((slot) => <div key={slot.id} className="rounded-xl border border-white/10 bg-midnight/40 p-3"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-cream">{labelFor(slot)}</p><p className="mt-1 text-sm text-gold">{slot.label}</p><p className="mt-1 text-xs text-lav">{slot.bookedCount}/{slot.capacity} booked</p></div><button type="button" onClick={() => void removeSlot(slot.id)} className="rounded-lg p-2 text-lav hover:bg-rose-400/10 hover:text-rose-300" aria-label="Remove availability slot"><Trash2 className="h-4 w-4" /></button></div></div>)}{!slots.length && <p className="text-sm text-lav">No future slots published.</p>}</div></div><div className="mt-4 flex items-center gap-2 text-xs text-lav"><CalendarClock className="h-4 w-4 text-gold" />Dashboard availability refreshes automatically when a slot changes.</div></section>;
}
