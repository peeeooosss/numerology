import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowRight, BookOpen, Shield } from "lucide-react";
import type { ToolDefinition, ToolSlug } from "@/lib/tools/tool-types";

const siteUrl = "https://magicofnumbers.in";

type Props = {
  tool: ToolDefinition;
  children: React.ReactNode;
};

export function ToolShell({ tool, children }: Props) {
  const { meta } = tool;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: meta.title,
        description: meta.description,
        url: `${siteUrl}/${meta.slug}`,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: meta.title, item: `${siteUrl}/${meta.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="pb-20 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <section className="bg-cosmic-field px-5 pb-20 pt-36 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-gold">
                {meta.category} · {meta.readingTime}
              </p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl">
                {meta.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-lav">
                {meta.description}
              </p>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-lav">
                <p>
                  Enter your details below. The tool calculates your numbers and
                  shows a transparent formula, a short interpretation, and a
                  practical reflection prompt.
                </p>
                <p>
                  This tool shows a free result without creating an account. For
                  your complete profile, use the full free analysis. The ₹99 report
                  adds detailed interpretation, synthesis, and a 12-month forecast.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/analyzer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm text-cream hover:bg-white/5"
                >
                  Full free analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/methodology"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm text-cream hover:bg-white/5"
                >
                  <BookOpen className="h-4 w-4" />
                  How the method works
                </Link>
              </div>
              {tool.disclaimer && (
                <div className="mt-8 rounded-2xl border border-gold/15 bg-[#101225]/60 p-5">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="text-sm font-medium text-cream">Disclaimer</p>
                      <p className="mt-1 text-sm leading-relaxed text-lav">
                        {tool.disclaimer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
