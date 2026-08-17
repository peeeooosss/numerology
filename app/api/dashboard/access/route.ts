import { NextRequest, NextResponse } from "next/server";
import { checkDashboardAccess } from "@/lib/daily-predictor";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";

export const dynamic = "force-dynamic";

// POST — grant dashboard access (called after session is marked completed)
export async function POST(req: NextRequest) {
  try {
    const { clientId } = await req.json();
    if (!clientId) {
      return NextResponse.json({ error: "clientId required" }, { status: 400 });
    }

    const coachId = await getNumerologyCoachId();
    const client = await db.client.findFirst({ where: { id: clientId, coachId }, select: { id: true } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    await db.dashboardAccess.upsert({
      where: { clientId },
      create: { clientId, isActive: true },
      update: { isActive: true, grantedAt: new Date() },
    });

    return NextResponse.json({ success: true, message: "Dashboard access granted" });
  } catch (err) {
    console.error("[dashboard/access POST]", err);
    return NextResponse.json({ error: "Failed to grant access" }, { status: 500 });
  }
}

// GET — check if clientId has dashboard access
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json({ error: "clientId required" }, { status: 400 });
    }

    const coachId = await getNumerologyCoachId();
    const client = await db.client.findFirst({ where: { id: clientId, coachId }, select: { id: true } });
    if (!client) return NextResponse.json({ hasAccess: false }, { status: 404 });
    const hasAccess = await checkDashboardAccess(clientId);
    return NextResponse.json({ hasAccess });
  } catch (err) {
    console.error("[dashboard/access GET]", err);
    return NextResponse.json({ error: "Failed to check access" }, { status: 500 });
  }
}
