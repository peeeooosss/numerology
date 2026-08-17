"use client";

import { FormEvent, useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2, LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionIntakeFields } from "@/components/session-intake-fields";
import { formatDateOfBirth, initialSessionIntake, type SessionIntakeValues } from "@/lib/session-intake";

type BookingState = "form" | "processing" | "confirmed" | "error";

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
  const [form, setForm] = useState<SessionIntakeValues>(initialSessionIntake);

  function openModal() {
    setState("form");
    setError("");
    setResult(null);
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

    try {
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceType: "numerology", name: form.name, email: form.email || undefined }),
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok || !order.success) throw new Error(order.error || "Test order failed");
      if (order.mode !== "development") throw new Error("Live Razorpay checkout is not enabled in this test build.");

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
           serviceType: "numerology",
           paymentId: order.orderId,
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
        <div role="dialog" aria-modal="true" aria-labelledby="intake-title" className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/85 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gold/30 bg-[#14162d] p-6 shadow-cardglow md:p-8">
            <button type="button" onClick={() => setOpen(false)} aria-label="Close form" className="absolute right-4 top-4 rounded-lg p-2 text-lav hover:bg-white/10 hover:text-cream"><X className="h-4 w-4" /></button>

            {state === "confirmed" && result ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
                <h3 className="mt-5 font-display text-2xl text-cream">Test booking confirmed</h3>
                 <p className="mt-3 text-sm leading-relaxed text-lav">Your ₹999 test order and Numerology session record were created successfully.</p>
                <div className="my-6 rounded-xl border border-gold/20 bg-gold/5 p-4 text-left text-sm">
                  <p className="text-lav">Booking ID</p><p className="mt-1 font-mono text-xs text-gold">{result.bookingId}</p>
                  <p className="mt-3 text-lav">Session time</p><p className="mt-1 text-cream">{result.scheduledAt}</p>
                  <p className="mt-3 text-lav">Dashboard access</p><p className="mt-1 text-gold">Unlocks after the first session is completed</p>
                </div>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </div>
            ) : state === "processing" ? (
              <div className="py-16 text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin text-gold" /><h3 className="mt-5 font-display text-2xl text-cream">Confirming your session…</h3><p className="mt-2 text-sm text-lav">Creating the test order and booking record.</p></div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[.2em] text-gold">Test booking checkout</p>
                <h3 id="intake-title" className="mt-2 font-display text-2xl text-cream">Tell us about you</h3>
                 <p className="mt-2 text-sm text-lav">This test flow creates a ₹999 mock order and records your 15-minute Numerology session.</p>
                {error && <p role="alert" className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
                <form className="mt-6" onSubmit={submitBooking}>
                  <SessionIntakeFields form={form} updateField={updateField} />
                   <div className="mt-4 rounded-xl border border-gold/15 bg-gold/5 p-3"><div className="flex items-center gap-2 text-sm text-gold"><LockKeyhole className="h-4 w-4" /><span>Test checkout · ₹999 mock order · no live charge</span></div></div>
                  <Button type="submit" className="mt-4 w-full">Confirm test session · ₹999 <CalendarCheck className="h-4 w-4" /></Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
