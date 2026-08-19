"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardCredentials } from "@/components/admin/dashboard-credentials";

type AdminSession = {
  id: string;
  serviceType?: string;
  scheduledAt: string;
  status: string;
  pricePaid?: number;
  duration?: number;
  client: { name: string; email?: string | null; phone?: string | null };
};

export default function VinodAdminPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/sessions?all=true", { cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401) { router.replace("/admin/login"); return null; }
        return response.json() as Promise<{ sessions?: AdminSession[] }>;
      })
      .then((data) => { if (data) { setAuthenticated(true); setSessions(data.sessions ?? []); } })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (authenticated === null) return <main className="min-h-screen-dynamic grid place-items-center bg-[#090b16] text-lav">Securing Magic of Numbers Admin…</main>;

  const upcoming = sessions.filter((session) => session.status === "booked").length;
  const completed = sessions.filter((session) => session.status === "completed").length;

  return (
    <main className="min-h-screen-dynamic bg-[#090b16] text-cream">
      <header className="border-b border-white/10 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div><p className="font-display text-xl"><span className="text-gold">Magic of Numbers</span></p><p className="text-xs text-lav">Private admin workspace</p></div>
          <button onClick={logout} className="rounded-lg px-3 py-2 text-sm text-lav hover:bg-white/5 hover:text-cream">Sign out</button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 lg:px-10">
         <div><p className="text-xs uppercase tracking-[.2em] text-gold">Magic of Numbers</p><h1 className="mt-2 font-display text-3xl">Practice overview</h1><p className="mt-2 text-sm text-lav">Manage users, sessions, reports, and dashboard credentials.</p></div>
         <div className="grid gap-4 sm:grid-cols-3">
          {[["Total sessions", sessions.length], ["Upcoming", upcoming], ["Completed", completed]].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><p className="text-sm text-lav">{label}</p><p className="mt-2 font-display text-3xl text-gold">{value}</p></div>)}
         </div>
         <DashboardCredentials />
         <section className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-white/10 text-lav"><tr><th className="px-5 py-4">Client</th><th className="px-5 py-4">Service</th><th className="px-5 py-4">Scheduled</th><th className="px-5 py-4">Status</th></tr></thead><tbody>{sessions.map((session) => <tr key={session.id} className="border-b border-white/5"><td className="px-5 py-4"><p>{session.client.name}</p><p className="text-xs text-lav">{session.client.email ?? "No email"}</p></td><td className="px-5 py-4 capitalize">{session.serviceType ?? "numerology"}</td><td className="px-5 py-4">{session.scheduledAt}</td><td className="px-5 py-4">{session.status}</td></tr>)}</tbody></table></div>{!sessions.length && <p className="p-6 text-lav">No sessions yet.</p>}</section>
      </div>
    </main>
  );
}
