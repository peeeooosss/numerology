import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <main className="min-h-screen-dynamic bg-cosmic-field pb-20 sm:pb-0">
      <Header />
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 pt-36 text-center">
        <p className="text-7xl font-display text-gold">404</p>
        <h1 className="mt-4 text-2xl font-display text-cream">Page not found</h1>
        <p className="mt-2 max-w-md text-sm text-lav">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-gold to-copper px-6 text-sm font-semibold text-midnight transition hover:brightness-110"
          >
            Go home
          </Link>
          <Link
            href="/analyzer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold/30 px-6 text-sm text-cream transition hover:bg-white/5"
          >
            Try free analysis
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
