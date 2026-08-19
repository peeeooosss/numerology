import { About } from "@/components/about";
import { AuraPreview } from "@/components/aura-preview";
import { AvailabilityPreview } from "@/components/availability-preview";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { OfferReport } from "@/components/offer-report";
import { SessionOffer } from "@/components/session-offer";
import { NameBalancingOffer } from "@/components/name-balancing-offer";
import { Journey } from "@/components/journey";
import { MobileFreeAnalysisBar } from "@/components/mobile-free-analysis-bar";
import { OfferComparison } from "@/components/offer-comparison";
import { ReportInsights } from "@/components/report-insights";
import { Testimonials } from "@/components/testimonials";

export default function HomePage() { return <main className="pb-20 sm:pb-0"><Header /><MobileFreeAnalysisBar /><Hero /><ReportInsights /><Testimonials /><OfferReport /><OfferComparison /><Journey /><SessionOffer /><NameBalancingOffer /><AvailabilityPreview /><AuraPreview /><About /><Footer /></main>; }
