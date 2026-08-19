import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleBody } from "@/components/blog/article-body";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";

const siteUrl = "https://magicofnumbers.in";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.description, alternates: { canonical: `${siteUrl}/blog/${post.slug}` }, openGraph: { type: "article", title: post.title, description: post.description, url: `${siteUrl}/blog/${post.slug}`, publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: ["Vinod"] } };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  const relatedPosts = post.relatedSlugs.map(getBlogPost).filter((related): related is NonNullable<typeof related> => Boolean(related));
  const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "Article", "@id": `${siteUrl}/blog/${post.slug}#article`, headline: post.title, description: post.description, datePublished: post.publishedAt, dateModified: post.updatedAt, mainEntityOfPage: `${siteUrl}/blog/${post.slug}`, author: { "@type": "Person", name: "Vinod", url: `${siteUrl}/about` }, publisher: { "@type": "Organization", name: "Magic of Numbers", url: siteUrl } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` }] }, { "@type": "FAQPage", mainEntity: post.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] };
  return <main className="pb-20 sm:pb-0"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><Header /><article className="bg-cosmic-field px-5 pb-20 pt-36 sm:px-8 md:pt-44"><div className="mx-auto max-w-3xl"><nav aria-label="Breadcrumb" className="text-xs text-lav"><Link href="/" className="hover:text-gold">Home</Link><span className="px-2">/</span><Link href="/blog" className="hover:text-gold">Guides</Link><span className="px-2">/</span><span>{post.title}</span></nav><p className="mt-8 text-xs uppercase tracking-[.2em] text-gold">{post.category} · {post.readingTime}</p><h1 className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl">{post.title}</h1><p className="mt-5 text-lg leading-relaxed text-lav">{post.description}</p><div className="mt-5 flex flex-wrap gap-4 text-xs text-lav/70"><span>Written by Vinod</span><span>Updated {post.updatedAt}</span><span>Primary topic: {post.primaryKeyword}</span></div><ArticleBody post={post} relatedPosts={relatedPosts} /></div></article><Footer /></main>;
}
