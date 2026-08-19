import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRequestAddress, rateLimit } from "@/lib/rate-limit";
import { isValidIsoDate } from "@/lib/date-validation";
import { TOOL_CALCULATIONS, TOOL_DEFINITIONS } from "@/lib/tools/calculations";
import type { ToolSlug, ToolResult } from "@/lib/tools/tool-types";

const baseSchema = z.object({
  slug: z.string(),
});

function validateDates(data: Record<string, string>, fieldNames: string[]) {
  for (const name of fieldNames) {
    const value = data[name];
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value) && !isValidIsoDate(value)) {
      return `${name} is not a valid date.`;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(`tools:${getRequestAddress(request)}`, 30, 60 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { success: false, error: "Please wait before requesting another calculation." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    const body = await request.json();
    const { slug } = baseSchema.parse(body);

    if (!(slug in TOOL_CALCULATIONS)) {
      return NextResponse.json(
        { success: false, error: "Unknown tool." },
        { status: 400 }
      );
    }

    const toolSlug = slug as ToolSlug;
    const definition = TOOL_DEFINITIONS[toolSlug];
    const calculator = TOOL_CALCULATIONS[toolSlug];

    // Validate required fields
    for (const field of definition.fields) {
      if ("required" in field && field.required && !body[field.name]?.trim()) {
        return NextResponse.json(
          { success: false, error: `${field.label} is required.` },
          { status: 400 }
        );
      }
    }

    // Validate dates
    const dateFields = definition.fields.filter((f) => f.type === "date").map((f) => f.name);
    const dateError = validateDates(body, dateFields);
    if (dateError) {
      return NextResponse.json(
        { success: false, error: dateError },
        { status: 400 }
      );
    }

    let result: ToolResult;

    // eslint-disable-next-line
    const calc = calculator as (input: any) => ToolResult;

    switch (toolSlug) {
      case "personal-day-calculator":
        result = calc({
          dateOfBirth: body.dateOfBirth,
          targetDate: body.targetDate,
        });
        break;
      case "name-comparison-calculator":
        result = calc({
          dateOfBirth: body.dateOfBirth,
          currentName: body.currentName,
          optionA: body.optionA,
          optionB: body.optionB,
          optionC: body.optionC,
        });
        break;
      case "numerology-compatibility-calculator":
        result = calc({
          personAName: body.personAName,
          personADob: body.personADob,
          personBName: body.personBName,
          personBDob: body.personBDob,
        });
        break;
      case "business-name-numerology-calculator":
        result = calc({
          founderName: body.founderName,
          founderDob: body.founderDob,
          businessCategory: body.businessCategory,
          candidateNames: [body.candidateName1, body.candidateName2, body.candidateName3].filter(Boolean),
        });
        break;
      case "lucky-date-calculator":
        result = calc({
          dateOfBirth: body.dateOfBirth,
          targetDate: body.targetDate,
          purpose: body.purpose,
        });
        break;
      case "numerology-cycles-calculator":
        result = calc({
          dateOfBirth: body.dateOfBirth,
        });
        break;
      case "session-question-builder":
        result = calc({
          concern: body.concern,
          situation: body.situation,
        });
        break;
      default:
        return NextResponse.json(
          { success: false, error: "Tool not implemented." },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Calculation failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
