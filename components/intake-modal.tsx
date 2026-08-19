"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock3, Loader2, LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionIntakeFields } from "@/components/session-intake-fields";
import { formatDateOfBirth, initialSessionIntake, type SessionIntakeValues } from "@/lib/session-intake";
import { useModal } from "@/lib/use-modal";
import { openRazorpayCheckout, type RazorpayPaymentResponse } from "@/lib/razorpay-client";

type BookingState = "form" | "processing" | "confirmed" | "error";
type Slot = { id: string; startsAt: string; label: string };

interface BookingResult {
  bookingId: string;
  scheduledAt: string;
  dashboardAccess: string;
}

export function IntakeModal() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<BookingState>("form");
  const [error, setError] = useState("");
  const [result, setResult] = useState<BookingResult | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState<SessionIntakeValues>(initialSessionIntake);
  useModal(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    void fetch("/api/availability", { cache: "no-store" }).then(async (response) => {
      const data = await response.json();
      if (response.ok && data.success) setSlots(data.slots as Slot[]);
      else setError(data.error || "Availability could not be loaded.");
    }).catch(() => setError("Availability could not be loaded. Please try again."));
  }, [open]);

  function openModal() {
    setState("form");
    setError("");
    setResult(null);
    setSelectedSlot(null);
    setSlots([]);
    setForm(initialSessionIntake);
    setOpen(true);
  }

  function updateField(field: keyof SessionIntakeValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("processing");
    setError("");
    if (!selectedSlot) {
      setError("Choose an available time first.");
      setState("error");
      return;
    }

    try {
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: "numerology", name: form.name, email: form.email || undefined }),
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok || !order.success) throw new Error(order.error || "Payment order could not be created.");
      let paymentId = order.orderId;
      if (order.mode !== "development") {
        const payment: RazorpayPaymentResponse = await openRazorpayCheckout({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          orderId: order.orderId,
          name: "Magic of Numbers",
          description: "Numerology Consultation",
          prefill: { name: form.name, email: form.email, contact: form.phone },
        });
        const verifyResponse = await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payment) });
        const verify = await verifyResponse.json();
        if (!verifyResponse.ok || !verify.success) throw new Error(verify.error || "Payment verification failed.");
        paymentId = payment.razorpay_payment_id;
      }

      const bookingResponse = await fetch("/api/sessions/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          fullBirthName: form.fullBirthName || form.name,
          currentName: form.currentName || undefined,
          dateOfBirth: formatDateOfBirth(form.dob),
          email: form.email || undefined,
          phone: form.phone || undefined,
          focusArea: form.focusArea,
          subFocusArea: form.subFocusArea,
          question: form.question,
          desiredOutcome: form.desiredOutcome || undefined,
          additionalContext: form.additionalContext || undefined,
           scheduledAt: form.scheduledAt || undefined,
           slotId: selectedSlot.id,
           serviceType: "numerology",
            paymentId,
        }),
      });
      const booking = await bookingResponse.json();
      if (!bookingResponse.ok || !booking.success) throw new Error(booking.error || "Booking could not be saved");

      setResult({ bookingId: booking.bookingId, scheduledAt: booking.scheduledAt, dashboardAccess: booking.dashboardAccess || "pending_first_session" });
      setState("confirmed");
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "Booking failed");
      setState("error");
    }
  }

  return (
    <>
       <Button onClick={openModal} className="mt-7 rounded-full px-7 py-4">
        <CalendarCheck className="h-5 w-5" />
         Book my 15-min session (₹999)
      </Button>

      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby="intake-title" className="modal-safe-padding fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-midnight/85 backdrop-blur-sm sm:items-center" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <div className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-gold/30 bg-[#14162d] p-5 shadow-cardglow sm:p-6 md:max-h-[90vh] md:p-8">
            <h2 id="intake-title" className="sr-only">Numerology consultation booking</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close form" className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-lg text-lav focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold hover:bg-white/10 hover:text-cream"><X className="h-4 w-4" /></button>

            {state === "confirmed" && result ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
                <h3 className="mt-5 font-display text-2xl text-cream">Your session is booked</h3>
                 <p className="mt-3 text-sm leading-relaxed text-lav">Your payment was verified and your Numerology session record was created successfully.</p>
                <div className="my-6 rounded-xl border border-gold/20 bg-gold/5 p-4 text-left text-sm">
                  <p className="text-lav">Booking ID</p><p className="mt-1 font-mono text-xs text-gold">{result.bookingId}</p>
                  <p className="mt-3 text-lav">Session time</p><p className="mt-1 text-cream">{result.scheduledAt}</p>
                  <p className="mt-3 text-lav">Dashboard access</p><p className="mt-1 text-gold">Unlocks after the first session is completed</p>
                </div>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
            ) : state === "processing" ? (
              <div className="py-16 text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin text-gold" /><h3 className="mt-5 font-display text-2xl text-cream">Confirming your session…</h3><p className="mt-2 text-sm text-lav">Verifying payment and booking your session.</p></div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[.2em] text-gold">Private consultation</p>
                 <h3 className="mt-2 font-display text-2xl text-cream">Tell us about you</h3>
                 <p className="mt-2 text-sm text-lav">Choose a focus area and complete secure payment. Your session details will be confirmed in your dashboard.</p>
                {error && <p role="alert" className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
                <form className="mt-6" onSubmit={submitBooking}>
                  <div className="mb-6">
                    <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-lav"><Clock3 className="h-4 w-4 text-gold" />Choose a time · IST</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {slots.map((slot) => <button type="button" key={slot.id} onClick={() => setSelectedSlot(slot)} className={`rounded-xl border p-3 text-left text-sm transition ${selectedSlot?.id === slot.id ? "border-gold bg-gold/10 text-gold" : "border-white/10 text-cream hover:border-gold/40"}`}><span className="block text-xs text-lav">{new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", day: "numeric", month: "short" }).format(new Date(slot.startsAt))}</span>{slot.label}</button>)}
                    </div>
                    {!slots.length && <p className="mt-2 text-sm text-lav">No new times are available right now.</p>}
                  </div>
                  <SessionIntakeFields form={form} updateField={updateField} />
                    <div className="mt-4 rounded-xl border border-gold/15 bg-gold/5 p-3"><div className="flex items-center gap-2 text-sm text-gold"><LockKeyhole className="h-4 w-4" /><span>Secure Razorpay payment · ₹999 one-time</span></div></div>
                   <Button type="submit" className="mt-4 w-full">Pay and book session · ₹999 <CalendarCheck className="h-4 w-4" /></Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
