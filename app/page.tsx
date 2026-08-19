import { About } from "@/components/about";
import { AuraPreview } from "@/components/aura-preview";
import { AvailabilityPreview } from "@/components/availability-preview";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HomeDiscovery } from "@/components/home-discovery";
import { HomeTools } from "@/components/home-tools";
import { HomeGuides } from "@/components/home-guides";
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
      name: "Free Numerology Calculator, Tools & Guides | Magic of Numbers",
      isPartOf: { "@id": `${siteUrl}#website` },
      about: { "@id": `${siteUrl}#vinod` },
      description:
        "Free numerology calculators, 12 focused tools, 8 plain-language guides, and personalized reports. Calculate your Driver Number, Life Path, Personal Day, and Lo Shu pattern.",
    },
    {
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
    },
    {
      "@type": "ItemList",
      name: "Free Numerology Tools",
      description: "12 free calculators and reflection tools for numerology.",
      url: `${siteUrl}/tools`,
      numberOfItems: 12,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Free Analysis", url: `${siteUrl}/analyzer` },
        { "@type": "ListItem", position: 2, name: "Name Comparison Calculator", url: `${siteUrl}/name-comparison-calculator` },
        { "@type": "ListItem", position: 3, name: "Personal Day Calculator", url: `${siteUrl}/personal-day-calculator` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Numerology Guides",
      description: "Plain-language guides on Driver Numbers, Lo Shu Grid, name analysis, and timing.",
      url: `${siteUrl}/blog`,
      numberOfItems: 8,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Personal Day Number Calculator", url: `${siteUrl}/blog/personal-day-number-calculator` },
        { "@type": "ListItem", position: 2, name: "Name Correction vs Name Balance", url: `${siteUrl}/blog/name-correction-vs-name-balance` },
        { "@type": "ListItem", position: 3, name: "Pinnacle and Challenge Numbers", url: `${siteUrl}/blog/pinnacle-and-challenge-numbers` },
      ],
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
      <HomeDiscovery />
      <ReportInsights />
      <HomeTools />
      <HomeGuides />
      <Testimonials />
      <OfferReport />
      <OfferComparison />
      <Journey />
      <SessionOffer />
      <NameBalancingOffer />
      <AvailabilityPreview />
      <AuraPreview />
      <About />
      <HomeFaq />
      <Footer />
    </main>
  );
}
