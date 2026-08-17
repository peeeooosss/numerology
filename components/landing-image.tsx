"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type MediaKind = "hero" | "profile" | "testimonial";

export function LandingImage({ kind, className }: { kind: MediaKind; className?: string }) {
  const [source, setSource] = useState("");
  useEffect(() => {
    const refresh = () => {
      const saved = window.localStorage.getItem("aura_landing_media");
      if (!saved) return;
      try { setSource((JSON.parse(saved) as Partial<Record<MediaKind, string>>)[kind] || ""); } catch { setSource(""); }
    };
    refresh();
    window.addEventListener("aura-media-updated", refresh);
    return () => window.removeEventListener("aura-media-updated", refresh);
  }, [kind]);
  return source ? <Image src={source} alt="" fill unoptimized className={className} /> : null;
}
