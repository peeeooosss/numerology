import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

const siteUrl = "https://magicofnumbers.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Numerology Calculator & Online Reports | Magic of Numbers",
    template: "%s | Magic of Numbers",
  },
  description:
    "Calculate your Name Number, Driver Number, Life Path, Personal Year and Lo Shu pattern free. Explore personalized reports and online numerology guidance.",
  keywords: [
    "numerology calculator",
    "free numerology analysis",
    "name numerology calculator",
    "numerology report online",
    "Chaldean numerology",
    "Vedic numerology",
    "Life Path Number",
    "Driver Number",
    "Conductor Number",
    "Lo Shu Grid",
    "numerology consultation India",
  ],
  authors: [{ name: "Vinod", url: siteUrl }],
  creator: "Magic of Numbers",
  publisher: "Magic of Numbers",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Magic of Numbers",
    title: "Free Numerology Calculator & Online Reports | Magic of Numbers",
    description:
      "Calculate your Name Number, Driver Number, Life Path, Personal Year and Lo Shu pattern free. Explore personalized reports and online numerology guidance.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Magic of Numbers — Numerology Calculator & Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Numerology Calculator & Online Reports | Magic of Numbers",
    description:
      "Calculate your Name Number, Driver Number, Life Path, Personal Year and Lo Shu pattern free.",
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-body antialiased`}
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-midnight focus:not-sr-only">Skip to content</a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
