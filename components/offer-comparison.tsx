import { Check, Sparkles } from "lucide-react";

const offers = [
  {
    name: "Free Analysis",
    price: "₹0",
    description: "A fast, calculation-based snapshot of your numbers.",
    cta: "Start Free Analysis",
    href: "/analyzer",
    featured: false,
    features: ["Name, date and core number calculations", "Driver, Conductor and Life Path", "Lucky numbers and Personal Year", "Mini Lo Shu Grid", "Short pattern insights"],
  },
  {
    name: "Detailed Report",
    price: "₹99",
    description: "Your complete personalized numerology PDF.",
    cta: "Get My Report",
    href: "#offer-99",
    featured: true,
    features: ["Everything in Free Analysis", "Detailed personality and life direction", "Career, money and relationship insights", "Complete Lo Shu interpretation", "12-month forecast and PDF download"],
  },
  {
    name: "Name Balance",
    price: "₹499",
    description: "A focused session for your current name and spellings.",
    cta: "Book Name Balance",
    href: "#name-balancing",
    featured: false,
    features: ["Birth and current name comparison", "Candidate spelling review", "Pronunciation and usage context", "Practical naming discussion", "10-minute focused consultation"],
  },
  {
    name: "Live Session",
    price: "₹999",
    description: "A private one-to-one conversation with Vinod.",
    cta: "Book Live Session",
    href: "#offer-999",
    featured: false,
    features: ["Private 15-minute consultation", "Discuss your personal question", "Career, relationship or timing guidance", "Free 12-month forecast PDF", "AURA dashboard after completion"],
  },
];

type ComparisonValue = boolean | string;

const comparisonRows: Array<[string, ComparisonValue[]]> = [
  ["Name and date calculation", [true, true, true, true]],
  ["Life Path, Driver and Conductor", [true, true, false, true]],
  ["Chaldean Name Number", [true, true, true, true]],
  ["Lucky numbers and Personal Year", [true, true, false, true]],
  ["Lo Shu Grid", [true, true, false, true]],
  ["Personality and life direction", ["Short preview", true, false, true]],
  ["Career, money and relationships", ["Preview", true, false, true]],
  ["Name spelling comparison", [false, false, true, false]],
  ["12-month forecast PDF", [false, true, false, true]],
  ["Live one-to-one guidance", [false, false, true, true]],
  ["AURA dashboard access", [false, false, false, true]],
];

export function OfferComparison() {
  return <section id="comparison" className="bg-[#0d0f20] px-5 py-20 sm:px-8 md:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">Choose your next step</p>
        <h2 className="font-display text-3xl font-semibold text-cream md:text-4xl">Start Free. Go Deeper When You&apos;re Ready.</h2>
        <p className="mt-4 leading-relaxed text-lav">Each option is designed for a different level of clarity, from a quick calculation to a personal conversation.</p>
      </div>

      <div className="mt-12 grid gap-4 lg:hidden">
        {offers.map((offer) => <article key={offer.name} className={`relative flex flex-col rounded-2xl border p-6 ${offer.featured ? "border-gold bg-gradient-to-b from-gold/15 to-cosmic2 shadow-goldglow" : "border-gold/15 bg-white/[.035]"}`}>
          {offer.featured && <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-midnight"><Sparkles className="h-3 w-3" />Most popular first step</span>}
          <p className="text-sm font-semibold text-goldlite">{offer.name}</p>
          <p className="mt-3 font-display text-4xl text-cream">{offer.price}</p>
          <p className="mt-3 min-h-12 text-sm leading-relaxed text-lav">{offer.description}</p>
          <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
            {offer.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-lav"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{feature}</li>)}
          </ul>
          <a href={offer.href} className={`mt-7 inline-flex min-h-11 items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${offer.featured ? "bg-gold text-midnight hover:bg-goldlite" : "border border-gold/30 text-goldlite hover:border-gold hover:bg-gold/10"}`}>{offer.cta}</a>
        </article>)}
      </div>
      <div className="mt-12 hidden overflow-x-auto rounded-3xl border border-gold/20 bg-[#101225] lg:block">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <caption className="sr-only">Comparison of free analysis, ₹99 report, ₹499 name balance and ₹999 live session</caption>
          <thead>
            <tr className="border-b border-gold/20">
              <th className="w-[28%] p-5 text-sm font-medium text-lav">What&apos;s included</th>
              {offers.map((offer) => <th key={offer.name} className={`p-5 text-center ${offer.featured ? "bg-gold/10" : ""}`}><span className="block text-sm text-goldlite">{offer.name}</span><span className="mt-2 block font-display text-3xl text-cream">{offer.price}</span></th>)}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(([feature, values]) => <tr key={feature} className="border-b border-white/10 last:border-0"><th className="p-4 text-sm font-normal text-cream">{feature}</th>{values.map((value, index) => <td key={`${feature}-${index}`} className={`p-4 text-center text-sm ${offers[index].featured ? "bg-gold/[.04]" : ""}`}>{typeof value === "boolean" ? value ? <Check className="mx-auto h-4 w-4 text-gold" /> : <span className="text-lav/50">—</span> : <span className="text-lav">{value}</span>}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </section>;
}
