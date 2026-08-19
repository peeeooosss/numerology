"use client";

import { FormEvent, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordForm({ onChanged }: { onChanged: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (newPassword !== confirmation) { setError("The new passwords do not match."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Password could not be changed.");
      onChanged();
    } catch (passwordError) {
      setError(passwordError instanceof Error ? passwordError.message : "Password could not be changed.");
    } finally {
      setLoading(false);
    }
  }

  return <section className="rounded-2xl border border-gold/30 bg-gold/10 p-5 sm:p-6"><div className="flex items-start gap-3"><KeyRound className="mt-1 h-5 w-5 shrink-0 text-gold" /><div><h2 className="font-display text-2xl text-cream">Create your private password</h2><p className="mt-2 text-sm leading-relaxed text-lav">The admin gave you a temporary password. Set a new password before using your dashboard.</p></div></div><form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-3"><div><Label htmlFor="current-password">Temporary password</Label><Input id="current-password" required type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} /></div><div><Label htmlFor="new-password">New password</Label><Input id="new-password" required minLength={8} type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /></div><div><Label htmlFor="confirm-password">Confirm password</Label><Input id="confirm-password" required minLength={8} type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></div><div className="sm:col-span-3">{error && <p role="alert" className="mb-3 text-sm text-rose-200">{error}</p>}<Button type="submit" disabled={loading}><ShieldCheck className="h-4 w-4" />{loading ? "Saving…" : "Save private password"}</Button></div></form></section>;
}
