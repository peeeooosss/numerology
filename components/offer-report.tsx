import { CheckCircle2, FileText } from "lucide-react";
import { ReportPurchaseModal } from "./report-purchase-modal";

export function OfferReport() {
  return (
    <section id="offer-99" className="bg-cosmic-field px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* Report mockup card */}
        <div className="order-2 flex justify-center md:order-1">
          <div className="relative w-64 -rotate-3 transition duration-500 hover:rotate-0 sm:w-72">
            <div className="relative aspect-[3/4] rounded-lg border border-gold/25 bg-gradient-to-b from-[#161b35] to-[#0d0e1c] p-6 shadow-cardglow">
              <p className="text-[10px] uppercase tracking-[.25em] text-gold/80">Personal numerology report</p>
              <div className="mt-4 h-px bg-gold/20" />
              <div className="mt-6 text-center">
                <span className="text-xs text-lav">Your life path number</span>
                <span className="mt-1 block font-display text-6xl text-gold">7</span>
                <span className="text-[10px] text-lav/70">The Seeker of Truth</span>
              </div>
              <div className="mt-5 space-y-1.5">
                <div className="flex items-center gap-2 text-[9px] text-lav/60">
                  <span className="w-20 shrink-0">Expression</span>
                  <div className="h-1.5 flex-1 rounded-full bg-gold/20" />
                  <span>3</span>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-lav/60">
                  <span className="w-20 shrink-0">Soul Urge</span>
                  <div className="h-1.5 flex-1 rounded-full bg-gold/20" />
                  <span>11</span>
                </div>
                <div className="flex items-center gap-2 text-[9px] text-lav/60">
                  <span className="w-20 shrink-0">Personal Year</span>
                  <div className="h-1.5 flex-1 rounded-full bg-gold/20" />
                  <span>5</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] text-lav">
                <span className="rounded border border-gold/20 py-2">Wealth</span>
                <span className="rounded border border-gold/20 py-2">Love</span>
                <span className="rounded border border-gold/20 py-2">Career</span>
              </div>
              <FileText className="absolute bottom-6 right-6 h-4 w-4 text-gold/60" />
            </div>
            <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-3 rounded-lg border border-gold/10 bg-cosmic2/60" />
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 md:order-2">
          <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">Start here</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-cream md:text-4xl">
            Your personal report, decoded from your birth date.
          </h2>
          <p className="mt-4 leading-relaxed text-lav">
             A personalised PDF built from your exact date of birth and full name — blending
            Western Pythagorean and Vedic Chaldean numerology for the most accurate reading possible.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Life Path, Expression, Soul Urge & Personality numbers decoded",
              "12-month monthly forecast with energy levels and best dates",
              "Lucky numbers, aligned colours and Vedic gemstone guidance",
              "Personalised do's & don'ts rooted in your core vibration",
              "Affirmations written specifically for your Life Path number",
              "Vedic Driver & Conductor numbers decoded",
              "One major Lo Shu strength revealed, with your complete map teased",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-lav">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-baseline gap-3">
            <span className="font-display text-4xl text-gold">₹99</span>
            <span className="text-sm text-lav">one-time · instant PDF download</span>
          </div>

          <div className="mt-5">
            <ReportPurchaseModal />
          </div>
        </div>
      </div>
    </section>
  );
}
