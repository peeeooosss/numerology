import { NextRequest, NextResponse } from "next/server";
import { streamReportPdf } from "@/lib/report-service";
import { getCurrentAdmin, getCurrentUser } from "@/lib/auth";
import { getReport } from "@/lib/report-service";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await getReport(params.id);
    if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
    const [admin, user] = await Promise.all([getCurrentAdmin(), getCurrentUser()]);
    if (!admin && (!user || user.client.id !== report.clientId)) return NextResponse.json({ error: "Report access denied" }, { status: 403 });
    const pdfBuffer = await streamReportPdf(params.id);

    if (!pdfBuffer) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="numerology-report-${params.id}.pdf"`,
        "Content-Length": String(pdfBuffer.length),
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch (err) {
    console.error("[reports/download]", err);
    return NextResponse.json({ error: "Failed to retrieve report" }, { status: 500 });
  }
}
