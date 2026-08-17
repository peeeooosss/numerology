import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input ref={ref} className={cn("h-12 w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 text-cream outline-none placeholder:text-lav/50 focus:border-gold focus:ring-2 focus:ring-gold/20", className)} {...props} />);
Input.displayName = "Input";
