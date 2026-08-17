import { z } from "zod";

const text = (minimum = 80) => z.string().trim().min(minimum);

export const aiReportContentSchema = z.object({
  openingLetter: text(120),
  profileSynthesis: text(160),
  lifePathReading: text(220),
  expressionReading: text(140),
  soulUrgeReading: text(140),
  personalityReading: text(140),
  westernVedicIntegration: text(180),
  personalYearReading: text(180),
  focusAreaReading: text(180),
  questionAnswer: text(100),
  monthlyForecast: z.array(
    z.object({
      month: z.string().trim().min(3),
      theme: text(20),
      guidance: text(30),
      action: text(20),
      caution: text(20),
    })
  ).length(12),
  actionPlan: z.array(text(30)).min(3).max(5),
  affirmations: z.array(text(20)).length(4),
  closingMessage: text(100),
});

export type AIReportContent = z.infer<typeof aiReportContentSchema>;

export const AI_REPORT_SCHEMA_VERSION = "1.0.0";

export const aiReportJsonSchema = {
  name: "aura_numerology_report",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      openingLetter: { type: "string", description: "A warm, personal opening letter." },
      profileSynthesis: { type: "string", description: "How the core numbers work together." },
      lifePathReading: { type: "string", description: "Deep Life Path interpretation and practical guidance." },
      expressionReading: { type: "string", description: "Expression or Destiny number interpretation." },
      soulUrgeReading: { type: "string", description: "Inner motivation and fulfilment interpretation." },
      personalityReading: { type: "string", description: "How the person may be experienced by others." },
      westernVedicIntegration: { type: "string", description: "Respectful comparison of Western and Vedic numbers." },
      personalYearReading: { type: "string", description: "Current Personal Year interpretation." },
      focusAreaReading: { type: "string", description: "Guidance tailored to the client's selected focus." },
      questionAnswer: { type: "string", description: "Responsible answer to the client's question, or a useful general reading if none was supplied." },
      monthlyForecast: {
        type: "array",
        minItems: 12,
        maxItems: 12,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            month: { type: "string" },
            theme: { type: "string" },
            guidance: { type: "string" },
            action: { type: "string" },
            caution: { type: "string" },
          },
          required: ["month", "theme", "guidance", "action", "caution"],
        },
      },
      actionPlan: { type: "array", minItems: 3, maxItems: 5, items: { type: "string" } },
      affirmations: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
      closingMessage: { type: "string", description: "A grounded, encouraging closing message." },
    },
    required: [
      "openingLetter",
      "profileSynthesis",
      "lifePathReading",
      "expressionReading",
      "soulUrgeReading",
      "personalityReading",
      "westernVedicIntegration",
      "personalYearReading",
      "focusAreaReading",
      "questionAnswer",
      "monthlyForecast",
      "actionPlan",
      "affirmations",
      "closingMessage",
    ],
  },
} as const;
