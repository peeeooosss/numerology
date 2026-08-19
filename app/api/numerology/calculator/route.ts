import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculatePersonalYear, buildNumerologyProfile, PERSONAL_YEAR_THEMES, LIFE_PATH_TITLES } from "@/lib/numerology-engine";
import { calculateLoShuGrid } from "@/lib/lo-shu";
import { isValidIsoDate } from "@/lib/date-validation";
import { getRequestAddress, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  kind: z.enum(["driver", "conductor", "life-path", "lo-shu", "personal-year"]),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  year: z.number().int().min(1900).max(2200).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(`calculator:${getRequestAddress(request)}`, 30, 60 * 60 * 1000);
    if (!limit.allowed) return NextResponse.json({ success: false, error: "Please wait before requesting another calculation." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    const input = schema.parse(await request.json());
    if (!isValidIsoDate(input.dateOfBirth)) return NextResponse.json({ success: false, error: "Please enter a real date of birth." }, { status: 400 });
    const profile = buildNumerologyProfile(input.dateOfBirth, "Magic of Numbers", "blended");

    if (input.kind === "personal-year") {
      const year = input.year ?? new Date().getFullYear();
      const value = calculatePersonalYear(input.dateOfBirth, year);
      return NextResponse.json({ success: true, kind: input.kind, value, year, theme: PERSONAL_YEAR_THEMES[value] ?? "A year of reflection", formula: `Reduce the birth day + birth month + ${year} to the method's final number.` });
    }
    if (input.kind === "lo-shu") {
      const grid = calculateLoShuGrid(input.dateOfBirth, profile.vedic.driver, profile.vedic.conductor);
      return NextResponse.json({ success: true, kind: input.kind, rows: [[4, 9, 2], [3, 5, 7], [8, 1, 6]], present: grid.present, missing: grid.missing, repeated: grid.repeated, formula: "Place the documented non-zero birth-date digits with the Driver and Conductor inputs into the Lo Shu layout." });
    }

    const values = {
      driver: { value: profile.vedic.driver, formula: "Reduce the day of birth to a single digit.", explanation: "Traditionally associated with natural response and everyday movement." },
      conductor: { value: profile.vedic.conductor, formula: "Add the digits in the complete date of birth and reduce the result.", explanation: "Traditionally associated with broader direction and life rhythm." },
      "life-path": { value: profile.lifePath, formula: "Reduce the date-of-birth calculation according to the Life Path method.", explanation: LIFE_PATH_TITLES[profile.lifePath] ?? "A traditional Life Path reflection." },
    } as const;
    return NextResponse.json({ success: true, kind: input.kind, ...values[input.kind] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Calculation failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
