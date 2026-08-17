/**
 * DAILY PREDICTOR
 * Generates personalised daily guidance for AURA Dashboard users.
 * Called once per day per client — results are cached in the DB.
 */

import { db } from "./db";
import { getNumerologyCoachId } from "./tenant";
import {
  buildNumerologyProfile,
  calculatePersonalDay,
  calculatePersonalMonth,
  calculatePersonalYear,
} from "./numerology-engine";
import { PERSONAL_DAY_GUIDANCE } from "./interpretations";

export interface DailyPrediction {
  date: string;
  personalDay: number;
  personalMonth: number;
  personalYear: number;
  luckyNumbers: number[];
  energyScore: number;
  dos: string[];
  donts: string[];
  prediction: string;
  theme: string;
}

/**
 * Calculate today's energy score (40–100) based on the alignment
 * between Personal Day, Life Path, and Personal Year.
 */
function calcEnergyScore(
  personalDay: number,
  lifePath: number,
  personalYear: number
): number {
  let score = 60; // base

  // Same number as life path → peak alignment
  if (personalDay === (lifePath % 9 || 9)) score += 20;

  // Same number as personal year → harmonic day
  if (personalDay === personalYear) score += 10;

  // 1 and 8 are high-output days universally
  if (personalDay === 1 || personalDay === 8) score += 8;

  // 7 is a rest/reflection day
  if (personalDay === 7) score -= 15;

  // 9 is completion — moderately lower output
  if (personalDay === 9) score -= 5;

  return Math.max(40, Math.min(100, score));
}

export async function getDailyPrediction(clientId: string): Promise<DailyPrediction> {
  const coachId = await getNumerologyCoachId();
  const client = await db.client.findFirst({ where: { id: clientId, coachId } });
  if (!client) throw new Error("Client not found");
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

  // Return cached prediction if it exists for today
  const cached = await db.dailyPrediction.findUnique({
    where: { clientId_date: { clientId, date: dateStr } },
  });

  if (cached) {
    return {
      date: cached.date,
      personalDay: cached.personalDay,
      personalMonth: today.getMonth() + 1,
      personalYear: 0, // not stored separately — derive below if needed
      luckyNumbers: JSON.parse(cached.luckyNumbers),
      energyScore: cached.energyScore,
      dos: JSON.parse(cached.dos),
      donts: JSON.parse(cached.donts),
      prediction: cached.prediction,
      theme: cached.theme,
    };
  }

  // Build numerology profile
  const core = buildNumerologyProfile(client.dateOfBirth, client.fullBirthName ?? client.name);

  const personalYear = calculatePersonalYear(client.dateOfBirth);
  const personalMonth = calculatePersonalMonth(personalYear, today.getMonth() + 1);
  const personalDay = calculatePersonalDay(personalMonth, today.getDate());

  const guidance = PERSONAL_DAY_GUIDANCE[personalDay] ?? PERSONAL_DAY_GUIDANCE[1];

  const energyScore = calcEnergyScore(personalDay, core.lifePath, personalYear);

  // Personalise lucky numbers for today
  const todayLucky = [
    personalDay,
    ...core.luckyNumbers.filter((n) => n !== personalDay),
  ].slice(0, 4);

  // Persist to DB
  await db.dailyPrediction.create({
    data: {
      clientId,
      date: dateStr,
      personalDay,
      luckyNumbers: JSON.stringify(todayLucky),
      energyScore,
      dos: JSON.stringify(guidance.dos),
      donts: JSON.stringify(guidance.donts),
      prediction: guidance.prediction,
      theme: guidance.theme,
    },
  });

  return {
    date: dateStr,
    personalDay,
    personalMonth,
    personalYear,
    luckyNumbers: todayLucky,
    energyScore,
    dos: guidance.dos,
    donts: guidance.donts,
    prediction: guidance.prediction,
    theme: guidance.theme,
  };
}

export async function checkDashboardAccess(clientId: string): Promise<boolean> {
  const coachId = await getNumerologyCoachId();
  const access = await db.dashboardAccess.findFirst({
    where: { clientId, client: { coachId } },
  });

  if (!access) return false;
  if (!access.isActive) return false;
  if (access.expiresAt && access.expiresAt < new Date()) return false;
  return true;
}

export async function grantDashboardAccess(clientId: string): Promise<void> {
  await db.dashboardAccess.upsert({
    where: { clientId },
    create: { clientId, isActive: true },
    update: { isActive: true, grantedAt: new Date() },
  });
}
