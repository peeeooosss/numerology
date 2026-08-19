import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "default", size = "default", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost"; size?: "default" | "sm" | "icon" }) {
  return <button className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50", variant === "default" && "bg-gradient-to-r from-gold via-goldlite to-copper text-midnight shadow-goldglow hover:brightness-110", variant === "outline" && "border border-gold/30 bg-white/[.03] text-cream hover:border-gold/70 hover:bg-gold/10", variant === "ghost" && "text-lav hover:bg-white/5 hover:text-cream", size === "default" && "px-5 py-3", size === "sm" && "px-3 py-2 text-sm", size === "icon" && "h-11 w-11", className)} {...props} />;
}
