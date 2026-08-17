import type { CoreNumbers, MonthlyForecast } from "../numerology-engine";
import type { AIReportContent } from "./report-schema";

const FORBIDDEN_PHRASES = [
  "guaranteed",
  "you will definitely",
  "will certainly happen",
  "you are diagnosed",
  "this will cure",
  "cure your",
  "medical diagnosis",
  "guaranteed wealth",
  "guaranteed marriage",
  "curse",
  "fated to suffer",
];

function allText(content: AIReportContent): string {
  return [
    content.openingLetter,
    content.profileSynthesis,
    content.lifePathReading,
    content.expressionReading,
    content.soulUrgeReading,
    content.personalityReading,
    content.westernVedicIntegration,
    content.personalYearReading,
    content.focusAreaReading,
    content.questionAnswer,
    content.closingMessage,
    ...content.monthlyForecast.flatMap((month) => [month.theme, month.guidance, month.action, month.caution]),
    ...content.actionPlan,
    ...content.affirmations,
  ].join(" ").toLowerCase();
}

export function validateAIReportContent(
  content: AIReportContent,
  core: CoreNumbers,
  monthlyForecast: MonthlyForecast[]
): string[] {
  const issues: string[] = [];
  const text = allText(content);

  for (const phrase of FORBIDDEN_PHRASES) {
    if (text.includes(phrase)) issues.push(`Contains prohibited phrase: ${phrase}`);
  }

  const expectedMonths = monthlyForecast.map((month) => month.month);
  const actualMonths = content.monthlyForecast.map((month) => month.month);
  if (JSON.stringify(expectedMonths) !== JSON.stringify(actualMonths)) {
    issues.push("Monthly forecast does not match the canonical month order");
  }

  const lifePathClaims = content.lifePathReading.match(/life path\s+(11|22|33|[1-9])/gi) || [];
  if (lifePathClaims.some((claim) => Number(claim.match(/(11|22|33|[1-9])$/)?.[1]) !== core.lifePath)) {
    issues.push("Life Path prose contains a conflicting number");
  }

  const personalYearClaims = content.personalYearReading.match(/personal year\s+(11|22|33|[1-9])/gi) || [];
  if (personalYearClaims.some((claim) => Number(claim.match(/(11|22|33|[1-9])$/)?.[1]) !== core.personalYear)) {
    issues.push("Personal Year prose contains a conflicting number");
  }

  if (content.monthlyForecast.length !== 12) issues.push("Monthly forecast must contain 12 entries");
  if (content.actionPlan.length < 3) issues.push("Action plan is too short");
  if (content.affirmations.length !== 4) issues.push("There must be exactly 4 affirmations");

  return issues;
}
