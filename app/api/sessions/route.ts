import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";
import { getCurrentAdmin, getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const coachId = await getNumerologyCoachId();
  if (req.nextUrl.searchParams.get("all") === "true") {
    if (!await getCurrentAdmin()) return NextResponse.json({ success: false, error: "Admin authentication required" }, { status: 401 });
    const sessions = await db.session.findMany({
      where: { client: { coachId } },
      include: { client: true, availabilitySlot: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      sessions,
      summary: {
        total: sessions.length,
        upcoming: sessions.filter((session) => session.status === "booked").length,
        completed: sessions.filter((session) => session.status === "completed").length,
        cancelled: sessions.filter((session) => session.status === "cancelled").length,
      },
    }, { headers: { "Cache-Control": "no-store" } });
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });

  const client = await db.client.findFirst({
    where: { id: currentUser.client.id, coachId },
    include: { reports: { orderBy: { createdAt: "desc" }, select: { id: true, reportStatus: true, generatedAt: true } } },
  });
  if (!client) return NextResponse.json({ success: true, sessions: [], summary: { total: 0, upcoming: 0, completed: 0, cancelled: 0 } });

  const sessions = await db.session.findMany({
    where: { clientId: client.id },
    include: { availabilitySlot: true },
    orderBy: { createdAt: "desc" },
  });
  const upcoming = sessions.filter((session) => session.status === "booked").length;
  return NextResponse.json({
    success: true,
    client: { id: client.id, name: client.name, email: client.email, reports: client.reports },
    sessions,
    summary: {
      total: sessions.length,
      upcoming,
      completed: sessions.filter((session) => session.status === "completed").length,
      cancelled: sessions.filter((session) => session.status === "cancelled").length,
    },
  }, { headers: { "Cache-Control": "no-store" } });
}
