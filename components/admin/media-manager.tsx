"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type MediaKind = "hero" | "profile" | "testimonial";
const mediaLabels: Record<MediaKind, string> = { hero: "Hero image", profile: "Master profile photo", testimonial: "Testimonial thumbnail" };

export function MediaManager() {
  const [media, setMedia] = useState<Partial<Record<MediaKind, string>>>({});
  const [saved, setSaved] = useState(false);
  useEffect(() => { const savedMedia = window.localStorage.getItem("aura_landing_media"); if (savedMedia) { try { setMedia(JSON.parse(savedMedia) as Partial<Record<MediaKind, string>>); } catch { setMedia({}); } } }, []);
  function choose(kind: MediaKind, file?: File) { if (!file) return; const reader = new FileReader(); reader.onload = () => { setMedia(current => ({ ...current, [kind]: String(reader.result) })); setSaved(false); }; reader.readAsDataURL(file); }
  function save() { window.localStorage.setItem("aura_landing_media", JSON.stringify(media)); window.dispatchEvent(new Event("aura-media-updated")); setSaved(true); }
  return <section id="media"><div className="mb-4"><p className="text-xs uppercase tracking-[.2em] text-gold">Brand assets</p><h2 className="mt-2 font-display text-2xl">Landing page media</h2><p className="mt-2 text-sm text-lav">Swap the public-facing imagery without touching code. Images are stored locally for this prototype.</p></div><div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="grid gap-4 md:grid-cols-3">{(Object.keys(mediaLabels) as MediaKind[]).map(kind => <label key={kind} className="group relative cursor-pointer overflow-hidden rounded-xl border border-gold/15 bg-midnight/40"><div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-cosmic2 to-midnight">{media[kind] ? <Image src={media[kind]} alt="" fill unoptimized className="object-cover" /> : <ImagePlus className="h-8 w-8 text-gold/60" />}</div><div className="p-3"><p className="text-sm font-medium text-cream">{mediaLabels[kind]}</p><p className="mt-1 flex items-center gap-1 text-xs text-lav"><Upload className="h-3 w-3" />Choose image</p></div><input type="file" accept="image/*" className="sr-only" onChange={event => choose(kind, event.target.files?.[0])} /></label>)}</div><Button className="mt-5" onClick={save}><Upload className="h-4 w-4" />{saved ? "Media saved" : "Save landing media"}</Button></div></section>;
}
