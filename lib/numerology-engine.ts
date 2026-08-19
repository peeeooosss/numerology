/**
 * NUMEROLOGY CALCULATION ENGINE
 * Separate Western Pythagorean and Vedic/Chaldean systems.
 * Supports: Life Path, Expression, Soul Urge, Personality,
 *           Personal Year, Personal Month, Personal Day
 */

export type NumerologySystem = "western" | "vedic" | "blended";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface CoreNumbers {
  lifePath: number;
  lifePathIsMaster: boolean;
  expression: number;
  expressionIsMaster: boolean;
  soulUrge: number;
  personality: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  luckyNumbers: number[];
  birthDay: number;         // Vedic: the raw birth day digit
  challengeNumbers: number[];
  pinnacleNumbers: number[];
  western: WesternNumbers;
  vedic: VedicNumbers;
}

export interface WesternNumbers {
  lifePath: number;
  expression: number;
  expressionIsMaster: boolean;
  soulUrge: number;
  personality: number;
}

export interface VedicNumbers {
  driver: number;
  conductor: number;
  nameNumber: number;
  birthDayCompound: number;
  currentNameNumber?: number;
}

export interface MonthlyForecast {
  month: string;
  monthNumber: number;
  personalMonth: number;
  theme: string;
  focus: string;
  energy: "high" | "medium" | "low";
  bestDates: number[];
  cautionDates: number[];
}

export interface NumerologyProfile {
  core: CoreNumbers;
  monthlyForecast: MonthlyForecast[];
  lifePathTitle: string;
  currentYearTheme: string;
  system: NumerologySystem;
}

// ─── LETTER-NUMBER MAPS ───────────────────────────────────────────────────────

/**
 * Pythagorean (Western) chart – standard A=1 … Z=26 then reduced
 */
const PYTHAGOREAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

/**
 * Chaldean (Vedic) chart – letters valued 1–8 only (9 is sacred/divine)
 * Used in Vedic/Indian numerology traditions
 */
const CHALDEAN: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

// ─── CORE REDUCER ─────────────────────────────────────────────────────────────

/** Reduce to 1-9 but keep Master Numbers 11, 22, 33 intact */
export function reduce(n: number): number {
  if (n <= 9) return n;
  if (n === 11 || n === 22 || n === 33) return n;
  const digits = String(n).split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
  return reduce(digits);
}

/** Reduce strictly to 1-9 (used for Personal Day/Month) */
export function reduceStrict(n: number): number {
  while (n > 9) {
    n = String(n).split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return n === 0 ? 9 : n;
}

export function isMasterNumber(n: number): boolean {
  return n === 11 || n === 22 || n === 33;
}

// ─── LIFE PATH ────────────────────────────────────────────────────────────────

/**
 * Calculate Life Path from Date of Birth.
 * Accepts: "14 May 1992" | "1992-05-14" | "05/14/1992"
 *
 * Method: Each component (day, month, year) is reduced independently
 * before summing — preserves master numbers within components.
 */
export function calculateLifePath(dob: string): { number: number; isMaster: boolean } {
  const date = parseDOB(dob);
  if (!date) throw new Error(`Cannot parse date: ${dob}`);

  const d = reduce(date.day);
  const m = reduce(date.month);
  const y = reduce(date.year);

  const sum = d + m + y;
  const lp = reduce(sum);

  return { number: lp, isMaster: isMasterNumber(lp) };
}

// ─── EXPRESSION (DESTINY) ─────────────────────────────────────────────────────

/**
 * Expression Number from full birth name.
 * The public profile keeps Western/Pythagorean expression and Chaldean name
 * calculations separate. The legacy "blended" option intentionally returns
 * the Western expression number while exposing the Chaldean name number as a
 * separate Vedic/Chaldean fact.
 */
export function calculateExpression(
  fullName: string,
  system: NumerologySystem = "blended"
): { number: number; isMaster: boolean } {
  const chars = fullName.toUpperCase().replace(/[^A-Z]/g, "").split("");

  let sumP = 0;
  let sumC = 0;
  chars.forEach((c) => {
    sumP += PYTHAGOREAN[c] ?? 0;
    sumC += CHALDEAN[c] ?? 0;
  });

  if (system === "western") {
    const n = reduce(sumP);
    return { number: n, isMaster: isMasterNumber(n) };
  }
  if (system === "vedic") {
    const n = reduce(sumC);
    return { number: n, isMaster: isMasterNumber(n) };
  }

  // Legacy compatibility: callers asking for "blended" receive the
  // Western expression number. Reports now show both systems separately.
  const n = reduce(sumP);
  return { number: n, isMaster: isMasterNumber(n) };
}

export function calculateChaldeanNameNumber(fullName: string): number {
  const chars = fullName.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const sum = chars.reduce((acc, c) => acc + (CHALDEAN[c] ?? 0), 0);
  return reduceStrict(sum);
}

export function calculateVedicNumbers(dob: string, fullName: string, currentName?: string): VedicNumbers {
  const date = parseDOB(dob);
  if (!date) throw new Error(`Cannot parse date: ${dob}`);

  const digits = `${date.day}${String(date.month).padStart(2, "0")}${date.year}`
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return {
    driver: reduceStrict(date.day),
    conductor: reduceStrict(digits),
    nameNumber: calculateChaldeanNameNumber(fullName),
    birthDayCompound: date.day,
    currentNameNumber: currentName ? calculateChaldeanNameNumber(currentName) : undefined,
  };
}

export function calculateWesternNumbers(dob: string, fullName: string): WesternNumbers {
  const lifePath = calculateLifePath(dob);
  const expression = calculateExpression(fullName, "western");

  return {
    lifePath: lifePath.number,
    expression: expression.number,
    expressionIsMaster: expression.isMaster,
    soulUrge: calculateSoulUrge(fullName),
    personality: calculatePersonality(fullName),
  };
}

// ─── SOUL URGE (HEART'S DESIRE) ───────────────────────────────────────────────

export function calculateSoulUrge(fullName: string): number {
  const chars = fullName.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const sum = chars
    .filter((c) => VOWELS.has(c))
    .reduce((acc, c) => acc + (PYTHAGOREAN[c] ?? 0), 0);
  return reduce(sum);
}

// ─── PERSONALITY NUMBER ───────────────────────────────────────────────────────

export function calculatePersonality(fullName: string): number {
  const chars = fullName.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const sum = chars
    .filter((c) => !VOWELS.has(c))
    .reduce((acc, c) => acc + (PYTHAGOREAN[c] ?? 0), 0);
  return reduce(sum);
}

// ─── PERSONAL YEAR ────────────────────────────────────────────────────────────

export function calculatePersonalYear(dob: string, year?: number): number {
  const date = parseDOB(dob);
  if (!date) throw new Error(`Cannot parse date: ${dob}`);

  const targetYear = year ?? new Date().getFullYear();
  const d = reduce(date.day);
  const m = reduce(date.month);
  const y = reduceStrict(targetYear);

  return reduceStrict(d + m + y);
}

// ─── PERSONAL MONTH ───────────────────────────────────────────────────────────

export function calculatePersonalMonth(personalYear: number, month: number): number {
  return reduceStrict(personalYear + month);
}

// ─── PERSONAL DAY ─────────────────────────────────────────────────────────────

export function calculatePersonalDay(personalMonth: number, dayOfMonth: number): number {
  return reduceStrict(personalMonth + dayOfMonth);
}

// ─── CHALLENGE NUMBERS ────────────────────────────────────────────────────────

export function calculateChallenges(dob: string): number[] {
  const date = parseDOB(dob);
  if (!date) return [0, 0, 0, 0];

  const d = reduceStrict(date.day);
  const m = reduceStrict(date.month);
  const y = reduceStrict(date.year);

  const c1 = Math.abs(d - m);
  const c2 = Math.abs(d - y);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(m - y);

  return [c1, c2, c3, c4];
}

// ─── PINNACLE NUMBERS ─────────────────────────────────────────────────────────

export function calculatePinnacles(dob: string): number[] {
  const date = parseDOB(dob);
  if (!date) return [0, 0, 0, 0];

  const d = reduce(date.day);
  const m = reduce(date.month);
  const y = reduce(date.year);

  const p1 = reduce(d + m);
  const p2 = reduce(d + y);
  const p3 = reduce(p1 + p2);
  const p4 = reduce(m + y);

  return [p1, p2, p3, p4];
}

// ─── LUCKY NUMBERS ────────────────────────────────────────────────────────────

export function calculateLuckyNumbers(
  lifePath: number,
  expression: number,
  personalYear: number,
  soulUrge: number
): number[] {
  const base = new Set<number>();

  // Add core numbers (reduced to 1-9)
  [lifePath, expression, personalYear, soulUrge].forEach((n) => {
    const r = reduceStrict(n);
    base.add(r);
    // Add the harmony number (9 - n + 1)
    const harmony = r > 4 ? r - 3 : r + 3;
    if (harmony >= 1 && harmony <= 9) base.add(harmony);
  });

  return Array.from(base).sort((a, b) => a - b).slice(0, 5);
}

// ─── MONTHLY FORECAST ────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_THEMES: Record<number, { theme: string; focus: string; energy: "high" | "medium" | "low" }> = {
  1: { theme: "New beginnings & fresh starts", focus: "Plant seeds, set bold intentions, take initiative", energy: "high" },
  2: { theme: "Patience, balance & partnerships", focus: "Collaborate, nurture key relationships, listen deeply", energy: "medium" },
  3: { theme: "Creativity, joy & expression", focus: "Express yourself, socialise, launch creative projects", energy: "high" },
  4: { theme: "Hard work, structure & discipline", focus: "Build foundations, organise, stay consistent", energy: "medium" },
  5: { theme: "Change, freedom & adventure", focus: "Embrace the unexpected, travel, pivot boldly", energy: "high" },
  6: { theme: "Home, family & responsibility", focus: "Heal relationships, focus on loved ones, beautify surroundings", energy: "medium" },
  7: { theme: "Reflection, spirituality & wisdom", focus: "Meditate, research, seek inner clarity, trust intuition", energy: "low" },
  8: { theme: "Power, ambition & financial harvest", focus: "Assert authority, close deals, focus on wealth goals", energy: "high" },
  9: { theme: "Completion, release & transformation", focus: "Let go of what no longer serves, prepare for new cycle", energy: "medium" },
};

export function generateMonthlyForecast(dob: string, year?: number): MonthlyForecast[] {
  const targetYear = year ?? new Date().getFullYear();
  const personalYear = calculatePersonalYear(dob, targetYear);

  return MONTH_NAMES.map((month, i) => {
    const monthNumber = i + 1;
    const personalMonth = calculatePersonalMonth(personalYear, monthNumber);
    const meta = MONTH_THEMES[personalMonth] ?? MONTH_THEMES[1];

    // Calculate best dates: days where personalDay === lifePath or === personalMonth
    const lifePath = calculateLifePath(dob).number;
    const daysInMonth = new Date(targetYear, monthNumber, 0).getDate();
    const bestDates: number[] = [];
    const cautionDates: number[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const pd = calculatePersonalDay(personalMonth, day);
      if (pd === lifePath || pd === personalMonth) {
        bestDates.push(day);
      } else if (pd === 4 || pd === 8) {
        cautionDates.push(day); // Karmic/heavy-energy days
      }
    }

    return {
      month,
      monthNumber,
      personalMonth,
      theme: meta.theme,
      focus: meta.focus,
      energy: meta.energy,
      bestDates: bestDates.slice(0, 5),
      cautionDates: cautionDates.slice(0, 3),
    };
  });
}

// ─── FULL PROFILE ─────────────────────────────────────────────────────────────

export function buildNumerologyProfile(
  dob: string,
  fullBirthName: string,
  system: NumerologySystem = "blended",
  currentName?: string
): CoreNumbers {
  const today = new Date();

  const lpData = calculateLifePath(dob);
  const western = calculateWesternNumbers(dob, fullBirthName);
  const vedic = calculateVedicNumbers(dob, fullBirthName, currentName);
  const exprData = calculateExpression(fullBirthName, system);
  const soulUrge = calculateSoulUrge(fullBirthName);
  const personality = calculatePersonality(fullBirthName);
  const personalYear = calculatePersonalYear(dob);
  const personalMonth = calculatePersonalMonth(personalYear, today.getMonth() + 1);
  const personalDay = calculatePersonalDay(personalMonth, today.getDate());

  const date = parseDOB(dob);
  const birthDay = date ? reduceStrict(date.day) : 0;

  return {
    lifePath: lpData.number,
    lifePathIsMaster: lpData.isMaster,
    expression: exprData.number,
    expressionIsMaster: exprData.isMaster,
    soulUrge,
    personality,
    personalYear,
    personalMonth,
    personalDay,
    birthDay,
    luckyNumbers: calculateLuckyNumbers(lpData.number, exprData.number, personalYear, soulUrge),
    challengeNumbers: calculateChallenges(dob),
    pinnacleNumbers: calculatePinnacles(dob),
    western,
    vedic,
  };
}

// ─── DATE PARSER ─────────────────────────────────────────────────────────────

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  january: 1, february: 2, march: 3, april: 4, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

export function parseDOB(dob: string): { day: number; month: number; year: number } | null {
  // Trim
  const raw = dob.trim();

  // "14 May 1992" or "14 may 1992"
  const textMatch = raw.match(/^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/);
  if (textMatch) {
    const day = parseInt(textMatch[1], 10);
    const month = MONTHS[textMatch[2].toLowerCase()];
    const year = parseInt(textMatch[3], 10);
    if (month) return { day, month, year };
  }

  // ISO: "1992-05-14"
  const isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return {
      year: parseInt(isoMatch[1], 10),
      month: parseInt(isoMatch[2], 10),
      day: parseInt(isoMatch[3], 10),
    };
  }

  // "05/14/1992" or "14/05/1992"
  const slashMatch = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const a = parseInt(slashMatch[1], 10);
    const b = parseInt(slashMatch[2], 10);
    const year = parseInt(slashMatch[3], 10);
    // Heuristic: if first part > 12, it's DD/MM/YYYY
    if (a > 12) return { day: a, month: b, year };
    return { day: b, month: a, year }; // assume MM/DD/YYYY
  }

  // Try native Date
  const d = new Date(raw);
  if (!isNaN(d.getTime())) {
    return { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
  }

  return null;
}

// ─── LIFE PATH TITLE MAP ──────────────────────────────────────────────────────

export const LIFE_PATH_TITLES: Record<number, string> = {
  1: "The Pioneer",
  2: "The Diplomat",
  3: "The Creative",
  4: "The Builder",
  5: "The Freedom Seeker",
  6: "The Nurturer",
  7: "The Seeker of Truth",
  8: "The Powerhouse",
  9: "The Humanitarian",
  11: "The Illuminator",
  22: "The Master Builder",
  33: "The Master Teacher",
};

export const PERSONAL_YEAR_THEMES: Record<number, string> = {
  1: "A Year of New Beginnings",
  2: "A Year of Balance & Partnership",
  3: "A Year of Creativity & Joy",
  4: "A Year of Building & Hard Work",
  5: "A Year of Change & Freedom",
  6: "A Year of Love & Responsibility",
  7: "A Year of Spiritual Awakening",
  8: "A Year of Power & Achievement",
  9: "A Year of Completion & Release",
};
