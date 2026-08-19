"use client";

import { FormEvent, useState } from "react";
import { KeyRound, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Admin sign in failed.");
      router.replace("/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Admin sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="relative flex min-h-screen-dynamic items-center justify-center overflow-hidden bg-cosmic-field px-5 py-10 text-cream"><div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" /><div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-copper/10 blur-3xl" /><Card className="relative w-full max-w-md border-gold/25 bg-[#101225]/95 p-2"><CardHeader className="px-6 pt-8 text-center"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-gold shadow-goldglow"><Sparkles className="h-7 w-7" /></div><p className="text-xs uppercase tracking-[.24em] text-gold">Magic of Numbers administration</p><CardTitle className="mt-3 text-3xl">Admin sign in</CardTitle><CardDescription className="mx-auto mt-2 max-w-xs">Private access for managing users, sessions, credentials, and reports.</CardDescription></CardHeader><CardContent className="px-6 pb-8 pt-5"><form onSubmit={handleSubmit} className="space-y-5"><div><Label htmlFor="admin-email">Admin email</Label><div className="relative"><Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" /><Input id="admin-email" required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@magicofnumbers.in" className="pl-11" /></div></div><div><Label htmlFor="admin-password">Admin password</Label><div className="relative"><KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" /><Input id="admin-password" required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" className="pl-11" /></div></div>{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}<Button type="submit" disabled={loading} className="w-full">{loading ? "Signing in…" : "Enter admin dashboard"} <ShieldCheck className="h-4 w-4" /></Button></form><div className="mt-8 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-xs text-lav"><LockKeyhole className="h-3.5 w-3.5 text-gold" />Admin credentials are configured server-side.</div></CardContent></Card></main>;
}
