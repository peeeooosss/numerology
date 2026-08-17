export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type AvailabilitySlot = {
  id: string;
  day: Weekday;
  start: string;
  end: string;
};

export type PortalSession = {
  id: string;
  name: string;
  dob: string;
  focus: string;
  date: string;
  question: string;
  goal: string;
  notes: string;
  status?: string;
  subFocusArea?: string;
  clientEmail?: string;
};

export const weekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const defaultAvailability: AvailabilitySlot[] = [
  { id: "mon-1100", day: "Monday", start: "11:00", end: "11:15" },
  { id: "mon-1300", day: "Monday", start: "13:00", end: "13:15" },
  { id: "tue-1030", day: "Tuesday", start: "10:30", end: "10:45" },
  { id: "tue-1400", day: "Tuesday", start: "14:00", end: "14:15" },
  { id: "wed-1100", day: "Wednesday", start: "11:00", end: "11:15" },
  { id: "thu-1600", day: "Thursday", start: "16:00", end: "16:15" },
  { id: "fri-1200", day: "Friday", start: "12:00", end: "12:15" },
];

export const defaultSessions: PortalSession[] = [
  { id: "session-aarav", name: "Aarav Mehta", dob: "14 May 1992", focus: "Career direction", date: "Aug 12 · 11:00 AM", question: "I have been offered a leadership role at a fast-growing company, but it means leaving a stable team I have built over five years. What does my current cycle suggest about making this transition?", goal: "Choose the career path that supports long-term growth without sacrificing financial stability.", notes: "Review personal year 8 transition. Ask about the role's start date and relocation pressure." },
  { id: "session-mira", name: "Mira Shah", dob: "22 Nov 1987", focus: "Relationship", date: "Aug 12 · 2:30 PM", question: "My partner and I are considering moving cities together. I want to understand what our combined numbers say about the timing and whether this change will strengthen our connection.", goal: "Find an aligned timeline for a shared home and a more harmonious partnership.", notes: "Compare both name numbers before discussing the move." },
  { id: "session-karan", name: "Karan Malhotra", dob: "03 Feb 1995", focus: "Wealth timing", date: "Aug 13 · 10:00 AM", question: "I am launching a second business while my first is still growing. Which months are most supportive for investment and where should I be cautious with expansion?", goal: "Build a practical 12-month wealth plan with a clear risk threshold.", notes: "Prepare the 12-month cycle overview and investment caution months." },
];

const availabilityKey = "aura_availability";
const sessionsKey = "aura_sessions";

export function loadAvailability(): AvailabilitySlot[] {
  if (typeof window === "undefined") return defaultAvailability;
  const saved = window.localStorage.getItem(availabilityKey);
  if (!saved) return defaultAvailability;
  try { return JSON.parse(saved) as AvailabilitySlot[]; } catch { return defaultAvailability; }
}

export function saveAvailability(slots: AvailabilitySlot[]) {
  window.localStorage.setItem(availabilityKey, JSON.stringify(slots));
  window.dispatchEvent(new Event("aura-availability-updated"));
}

export function loadSessions(): PortalSession[] {
  if (typeof window === "undefined") return defaultSessions;
  const saved = window.localStorage.getItem(sessionsKey);
  if (!saved) return defaultSessions;
  try { return JSON.parse(saved) as PortalSession[]; } catch { return defaultSessions; }
}

export function saveSessions(sessions: PortalSession[]) {
  window.localStorage.setItem(sessionsKey, JSON.stringify(sessions));
  window.dispatchEvent(new Event("aura-sessions-updated"));
}

export function nextSlots(slots: AvailabilitySlot[], limit = 3) {
  const dayIndex = new Date().getDay();
  const mondayFirst = dayIndex === 0 ? 6 : dayIndex - 1;
  return [...slots].sort((a, b) => (weekdays.indexOf(a.day) - mondayFirst + 7) % 7 - ((weekdays.indexOf(b.day) - mondayFirst + 7) % 7) || a.start.localeCompare(b.start)).slice(0, limit);
}
