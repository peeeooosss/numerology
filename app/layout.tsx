import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "ProsperPath Numerology | Discover the Power of Your Numbers",
  description: "Discover your unique numerological patterns with a personalized numerology report from ProsperPath Numerology.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${playfair.variable} font-body antialiased`}>{children}</body></html>;
}
