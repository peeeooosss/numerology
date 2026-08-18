import { ArrowRight, ClipboardList, CreditCard, FileText, Sparkles } from "lucide-react";

const steps = [
  { icon: ClipboardList, number: "01", title: "Enter Your Details", description: "Provide your name and date of birth through our secure form." },
  { icon: CreditCard, number: "02", title: "Make Your Payment", description: "Complete your purchase securely online for just ₹99." },
  { icon: FileText, number: "03", title: "Receive Your Personalized Report", description: "Your numerology report is prepared based on the information you provide." },
  { icon: Sparkles, number: "04", title: "Go Deeper If You Choose", description: "Explore our ₹499 Name Balance Analysis or book a 1-to-1 consultation for more personalized guidance." },
];

export function Journey() {
  return (
    <section id="journey" className="bg-cosmic-field px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">Simple, clear, personal</p>
          <h2 className="font-display text-3xl font-semibold text-cream md:text-4xl">Your Journey Starts With Just ₹99</h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map(({ icon: Icon, number, title, description }, index) => (
            <article key={number} className="relative rounded-2xl border border-gold/15 bg-midnight/40 p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-gold/50">{number}</span>
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-6 font-display text-xl leading-tight text-cream">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-lav">{description}</p>
              {index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-gold md:block" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
