import type { CoreNumbers, MonthlyForecast } from "../numerology-engine";
import { LIFE_PATH_INTERPRETATIONS, PERSONAL_YEAR_INTERPRETATIONS } from "../interpretations";
import { requestOpenRouterReport } from "./openrouter";
import { buildReportPrompts } from "./report-prompts";
import { aiReportContentSchema, type AIReportContent } from "./report-schema";
import { validateAIReportContent } from "./quality";

export interface AIReportInput {
  client: {
    name: string;
    dateOfBirth: string;
    focusArea?: string;
    question?: string;
  };
  core: CoreNumbers;
  monthlyForecast: MonthlyForecast[];
}

export interface AIReportResult {
  content: AIReportContent;
  model: string;
  status: "generated" | "fallback";
  inputTokens?: number;
  outputTokens?: number;
}

function fallbackContent(input: AIReportInput): AIReportContent {
  const lifePath = LIFE_PATH_INTERPRETATIONS[input.core.lifePath] || LIFE_PATH_INTERPRETATIONS[1];
  const personalYear = PERSONAL_YEAR_INTERPRETATIONS[input.core.personalYear] || PERSONAL_YEAR_INTERPRETATIONS[1];
  const firstName = input.client.name.split(/\s+/)[0];
  const excerpt = (value: string, words: number) => value.split(/\s+/).slice(0, words).join(" ");

  const content: AIReportContent = {
    openingLetter: `${firstName}, this report offers a grounded reflection on the patterns represented by your birth date and name. Your numerological profile is not a fixed verdict; it is a language for noticing strengths, recurring lessons, and the kind of choices that may feel most aligned. Read the sections slowly and keep the guidance that genuinely supports your lived experience. The most useful reading is one that gives you more self-awareness and better questions, not one that takes your agency away.`,
    profileSynthesis: `Your profile brings together a Life Path ${input.core.lifePath}, Expression ${input.core.expression}, Soul Urge ${input.core.soulUrge}, and Personality ${input.core.personality}. In the Western tradition, these numbers describe purpose, expression, inner motivation, and the way your outer presence may be experienced. The Vedic perspective adds Driver ${input.core.vedic.driver}, Conductor ${input.core.vedic.conductor}, and Chaldean Name Number ${input.core.vedic.nameNumber}. Together, these systems invite a balanced view of your inner nature, practical direction, and current timing.`,
    lifePathReading: excerpt(lifePath.fullText, 340),
    expressionReading: `Your Expression Number ${input.core.expression} describes the abilities and methods through which you may contribute. The number is most useful when treated as an invitation to develop natural talents rather than as a label. Notice which activities make you feel capable, engaged, and able to create value. In career and communication, give these abilities deliberate space while continuing to build the skills that balance them.`,
    soulUrgeReading: `Your Soul Urge Number ${input.core.soulUrge} points toward the inner conditions that support fulfilment. External success is easier to sustain when your choices also respect this private layer of motivation. Give yourself regular opportunities to identify what feels meaningful, what restores you, and where you may be acting mainly from expectation.`,
    personalityReading: `Your Personality Number ${input.core.personality} describes the first impression and visible style you may bring into interactions. It is not the whole of you. Use it as a communication prompt: notice how others respond, clarify your intent when needed, and let trusted people see more of your depth over time.`,
    westernVedicIntegration: `Western Pythagorean numerology and Vedic/Chaldean numerology use different traditions and calculation maps. The Western numbers in this report emphasise the Life Path and name-based expression profile. The Vedic numbers emphasise the Driver, Conductor, and Chaldean Name Number. They should not be averaged into one supposedly scientific result. Their value here is comparative: where both perspectives echo a theme, it may be worth reflecting on; where they differ, the difference can open a useful question.`,
    personalYearReading: excerpt(personalYear.fullText, 260),
    focusAreaReading: `Your selected focus is ${input.client.focusArea || "Personal growth"}. Use your core numbers and current Personal Year as reflection prompts for this area. Choose one practical next step, review it against your real circumstances, and revisit the decision as new information appears. Numerology can support reflection, but it should sit alongside evidence, conversation, and your own judgement.`,
    questionAnswer: input.client.question
      ? `Your question is: “${input.client.question}” The most responsible numerological perspective is to use your current cycle as a timing and self-awareness prompt, not as a command. Consider which option gives your Life Path a constructive outlet, respects your Soul Urge, and can be supported by a realistic plan. Write down the evidence for each choice, the risks you can accept, and the first reversible step. Your decision remains yours.`
      : "No specific question was supplied. Use this report to choose one area where greater alignment would make a practical difference, then turn that insight into a small, measurable action.",
    monthlyForecast: input.monthlyForecast.map((month) => ({
      month: month.month,
      theme: month.theme,
      guidance: month.focus,
      action: `Use ${month.month} for a deliberate step aligned with this month's theme.`,
      caution: `Avoid forcing outcomes while working with ${month.energy} energy.`,
    })),
    actionPlan: [
      "Choose one priority that reflects both your current cycle and real circumstances.",
      "Review the decision with a trusted, practical person before committing.",
      "Track one behaviour or result each week so reflection becomes action.",
      "Revisit the report at the start of each month and update your plan.",
    ],
    affirmations: [
      "I use insight as a guide while keeping my choices grounded in reality.",
      "I can honour my nature and still grow beyond familiar patterns.",
      "I move with patience, clarity, and personal responsibility.",
      "I allow reflection to support action rather than replace it.",
    ],
    closingMessage: `${firstName}, your numbers are best used as a mirror, not a sentence. Keep what creates clarity, question what does not match your lived experience, and let your next practical choice be the measure of this reading's value.`,
  };

  return aiReportContentSchema.parse(content);
}

export async function generateAIReport(input: AIReportInput): Promise<AIReportResult> {
  const lifePathInterpretation = LIFE_PATH_INTERPRETATIONS[input.core.lifePath] || LIFE_PATH_INTERPRETATIONS[1];
  const personalYearInterpretation = PERSONAL_YEAR_INTERPRETATIONS[input.core.personalYear] || PERSONAL_YEAR_INTERPRETATIONS[1];
  const prompts = buildReportPrompts({ ...input, lifePathInterpretation, personalYearInterpretation });

  try {
    const result = await requestOpenRouterReport(prompts.system, prompts.user, true);
    const issues = validateAIReportContent(result.content, input.core, input.monthlyForecast);
    if (issues.length > 0) throw new Error(`AI quality gate failed: ${issues.join("; ")}`);

    return { ...result, status: "generated" };
  } catch (primaryError) {
    try {
      const fallback = await requestOpenRouterReport(prompts.system, prompts.user, false);
      const issues = validateAIReportContent(fallback.content, input.core, input.monthlyForecast);
      if (issues.length > 0) throw new Error(`Fallback AI quality gate failed: ${issues.join("; ")}`);
      return { ...fallback, status: "generated" };
    } catch {
      // A paid report must still be deliverable if OpenRouter is unavailable.
      // The fallback is fully deterministic and uses the Master's library.
      console.warn("AI report generation unavailable; using static fallback", {
        primaryError: primaryError instanceof Error ? primaryError.message : "unknown",
      });
      return {
        content: fallbackContent(input),
        model: "static-master-library",
        status: "fallback",
      };
    }
  }
}
