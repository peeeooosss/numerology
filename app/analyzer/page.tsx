import type { Metadata } from "next";
import { Header } from "@/components/header";
import { FreeAnalysis } from "@/components/free-analysis";

export const metadata: Metadata = {
  title: "Free Numerology Analysis | ProsperPath Numerology",
  description: "Calculate your Chaldean Name Number, Driver Number, Life Path, lucky numbers, Personal Year and Lo Shu pattern free.",
};

export default function AnalyzerPage() {
  return <><Header /><FreeAnalysis /></>;
}
