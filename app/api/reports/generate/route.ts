import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateReport } from "@/lib/report-service";

const schema = z.object({
  name: z.string().min(2),
  fullBirthName: z.string().min(2),
  currentName: z.string().min(2).optional(),
  dateOfBirth: z.string().min(4),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  focusArea: z.string().optional(),
  question: z.string().optional(),
  goal: z.string().optional(),
  paymentId: z.string().optional(),
  amountPaid: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = schema.parse(body);

    const result = await generateReport(input);

    return NextResponse.json({
      success: true,
      reportId: result.reportId,
      pdfUrl: result.pdfUrl,
      core: result.core,
      aiStatus: result.aiStatus,
      aiModel: result.aiModel,
    });
  } catch (err) {
    console.error("[reports/generate]", err);
    const message = err instanceof Error ? err.message : "Report generation failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
