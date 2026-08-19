import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const coachId = await getNumerologyCoachId();
  if (req.nextUrl.searchParams.get("all") === "true") {
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

  const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  if (!email) return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });

  const client = await db.client.findFirst({
    where: { coachId, email },
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
