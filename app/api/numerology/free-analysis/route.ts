import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateLoShuGrid, selectMajorStrength } from "@/lib/lo-shu";
import { LIFE_PATH_INTERPRETATIONS } from "@/lib/interpretations";
import { assembleBasicReport } from "@/lib/interpretations-loshu";
import { calculateNameHarmony } from "@/lib/name-harmony";
import { buildNumerologyProfile, LIFE_PATH_TITLES, PERSONAL_YEAR_THEMES } from "@/lib/numerology-engine";

const schema = z.object({
  currentName: z.string().trim().min(2).max(100),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request: NextRequest) {
  try {
    const { currentName, dateOfBirth } = schema.parse(await request.json());
    const core = buildNumerologyProfile(dateOfBirth, currentName, "blended", currentName);
    const loShu = calculateLoShuGrid(dateOfBirth, core.vedic.driver, core.vedic.conductor);
    const majorStrength = selectMajorStrength(loShu, core);
    const basic = assembleBasicReport(core, loShu, majorStrength);
    const lifePath = LIFE_PATH_INTERPRETATIONS[core.lifePath] ?? LIFE_PATH_INTERPRETATIONS[1];
    const nameHarmony = calculateNameHarmony(core.vedic.nameNumber, core.vedic.driver, core.vedic.conductor, core.lifePath);

    return NextResponse.json({
      success: true,
      data: {
        core: {
          lifePath: core.lifePath,
          expression: core.expression,
          soulUrge: core.soulUrge,
          personality: core.personality,
          personalYear: core.personalYear,
          luckyNumbers: core.luckyNumbers,
          driver: core.vedic.driver,
          conductor: core.vedic.conductor,
          nameNumber: core.vedic.nameNumber,
        },
        lifePathTitle: LIFE_PATH_TITLES[core.lifePath] ?? "The Seeker",
        personalYearTheme: PERSONAL_YEAR_THEMES[core.personalYear] ?? "A Year of Reflection",
        nameHarmony,
        loShu: {
          rows: [[4, 9, 2], [3, 5, 7], [8, 1, 6]],
          counts: loShu.counts,
          present: loShu.present,
          missing: loShu.missing,
          repeated: loShu.repeated,
          completedLines: loShu.completedLines,
        },
        insights: {
          summary: lifePath.summary,
          strengths: lifePath.strengths.slice(0, 2),
          challenges: lifePath.challenges.slice(0, 1),
          career: lifePath.careerGuide,
          relationships: lifePath.loveGuide,
          loShuStrength: basic.majorStrength,
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
