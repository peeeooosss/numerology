import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";

export const PRACTICE_TIMEZONE = "Asia/Kolkata";
const IST_OFFSET_MINUTES = 330;
const weeklyDefaults = [
  [1, "11:00"], [1, "13:00"], [2, "10:30"], [2, "14:00"], [3, "11:00"], [4, "16:00"], [5, "12:00"],
] as const;

function istDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: PRACTICE_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  return { year: Number(parts.find((part) => part.type === "year")?.value), month: Number(parts.find((part) => part.type === "month")?.value), day: Number(parts.find((part) => part.type === "day")?.value) };
}

function makeUtcDate(year: number, month: number, day: number, time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - IST_OFFSET_MINUTES * 60_000);
}

export async function ensureDefaultAvailability() {
  const coachId = await getNumerologyCoachId();
  if (await db.availabilitySlot.count({ where: { coachId } }) > 0) return;
  const now = new Date();
  const base = istDateParts(now);
  const slots: { startsAt: Date; endsAt: Date; timezone: string }[] = [];
  for (let offset = 0; offset < 21; offset += 1) {
    const date = new Date(Date.UTC(base.year, base.month - 1, base.day + offset));
    const weekday = date.getUTCDay() === 0 ? 7 : date.getUTCDay();
    for (const [day, start] of weeklyDefaults) {
      if (day !== weekday) continue;
      const startsAt = makeUtcDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), start);
      if (startsAt <= now) continue;
      slots.push({ startsAt, endsAt: new Date(startsAt.getTime() + 15 * 60_000), timezone: PRACTICE_TIMEZONE });
    }
  }
  if (slots.length) await db.availabilitySlot.createMany({ data: slots.map((slot) => ({ ...slot, coachId })) });
}

export function formatIstDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: PRACTICE_TIMEZONE, dateStyle: "medium", timeStyle: "short" }).format(date) + " IST";
}

export function formatIstTimeRange(startsAt: Date, endsAt: Date) {
  const formatter = new Intl.DateTimeFormat("en-IN", { timeZone: PRACTICE_TIMEZONE, hour: "numeric", minute: "2-digit" });
  return `${formatter.format(startsAt)}–${formatter.format(endsAt)} IST`;
}
