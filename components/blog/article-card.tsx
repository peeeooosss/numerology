import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";

export function ArticleCard({ post }: { post: BlogPost }) {
  return <article className="flex h-full flex-col rounded-2xl border border-gold/15 bg-[#101225]/60 p-6 transition hover:-translate-y-1 hover:border-gold/40"><p className="text-xs uppercase tracking-[.18em] text-gold">{post.category}</p><h2 className="mt-3 font-display text-xl text-cream"><Link href={`/blog/${post.slug}`} className="hover:text-gold">{post.title}</Link></h2><p className="mt-3 flex-1 text-sm leading-relaxed text-lav">{post.description}</p><div className="mt-5 flex items-center justify-between text-xs text-lav/70"><span>{post.readingTime}</span><Link href={`/blog/${post.slug}`} className="text-gold hover:text-goldlite">Read guide</Link></div></article>;
}
