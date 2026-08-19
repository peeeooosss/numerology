"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock3, Loader2, LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NameBalancingIntakeFields } from "@/components/name-balancing-intake-fields";
import { formatDateOfBirth, initialSessionIntake, type SessionIntakeValues } from "@/lib/session-intake";
import { getService } from "@/lib/services";
import { useModal } from "@/lib/use-modal";

type Slot = { id: string; startsAt: string; label: string };
type BookingState = "form" | "processing" | "confirmed" | "error";

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short" }).format(new Date(value));
}

export function NameBalancingModal() {
  const service = getService("name-balancing");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<BookingState>("form");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [form, setForm] = useState<SessionIntakeValues>(initialSessionIntake);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  useModal(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    void fetch("/api/availability", { cache: "no-store" }).then(async (response) => {
      const data = await response.json();
      if (response.ok && data.success) setSlots(data.slots);
    }).catch(() => setError("Availability could not be loaded. Please try again."));
  }, [open]);

  function openModal() {
    setForm(initialSessionIntake);
    setSelected(null);
    setBookingId("");
    setScheduledAt("");
    setState("form");
    setError("");
    setOpen(true);
  }

  function updateField(field: keyof SessionIntakeValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) {
      setError("Choose an available time first.");
      return;
    }
    setState("processing");
    setError("");
    try {
      const orderResponse = await fetch("/api/payments/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ serviceType: "name-balancing", name: form.name, email: form.email || undefined }) });
      const order = await orderResponse.json();
      if (!orderResponse.ok || !order.success) throw new Error(order.error || "Test order failed");
      if (order.mode !== "development") throw new Error("Live Razorpay checkout is not enabled in this test build.");

      const bookingResponse = await fetch("/api/sessions/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        name: form.name || form.currentName,
        fullBirthName: form.fullBirthName,
        currentName: form.currentName,
        dateOfBirth: formatDateOfBirth(form.dob),
        email: form.email || undefined,
        phone: form.phone || undefined,
        focusArea: "Name balancing",
        subFocusArea: form.nameType,
        question: form.nameConcern,
        desiredOutcome: form.desiredOutcome,
        additionalContext: form.nameConstraints,
        serviceType: "name-balancing",
        nameType: form.nameType,
        pronunciation: form.pronunciation,
        nameLanguage: form.nameLanguage,
        usageContext: form.usageContext,
        nameConcern: form.nameConcern,
        candidateNames: form.candidateNames,
        nameConstraints: form.nameConstraints,
        mustPreserve: form.mustPreserve,
        legalChange: form.legalChange,
        slotId: selected.id,
        paymentId: order.orderId,
      }) });
      const booking = await bookingResponse.json();
      if (!bookingResponse.ok || !booking.success) throw new Error(booking.error || "Booking could not be saved");
      setBookingId(booking.bookingId);
      setScheduledAt(booking.scheduledAt);
      setState("confirmed");
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "Booking failed");
      setState("error");
    }
  }

  return <>
    <Button onClick={openModal} className="mt-7 rounded-full px-7 py-4"><CalendarCheck className="h-5 w-5" />Book Name Balancing · ₹{service.price}</Button>
    {open && <div role="dialog" aria-modal="true" aria-label="Name Balance Analysis booking" className="modal-safe-padding fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-midnight/85 backdrop-blur-sm sm:items-center" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-gold/30 bg-[#14162d] p-5 shadow-cardglow sm:p-6 md:max-h-[90vh] md:p-8">
        <button type="button" onClick={() => setOpen(false)} aria-label="Close form" className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-lg text-lav focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold hover:bg-white/10 hover:text-cream"><X className="h-4 w-4" /></button>
        {state === "confirmed" ? <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-gold" /><h3 id="name-balancing-title" className="mt-5 font-display text-2xl text-cream">Name Balancing booked</h3><p className="mt-3 text-sm text-lav">Your {service.durationMinutes}-minute consultation has been reserved.</p><div className="my-6 rounded-xl border border-gold/20 bg-gold/5 p-4 text-left text-sm"><p className="text-lav">Session time</p><p className="mt-1 text-cream">{scheduledAt}</p><p className="mt-3 text-lav">Booking ID</p><p className="mt-1 font-mono text-xs text-gold">{bookingId}</p></div><Button onClick={() => setOpen(false)}>Close</Button></div> : <><p className="text-xs uppercase tracking-[.2em] text-gold">{service.name}</p><h3 id="name-balancing-title" className="mt-2 font-display text-2xl text-cream">Choose a time and share your names</h3><p className="mt-2 text-sm text-lav">A 10-minute consultation. Calendar blocks are reserved in safe 15-minute windows.</p>{error && <p role="alert" className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}<div className="mt-5"><p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-lav"><Clock3 className="h-4 w-4 text-gold" />Available times · IST</p><div className="grid gap-2 sm:grid-cols-2">{slots.map((slot) => <button type="button" key={slot.id} onClick={() => setSelected(slot)} className={`rounded-xl border p-3 text-left text-sm transition ${selected?.id === slot.id ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-cream hover:border-gold/40"}`}><span className="block text-xs text-lav">{dateLabel(slot.startsAt)}</span>{slot.label}</button>)}</div>{!slots.length && <p className="text-sm text-lav">No new times are available right now.</p>}</div>{state === "processing" ? <div className="py-14 text-center"><Loader2 className="mx-auto h-10 w-10 animate-spin text-gold" /><p className="mt-4 text-sm text-lav">Creating your test order and reserving this time…</p></div> : <form className="mt-6" onSubmit={submitBooking}><NameBalancingIntakeFields form={form} updateField={updateField} showPreferredTime={false} /><div className="mt-4 rounded-xl border border-gold/15 bg-gold/5 p-3"><div className="flex items-center gap-2 text-sm text-gold"><LockKeyhole className="h-4 w-4" /><span>Test checkout · ₹{service.price} mock order · no live charge</span></div></div><Button type="submit" className="mt-4 w-full">Confirm Name Balancing · ₹{service.price} <CalendarCheck className="h-4 w-4" /></Button></form>}</>}
      </div>
    </div>}
  </>;
}
