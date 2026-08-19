"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  LockKeyhole,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDateOfBirth } from "@/lib/session-intake";
import { useModal } from "@/lib/use-modal";

type Step = "form" | "paying" | "generating" | "done" | "error";

interface ReportResult {
  reportId: string;
  pdfUrl: string;
  lifePath: number;
  lifePathTitle: string;
  personalYear: number;
  driver: number;
  conductor: number;
}

export function ReportPurchaseModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReportResult | null>(null);
  useModal(open, () => setOpen(false));

  // Form state
  const [form, setForm] = useState({
    name: "",
    fullBirthName: "",
    currentName: "",
    dob: "",
    email: "",
    phone: "",
    focusArea: "Career direction",
    question: "",
  });

  function resetAndOpen() {
    setStep("form");
    setError("");
    setResult(null);
    setForm({
      name: "",
      fullBirthName: "",
      currentName: "",
      dob: "",
      email: "",
      phone: "",
      focusArea: "Career direction",
      question: "",
    });
    setOpen(true);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const dobFormatted = formatDateOfBirth(form.dob);

    if (!dobFormatted) {
      setError("Please enter a valid date of birth.");
      return;
    }

    try {
      // Step 1: Create Razorpay order
      setStep("paying");

      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99, name: form.name, email: form.email }),
      });

      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.error);

      // Step 2: If real Razorpay keys exist, open payment widget
      if (orderData.mode !== "development" && typeof window !== "undefined") {
        const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay({
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.orderId,
          name: "ProsperPath Numerology",
          description: "Personal Numerology Report",
          prefill: { name: form.name, email: form.email, contact: form.phone },
          theme: { color: "#D4AF37" },
          handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
            // Verify payment
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.success) throw new Error("Payment verification failed");
            await generateReport(dobFormatted, response.razorpay_payment_id);
          },
        });
        rzp.open();
        return;
      }

      // Development: skip payment, generate directly
      await generateReport(dobFormatted, orderData.orderId);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("error");
    }
  }

  async function generateReport(dobFormatted: string, paymentId: string) {
    setStep("generating");

    try {
      const genRes = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          fullBirthName: form.fullBirthName || form.name,
          currentName: form.currentName || undefined,
          dateOfBirth: dobFormatted,
          email: form.email || undefined,
          phone: form.phone || undefined,
          focusArea: form.focusArea,
          question: form.question || undefined,
          paymentId,
          amountPaid: 99,
        }),
      });

      const genData = await genRes.json();
      if (!genData.success) throw new Error(genData.error);

      setResult({
        reportId: genData.reportId,
        pdfUrl: genData.pdfUrl,
        lifePath: genData.core.lifePath,
        lifePathTitle:
          genData.core.lifePathIsMaster
            ? `Master ${genData.core.lifePath}`
            : `Life Path ${genData.core.lifePath}`,
        personalYear: genData.core.personalYear,
        driver: genData.core.vedic.driver,
        conductor: genData.core.vedic.conductor,
      });
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Report generation failed.");
      setStep("error");
    }
  }

  const focusAreas = [
    "Career direction",
    "Wealth & timing",
    "Love & relationships",
    "Name correction",
    "Personal growth",
    "Health guidance",
  ];

  return (
    <>
      {/* Trigger */}
      <span onClick={resetAndOpen} className="cursor-pointer">
        {trigger ?? (
          <Button className="rounded-full px-7 py-4">
            <FileText className="h-5 w-5" />
            Get your report for ₹99
          </Button>
        )}
      </span>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="modal-safe-padding fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-midnight/85 backdrop-blur-sm sm:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-gold/30 bg-[#14162d] p-5 shadow-cardglow sm:p-6 md:max-h-[90vh] md:p-8">
            <h2 id="report-modal-title" className="sr-only">Personalized numerology report purchase</h2>
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-lg text-lav focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold hover:bg-white/10 hover:text-cream"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ── STEP: FORM ── */}
            {(step === "form" || step === "error") && (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[.2em] text-gold">Personal Report</p>
                    <h3 className="font-display text-xl text-cream">
                      Your numerology decoded — ₹99
                    </h3>
                  </div>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-lav">
                  A 10-page PDF built from your exact date of birth and full name — your Life Path,
                  Expression, Soul Urge, Personal Year, 12-month forecast, lucky numbers, and
                  personalised guidance.
                </p>

                {error && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="rp-name">Your name (as called daily)</Label>
                        <Input
                          autoFocus
                        id="rp-name"
                        required
                        placeholder="Aarav Mehta"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rp-birth-name">Full name at birth</Label>
                      <Input
                        id="rp-birth-name"
                        required
                        placeholder="As on birth certificate"
                        value={form.fullBirthName}
                        onChange={(e) => setForm((f) => ({ ...f, fullBirthName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rp-dob">Exact date of birth</Label>
                        <Input
                          id="rp-dob"
                          required
                          type="date"
                          min="1900-01-01"
                          max={new Date().toISOString().slice(0, 10)}
                      value={form.dob}
                      onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="rp-current-name">Current name used daily (optional)</Label>
                    <Input
                      id="rp-current-name"
                      placeholder="The name people call you today"
                      value={form.currentName}
                      onChange={(e) => setForm((f) => ({ ...f, currentName: e.target.value }))}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="rp-email">Email (to receive report)</Label>
                      <Input
                        id="rp-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rp-phone">Phone (optional)</Label>
                      <Input
                        id="rp-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rp-focus">Primary focus area</Label>
                    <select
                      id="rp-focus"
                      value={form.focusArea}
                      onChange={(e) => setForm((f) => ({ ...f, focusArea: e.target.value }))}
                      className="min-h-12 w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-base text-cream focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    >
                      {focusAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="rp-question">One question for your report (optional)</Label>
                    <textarea
                      id="rp-question"
                      rows={2}
                      placeholder="e.g. Should I change careers this year?"
                      value={form.question}
                      onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                      className="min-h-12 w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-base text-cream placeholder:text-lav/70 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div className="rounded-xl border border-gold/15 bg-gold/5 p-3">
                    <div className="flex items-center gap-2 text-sm text-gold">
                      <LockKeyhole className="h-4 w-4" />
                      <span>Secure payment via Razorpay · ₹99 one-time</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Generate my report — ₹99
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}

            {/* ── STEP: PAYING ── */}
            {step === "paying" && (
              <div className="py-16 text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-gold" />
                <h3 className="mt-5 font-display text-2xl text-cream">Opening payment…</h3>
                <p className="mt-2 text-sm text-lav">
                  Secure checkout via Razorpay is loading.
                </p>
              </div>
            )}

            {/* ── STEP: GENERATING ── */}
            {step === "generating" && (
              <div className="py-16 text-center">
                <div className="relative mx-auto mb-6 h-16 w-16">
                  <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-gold" />
                  <div className="absolute inset-0 animate-pulse rounded-full border border-gold/30" />
                </div>
                <h3 className="font-display text-2xl text-cream">Calculating your numbers…</h3>
                <p className="mt-2 text-sm leading-relaxed text-lav">
                  Building your Western + Vedic profile.
                  <br />
                  Rendering your personalised PDF report.
                  <br />
                  This takes about 10–20 seconds.
                </p>
              </div>
            )}

            {/* ── STEP: DONE ── */}
            {step === "done" && result && (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
                <h3 className="mt-5 font-display text-3xl text-cream">Your report is ready</h3>
                <p className="mt-2 text-sm text-lav">
                  Calculated, rendered, and waiting for you.
                </p>

                <div className="my-6 rounded-xl border border-gold/25 bg-gold/5 px-6 py-4">
                  <p className="text-sm uppercase tracking-widest text-gold">Vedic Core</p>
                  <div className="mt-2 flex justify-center gap-8">
                    <div>
                      <p className="text-sm text-lav">Driver</p>
                      <p className="font-display text-4xl text-gold">{result.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-lav">Conductor</p>
                      <p className="font-display text-4xl text-gold">{result.conductor}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-lav">Plus your {result.lifePathTitle} reading</p>
                  <p className="mt-3 text-sm text-lav">
                    Personal Year {result.personalYear} ·{" "}
                    <span className="text-goldlite">Report ID: {result.reportId.slice(-8)}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`/api/reports/${result.reportId}/download`}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-midnight hover:bg-goldlite"
                  >
                    <Download className="h-4 w-4" />
                    Download your PDF report
                  </a>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-full"
                  >
                    Close
                  </Button>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-lav">
                  Ready to go deeper? Book a 15-minute session (₹999) to discuss your numbers
                  live and unlock your AURA daily dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
