"use client";

import { FormEvent, useState } from "react";
import { KeyRound, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Sign in failed.");
      router.replace("/dashboard");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="relative flex min-h-screen-dynamic items-center justify-center overflow-hidden bg-cosmic-field px-5 py-10 text-cream"><div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" /><div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-copper/10 blur-3xl" /><Card className="relative w-full max-w-md border-gold/25 bg-[#101225]/90 p-2"><CardHeader className="px-6 pt-8 text-center"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-gold shadow-goldglow"><Sparkles className="h-7 w-7" /></div><p className="text-xs uppercase tracking-[.24em] text-gold">Magic of Numbers dashboard</p><CardTitle className="mt-3 text-3xl">Sign in to your dashboard</CardTitle><CardDescription className="mx-auto mt-2 max-w-xs">Use the username and temporary password shared by the admin.</CardDescription></CardHeader><CardContent className="px-6 pb-8 pt-5"><form onSubmit={handleSubmit} className="space-y-5"><div><Label htmlFor="username">Username or email</Label><div className="relative"><Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" /><Input id="username" required autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="you@example.com" className="pl-11" /></div></div><div><Label htmlFor="password">Password</Label><div className="relative"><KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" /><Input id="password" required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your temporary password" className="pl-11" /></div></div>{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}<Button type="submit" disabled={loading} className="w-full">{loading ? "Signing in…" : "Open my dashboard"} <ShieldCheck className="h-4 w-4" /></Button></form><div className="mt-7 rounded-xl border border-white/10 bg-white/[.03] p-4 text-center"><div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gold"><LockKeyhole className="h-3.5 w-3.5" />Private access</div><p className="mt-3 text-sm leading-relaxed text-lav">Your dashboard credentials are created by the Magic of Numbers admin after your session booking.</p></div></CardContent></Card></main>;
}
