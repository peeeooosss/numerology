import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/blog/article-card";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Numerology Guides, Calculators and Explanations",
  description: "Clear numerology guides covering Driver Number, Conductor Number, Life Path, Lo Shu Grid, Chaldean numerology, and Personal Year calculations.",
  alternates: { canonical: "https://magicofnumbers.in/blog" },
};

export default function BlogPage() {
  return <main className="pb-20 sm:pb-0"><Header /><section className="bg-cosmic-field px-5 pb-20 pt-36 sm:px-8 md:pt-44"><div className="mx-auto max-w-5xl"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.2em] text-gold">The Magic of Numbers guide</p><h1 className="mt-4 font-display text-4xl text-cream sm:text-5xl">Understand the calculation before you interpret the number.</h1><p className="mt-5 text-base leading-relaxed text-lav">Learn how common numerology numbers are calculated, how different traditions compare, and where a free calculation ends and a detailed report begins.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/analyzer" className="inline-flex min-h-11 items-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-midnight hover:bg-goldlite">Try free analysis</Link><Link href="/methodology" className="inline-flex min-h-11 items-center rounded-full border border-gold/30 px-5 py-3 text-sm text-cream hover:bg-white/5">Read methodology</Link></div></div><div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{BLOG_POSTS.map((post) => <ArticleCard key={post.slug} post={post} />)}</div></div></section><Footer /></main>;
}
