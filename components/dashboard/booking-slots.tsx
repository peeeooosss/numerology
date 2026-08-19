"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarCheck, CalendarClock, CheckCircle2, Loader2, LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionIntakeFields } from "@/components/session-intake-fields";
import { NameBalancingIntakeFields } from "@/components/name-balancing-intake-fields";
import { formatDateOfBirth, initialSessionIntake, type SessionIntakeValues } from "@/lib/session-intake";
import { getService, type ServiceType } from "@/lib/services";
import { useModal } from "@/lib/use-modal";

type AvailabilitySlot = {
  id: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  remaining: number;
  label: string;
};

type Props = { onBooked?: () => void; serviceType?: ServiceType };

const demoIntake: SessionIntakeValues = {
  ...initialSessionIntake,
  name: "Aarav Mehta",
  fullBirthName: "Aarav Rajesh Mehta",
  currentName: "Aarav Mehta",
  dob: "1992-05-14",
  email: "demo@aura-numerology.com",
};

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short" }).format(new Date(value));
}

export function BookingSlots({ onBooked, serviceType = "numerology" }: Props) {
  const service = getService(serviceType);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selected, setSelected] = useState<AvailabilitySlot | null>(null);
  const [form, setForm] = useState<SessionIntakeValues>(demoIntake);
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState<{ id: string; time: string } | null>(null);
  const [error, setError] = useState("");
  useModal(Boolean(selected), () => setSelected(null));

  async function refresh() {
    try {
      const response = await fetch("/api/availability", { cache: "no-store" });
      const data = await response.json();
      if (response.ok && data.success) setSlots(data.slots as AvailabilitySlot[]);
    } catch {
      setError("Availability could not be loaded. Please try again.");
    }
  }

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), 15_000);
    const onFocus = () => void refresh();
    window.addEventListener("focus", onFocus);
    return () => { window.clearInterval(interval); window.removeEventListener("focus", onFocus); };
  }, []);

  function openBooking(slot: AvailabilitySlot) {
    setSelected(slot);
    setForm(demoIntake);
    setError("");
    setConfirmed(null);
  }

  function updateField(field: keyof SessionIntakeValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setProcessing(true);
    setError("");
    try {
      const orderResponse = await fetch("/api/payments/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ serviceType, name: form.name, email: form.email }) });
      const order = await orderResponse.json();
      if (!orderResponse.ok || !order.success || order.mode !== "development") throw new Error(order.error || "Test order failed");

      const bookingResponse = await fetch("/api/sessions/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          fullBirthName: form.fullBirthName,
          currentName: form.currentName,
          dateOfBirth: formatDateOfBirth(form.dob),
          email: form.email,
          phone: form.phone || undefined,
          focusArea: form.focusArea,
          subFocusArea: form.subFocusArea,
          question: form.question,
          desiredOutcome: form.desiredOutcome || undefined,
           additionalContext: form.additionalContext || undefined,
           serviceType,
           nameType: form.nameType || undefined,
           pronunciation: form.pronunciation || undefined,
           nameLanguage: form.nameLanguage || undefined,
           usageContext: form.usageContext || undefined,
           nameConcern: form.nameConcern || undefined,
           candidateNames: form.candidateNames || undefined,
           nameConstraints: form.nameConstraints || undefined,
           mustPreserve: form.mustPreserve || undefined,
           legalChange: form.legalChange || undefined,
           slotId: selected.id,
          paymentId: order.orderId,
        }),
      });
      const booking = await bookingResponse.json();
      if (!bookingResponse.ok || !booking.success) throw new Error(booking.error || "This time has just been booked. Please choose another slot.");
      setConfirmed({ id: booking.bookingId, time: booking.scheduledAt });
      setSelected(null);
      await refresh();
      onBooked?.();
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "Booking failed");
      await refresh();
    } finally {
      setProcessing(false);
    }
  }

  return (
    <section className="rounded-2xl border border-gold/15 bg-white/[.025] p-5 shadow-cardglow md:p-6">
       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="flex items-center gap-2 text-xs uppercase tracking-[.2em] text-gold"><CalendarClock className="h-4 w-4" />Book a focused session</p><h2 className="mt-2 font-display text-2xl">Choose your {service.durationMinutes}-minute {service.shortName} window</h2><p className="mt-2 text-sm text-lav">Published times refresh automatically. All times are shown in IST. Calendar blocks are reserved in safe 15-minute windows.</p></div><span className="text-xs text-lav">Live availability</span></div>
      {error && !selected && <p role="alert" className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
       {confirmed && <div className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4"><div className="flex items-center gap-2 text-emerald-200"><CheckCircle2 className="h-4 w-4" />Session booked successfully</div><p className="mt-2 text-sm text-cream">{confirmed.time}</p><p className="mt-1 font-mono text-xs text-lav">Booking ID: {confirmed.id}</p></div>}
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{slots.map((slot) => <Button key={slot.id} variant="outline" size="sm" onClick={() => openBooking(slot)} className="h-auto min-h-14 justify-start"><span className="flex flex-col items-start"><span>{dateLabel(slot.startsAt)}</span><span className="text-xs text-lav">{slot.label}</span></span></Button>)}</div>
      {!slots.length && <p className="mt-5 text-sm text-lav">No new slots are available right now. Check back soon.</p>}

       {selected && (
        <div className="modal-safe-padding fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-midnight/85 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="dashboard-booking-title">
          <div className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-gold/30 bg-[#14162d] p-5 shadow-cardglow sm:p-6 md:max-h-[90vh] md:p-8">
             <button type="button" onClick={() => setSelected(null)} aria-label="Close booking form" className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-lg text-lav focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold hover:bg-white/10 hover:text-cream"><X className="h-4 w-4" /></button>
             <p className="text-xs uppercase tracking-[.2em] text-gold">{service.name}</p>
            <h3 id="dashboard-booking-title" className="mt-2 font-display text-2xl text-cream">{dateLabel(selected.startsAt)} · {selected.label}</h3>
             <p className="mt-2 text-sm text-lav">{service.description} Answer the intake questions so the Master can prepare for this session.</p>
            {error && <p role="alert" className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
             {processing ? <div className="py-14 text-center"><Loader2 className="mx-auto h-10 w-10 animate-spin text-gold" /><p className="mt-4 text-sm text-lav">Creating your test order and reserving this time…</p></div> : <form className="mt-6" onSubmit={submitBooking}>{serviceType === "name-balancing" ? <NameBalancingIntakeFields form={form} updateField={updateField} idPrefix="dashboard-name-balancing" showPreferredTime={false} /> : <SessionIntakeFields form={form} updateField={updateField} idPrefix="dashboard-session" showPreferredTime={false} />}<div className="mt-4 rounded-xl border border-gold/15 bg-gold/5 p-3"><div className="flex items-center gap-2 text-sm text-gold"><LockKeyhole className="h-4 w-4" /><span>Test checkout · ₹{service.price} mock order · no live charge</span></div></div><Button type="submit" className="mt-4 w-full">Confirm booking · ₹{service.price} <CalendarCheck className="h-4 w-4" /></Button></form>}
          </div>
        </div>
      )}
    </section>
  );
}
