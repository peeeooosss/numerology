import { db } from "@/lib/db";

export const NUMEROLOGY_COACH_SLUG = process.env.COACH_SLUG || "vinod-numerology";

export async function getNumerologyCoach() {
  const coach = await db.coach.findUnique({ where: { slug: NUMEROLOGY_COACH_SLUG } });
  if (!coach) throw new Error(`Coach tenant '${NUMEROLOGY_COACH_SLUG}' is not configured`);
  return coach;
}

export async function getNumerologyCoachId() {
  return (await getNumerologyCoach()).id;
}
