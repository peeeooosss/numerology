import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";
import { checkDashboardAccess } from "@/lib/daily-predictor";
import { buildNumerologyProfile } from "@/lib/numerology-engine";
import { calculateLoShuGrid, LOSHU_ROWS, selectMajorStrength } from "@/lib/lo-shu";
import { LOSHU_MISSING_DETAILS } from "@/lib/interpretations-loshu";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    const email = searchParams.get("email");

    if (!clientId && !email) {
      return NextResponse.json({ error: "clientId or email required" }, { status: 400 });
    }

    const coachId = await getNumerologyCoachId();
    const client = clientId
      ? await db.client.findFirst({ where: { id: clientId, coachId } })
      : await db.client.findFirst({ where: { email: email ?? undefined, coachId }, orderBy: { createdAt: "desc" } });

    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const hasAccess = await checkDashboardAccess(client.id);
    if (!hasAccess) {
      return NextResponse.json(
        { error: "Your Full Lo Shu Blueprint is unlocked after your ₹999 session is completed." },
        { status: 403 }
      );
    }

    const core = buildNumerologyProfile(client.dateOfBirth, client.fullBirthName ?? client.name, "western", client.currentName ?? undefined);
    const grid = calculateLoShuGrid(client.dateOfBirth, core.vedic.driver, core.vedic.conductor);
    const strength = selectMajorStrength(grid, core);

    return NextResponse.json({
      success: true,
      client: { name: client.name, dateOfBirth: client.dateOfBirth },
      driver: core.vedic.driver,
      conductor: core.vedic.conductor,
      rows: LOSHU_ROWS,
      counts: grid.counts,
      present: grid.present,
      repeated: grid.repeated,
      missing: grid.missing,
      completedLines: grid.completedLines,
      majorStrength: strength,
      missingDetails: grid.missing.map((number) => ({ number, ...LOSHU_MISSING_DETAILS[number] })),
    });
  } catch (error) {
    console.error("[dashboard/lo-shu]", error);
    return NextResponse.json({ error: "Failed to load the Lo Shu blueprint" }, { status: 500 });
  }
}
