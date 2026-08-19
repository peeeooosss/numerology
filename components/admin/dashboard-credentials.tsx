"use client";

import { useEffect, useState } from "react";
import { Check, Copy, KeyRound, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Account = { id: string; username: string; status: string; mustChangePassword: boolean; lastLoginAt: string | null; createdAt: string } | null;
type CredentialSession = { id: string; status: string; serviceType: string; scheduledAt: string; pricePaid: number; client: { id: string; name: string; email: string | null; userAccount: Account } };
type Credentials = { username: string; temporaryPassword: string; loginUrl: string; clientName?: string };

export function DashboardCredentials() {
  const [sessions, setSessions] = useState<CredentialSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState("");
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/dashboard-credentials", { cache: "no-store" });
    const data = await response.json();
    if (response.ok && data.success) setSessions(data.sessions as CredentialSession[]);
    else setError(data.error || "Credentials could not be loaded.");
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function create(sessionId: string) {
    setWorking(sessionId);
    setError("");
    const response = await fetch("/api/admin/dashboard-credentials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId }) });
    const data = await response.json();
    if (response.ok && data.success) { setCredentials(data.credentials); await load(); } else setError(data.error || "Credentials could not be created.");
    setWorking("");
  }

  async function update(accountId: string, action: "reset" | "disable" | "enable") {
    setWorking(accountId);
    setError("");
    const response = await fetch(`/api/admin/dashboard-credentials/${accountId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
    const data = await response.json();
    if (response.ok && data.success) { if (data.credentials) setCredentials(data.credentials); await load(); } else setError(data.error || "Account update failed.");
    setWorking("");
  }

  async function copyCredentials() {
    if (!credentials) return;
    await navigator.clipboard.writeText(`Magic of Numbers dashboard\nLogin: ${credentials.loginUrl}\nUsername: ${credentials.username}\nTemporary password: ${credentials.temporaryPassword}`);
  }

  return <section className="rounded-2xl border border-gold/20 bg-white/[.03] p-5 sm:p-6">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="flex items-center gap-2 text-xs uppercase tracking-[.2em] text-gold"><ShieldCheck className="h-4 w-4" />User dashboard credentials</p><h2 className="mt-2 font-display text-2xl text-cream">Create access after a session is booked</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-lav">Credentials are generated server-side and the temporary password is shown only once. The user must change it after signing in.</p></div><Button variant="outline" size="sm" onClick={() => void load()}><RefreshCw className="h-4 w-4" />Refresh</Button></div>
    {error && <p role="alert" className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
    {credentials && <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-emerald-200">Credentials ready for {credentials.clientName || "this user"}</p><button type="button" onClick={() => setCredentials(null)} className="text-sm text-lav hover:text-cream">Hide</button></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div><p className="text-xs text-lav">Login URL</p><p className="mt-1 break-all text-sm text-cream">{credentials.loginUrl}</p></div><div><p className="text-xs text-lav">Username</p><p className="mt-1 break-all font-mono text-sm text-cream">{credentials.username}</p></div><div><p className="text-xs text-lav">Temporary password</p><p className="mt-1 break-all font-mono text-sm text-gold">{credentials.temporaryPassword}</p></div></div><Button className="mt-4" onClick={() => void copyCredentials()}><Copy className="h-4 w-4" />Copy credentials</Button></div>}
    {loading ? <div className="flex items-center gap-2 py-8 text-sm text-lav"><Loader2 className="h-4 w-4 animate-spin text-gold" />Loading sessions…</div> : <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-white/10 text-lav"><tr><th className="px-3 py-3">Client</th><th className="px-3 py-3">Session</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Credentials</th><th className="px-3 py-3 text-right">Action</th></tr></thead><tbody>{sessions.map((session) => { const account = session.client.userAccount; return <tr key={session.id} className="border-b border-white/5"><td className="px-3 py-4"><p className="font-medium text-cream">{session.client.name}</p><p className="mt-1 text-xs text-lav">{session.client.email || "Email required"}</p></td><td className="px-3 py-4"><p className="capitalize text-gold">{session.serviceType.replace("-", " ")}</p><p className="mt-1 text-xs text-lav">{session.scheduledAt}</p></td><td className="px-3 py-4 text-xs text-lav">{session.status}</td><td className="px-3 py-4">{account ? <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${account.status === "active" ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`}><KeyRound className="h-3 w-3" />{account.status === "active" ? account.mustChangePassword ? "Password change pending" : "Active" : "Disabled"}</span> : <span className="text-xs text-lav">Not created</span>}</td><td className="px-3 py-4 text-right">{working === session.id || working === account?.id ? <Loader2 className="ml-auto h-4 w-4 animate-spin text-gold" /> : account ? <div className="flex justify-end gap-2"><Button size="sm" variant="outline" onClick={() => void update(account.id, "reset")}>Reset</Button>{account.status === "active" ? <Button size="sm" variant="ghost" onClick={() => void update(account.id, "disable")}>Disable</Button> : <Button size="sm" variant="ghost" onClick={() => void update(account.id, "enable")}>Enable</Button>}</div> : <Button size="sm" onClick={() => void create(session.id)} disabled={!session.client.email}>Create</Button>}</td></tr>; })}</tbody></table>{!sessions.length && <p className="py-8 text-center text-sm text-lav">No sessions are available yet.</p>}</div>}
  </section>;
}
