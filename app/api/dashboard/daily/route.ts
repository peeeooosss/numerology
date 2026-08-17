import { NextRequest, NextResponse } from "next/server";
import { getDailyPrediction, checkDashboardAccess } from "@/lib/daily-predictor";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json({ error: "clientId required" }, { status: 400 });
    }

    // Verify dashboard access
    const hasAccess = await checkDashboardAccess(clientId);
    if (!hasAccess) {
      return NextResponse.json(
        { error: "Dashboard access not granted. Book a session first." },
        { status: 403 }
      );
    }

    const prediction = await getDailyPrediction(clientId);
    return NextResponse.json({ success: true, prediction });
  } catch (err) {
    console.error("[dashboard/daily]", err);
    return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 });
  }
}
