import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ArticleCard } from "@/components/blog/article-card";

const FEATURED_SLUGS = [
  "personal-day-number-calculator",
  "name-correction-vs-name-balance",
  "pinnacle-and-challenge-numbers",
];

const featured = FEATURED_SLUGS.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(Boolean);

export function HomeGuides() {
  return (
    <section id="guides" className="bg-cosmic px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="mb-3 text-xs uppercase tracking-[.2em] text-gold">
            Learn numerology
          </p>
          <h2 className="font-display text-2xl font-semibold text-cream md:text-3xl">
            Latest guides
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-lav md:text-base">
            Plain-language articles on Driver Numbers, Lo Shu Grid, name
            analysis, timing, and more. No jargon, no guesswork.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((post) => (
            <ArticleCard key={post!.slug} post={post!} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-goldlite transition"
          >
            Read all 8 guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
