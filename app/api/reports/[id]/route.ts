import { NextRequest, NextResponse } from "next/server";
import { getReport } from "@/lib/report-service";
import { getCurrentAdmin, getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await getReport(params.id);
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }
    const [admin, user] = await Promise.all([getCurrentAdmin(), getCurrentUser()]);
    if (!admin && (!user || user.client.id !== report.clientId)) return NextResponse.json({ error: "Report access denied" }, { status: 403 });
    return NextResponse.json({
      success: true,
      report: {
        id: report.id,
        status: report.reportStatus,
        paymentStatus: report.paymentStatus,
        aiStatus: report.aiStatus,
        aiModel: report.aiModel,
        methodologyVersion: report.methodologyVersion,
        generatedAt: report.generatedAt,
        pdfUrl: report.pdfPath ? `/api/reports/${report.id}/download` : null,
        core: {
          lifePath: report.lifePathNumber,
          expression: report.expressionNumber,
          soulUrge: report.soulUrgeNumber,
          personality: report.personalityNumber,
          personalYear: report.personalYearNumber,
          luckyNumbers: JSON.parse(report.luckyNumbers),
        },
      },
    });
  } catch (err) {
    console.error("[reports/status]", err);
    return NextResponse.json({ error: "Failed to fetch report" }, { status: 500 });
  }
}
