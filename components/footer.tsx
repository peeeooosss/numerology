export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-midnight px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-display text-sm text-cream">
              <span className="text-gold">Magic</span> of Numbers
            </p>
            <p className="mt-1 text-xs text-lav">
              Numerology guidance for self-understanding and reflection.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-lav">
            <a href="/tools" className="transition hover:text-gold">
              Free Tools
            </a>
            <a href="/report" className="transition hover:text-gold">
              Reports
            </a>
            <a href="/name-balance" className="transition hover:text-gold">
              Name Balance
            </a>
            <a href="/consultation" className="transition hover:text-gold">
              Consultation
            </a>
            <a href="/blog" className="transition hover:text-gold">
              Guides
            </a>
            <a href="/methodology" className="transition hover:text-gold">
              Methodology
            </a>
            <a href="/about" className="transition hover:text-gold">
              About
            </a>
            <a href="/privacy" className="transition hover:text-gold">
              Privacy
            </a>
            <a href="/terms" className="transition hover:text-gold">
              Terms
            </a>
            <a href="/refund" className="transition hover:text-gold">
              Refunds
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-[11px] text-lav/50">
          &copy; {new Date().getFullYear()} Magic of Numbers. All rights
          reserved. Numerology is a reflective practice and not a guarantee of
          outcomes.
        </p>
      </div>
    </footer>
  );
}
