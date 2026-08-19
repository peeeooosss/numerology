import { NextRequest, NextResponse } from "next/server";
import { getDailyPrediction, checkDashboardAccess } from "@/lib/daily-predictor";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    const clientId = currentUser.client.id;

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
