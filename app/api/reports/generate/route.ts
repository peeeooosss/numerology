import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateReport } from "@/lib/report-service";
import { getVerifiedPayment, isMockPaymentsAllowed } from "@/lib/payments";
import { getRequestAddress, rateLimit } from "@/lib/rate-limit";
import { isValidIsoDate } from "@/lib/date-validation";

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
  paymentId: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    const limit = rateLimit(`report-generation:${getRequestAddress(req)}`, 5, 60 * 60 * 1000);
    if (!limit.allowed) return NextResponse.json({ success: false, error: "Please wait before generating another report." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    const body = await req.json();
    const input = schema.parse(body);
    if (!isValidIsoDate(input.dateOfBirth)) return NextResponse.json({ success: false, error: "Please enter a real date of birth." }, { status: 400 });
    const payment = await getVerifiedPayment(input.paymentId, "report", 99);
    if (!payment && !(isMockPaymentsAllowed() && input.paymentId.startsWith("order_dev_"))) {
      return NextResponse.json({ success: false, error: "A verified ₹99 payment is required" }, { status: 402 });
    }

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
