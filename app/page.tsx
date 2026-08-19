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
import { HomeFaq } from "@/components/home-faq";
import { HOME_FAQS } from "@/components/home-faq";

const siteUrl = "https://magicofnumbers.in";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "Magic of Numbers",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: "Magic of Numbers",
      publisher: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}#vinod`,
      name: "Vinod",
      jobTitle: "Numerologist",
      worksFor: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}#webpage`,
      url: siteUrl,
      name: "Free Numerology Calculator & Online Reports | Magic of Numbers",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#vinod` },
      description:
        "Calculate your Name Number, Driver Number, Life Path, Personal Year and Lo Shu pattern free. Explore personalized reports and online numerology guidance.",
    },
    {
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
    },
  ],
};

export default function HomePage() {
  return (
    <main className="pb-20 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <MobileFreeAnalysisBar />
      <Hero />
      <ReportInsights />
      <Testimonials />
      <HomeFaq />
      <OfferReport />
      <OfferComparison />
      <Journey />
      <SessionOffer />
      <NameBalancingOffer />
      <AvailabilityPreview />
      <AuraPreview />
      <About />
      <Footer />
    </main>
  );
}
