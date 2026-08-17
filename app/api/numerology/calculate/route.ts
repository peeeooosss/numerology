import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildNumerologyProfile, generateMonthlyForecast, LIFE_PATH_TITLES, PERSONAL_YEAR_THEMES } from "@/lib/numerology-engine";

const schema = z.object({
  dob: z.string().min(4),
  fullBirthName: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dob, fullBirthName } = schema.parse(body);

    const core = buildNumerologyProfile(dob, fullBirthName, "blended");
    const monthlyForecast = generateMonthlyForecast(dob);

    return NextResponse.json({
      success: true,
      data: {
        core,
        monthlyForecast,
        lifePathTitle: LIFE_PATH_TITLES[core.lifePath] ?? "The Seeker",
        personalYearTheme: PERSONAL_YEAR_THEMES[core.personalYear] ?? "A Year of Transformation",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Calculation failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
