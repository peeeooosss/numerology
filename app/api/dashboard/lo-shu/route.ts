import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";
import { checkDashboardAccess } from "@/lib/daily-predictor";
import { buildNumerologyProfile } from "@/lib/numerology-engine";
import { calculateLoShuGrid, LOSHU_ROWS, selectMajorStrength } from "@/lib/lo-shu";
import { LOSHU_MISSING_DETAILS } from "@/lib/interpretations-loshu";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    const clientId = currentUser.client.id;

    const coachId = await getNumerologyCoachId();
    const client = await db.client.findFirst({ where: { id: clientId, coachId } });

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
