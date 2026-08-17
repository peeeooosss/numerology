"use client";

import { Activity, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const revenue = [{ month: "Mar", value: 142 }, { month: "Apr", value: 168 }, { month: "May", value: 156 }, { month: "Jun", value: 205 }, { month: "Jul", value: 212 }, { month: "Aug", value: 249 }];
const focusAreas = [{ name: "Career", value: 42 }, { name: "Wealth", value: 28 }, { name: "Love", value: 19 }, { name: "Names", value: 11 }];
const status = [{ name: "Completed", value: 68 }, { name: "Upcoming", value: 24 }, { name: "Rescheduled", value: 8 }];
const colors = ["#d4af37", "#c97d4a", "#7e72b8"];
const tooltipStyle = { background: "#171a31", border: "1px solid rgba(212,175,55,.25)", borderRadius: 12, color: "#f6f1e7" };

export function Analytics() {
  return <section id="analytics"><div className="mb-4"><p className="text-xs uppercase tracking-[.2em] text-gold">Practice intelligence</p><h2 className="mt-2 font-display text-2xl">Analytics overview</h2></div><div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr]"><RevenueChart /><FocusChart /><HealthChart /></div></section>;
}

function RevenueChart() {
  return <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-sm text-lav">Revenue trend</p><p className="mt-1 text-xs text-emerald-300">+18.4% this month</p></div><BarChart3 className="h-5 w-5 text-gold" /></div><div className="h-56"><ResponsiveContainer width="100%" height="100%"><LineChart data={revenue}><CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#aaa6c4", fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#aaa6c4", fontSize: 11 }} tickFormatter={value => `₹${value}k`} width={45} /><Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} dot={{ fill: "#f3de8a", strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: "#f3de8a" }} /></LineChart></ResponsiveContainer></div></div>;
}

function FocusChart() {
  return <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="mb-3 flex items-center justify-between"><div><p className="text-sm text-lav">Focus areas</p><p className="mt-1 text-xs text-lav">Where clients need help</p></div><Activity className="h-5 w-5 text-copper" /></div><div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={focusAreas} layout="vertical" margin={{ left: 0, right: 15 }}><CartesianGrid stroke="rgba(255,255,255,.07)" horizontal={false} /><XAxis type="number" hide /><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#aaa6c4", fontSize: 11 }} width={52} /><Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,.04)" }} /><Bar dataKey="value" fill="#c97d4a" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div></div>;
}

function HealthChart() {
  return <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="mb-3 flex items-center justify-between"><div><p className="text-sm text-lav">Session health</p><p className="mt-1 text-xs text-lav">Booking outcomes</p></div><PieChartIcon className="h-5 w-5 text-gold" /></div><div className="relative h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={status} dataKey="value" nameKey="name" innerRadius={52} outerRadius={76} paddingAngle={4} stroke="none">{status.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="font-display text-2xl text-cream">92%</span><span className="text-[10px] text-lav">healthy</span></div></div><div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-lav">{status.map((entry, index) => <span key={entry.name} className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[index] }} />{entry.name}</span>)}</div></div>;
}
