import { About } from "@/components/about";
import { AuraPreview } from "@/components/aura-preview";
import { AvailabilityPreview } from "@/components/availability-preview";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { OfferReport } from "@/components/offer-report";
import { SessionOffer } from "@/components/session-offer";
import { NameBalancingOffer } from "@/components/name-balancing-offer";
import { Testimonials } from "@/components/testimonials";

export default function HomePage() { return <main><Header /><Hero /><Testimonials /><OfferReport /><SessionOffer /><NameBalancingOffer /><AvailabilityPreview /><AuraPreview /><About /><Footer /></main>; }
