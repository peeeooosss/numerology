import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateTemporaryPassword, getCurrentAdmin, hashPassword, normalizeUsername } from "@/lib/auth";
import { getNumerologyCoachId } from "@/lib/tenant";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!await getCurrentAdmin()) return NextResponse.json({ success: false, error: "Admin authentication required" }, { status: 401 });
  const coachId = await getNumerologyCoachId();
  const sessions = await db.session.findMany({
    where: { client: { coachId } },
    include: { client: { include: { userAccount: { select: { id: true, username: true, status: true, mustChangePassword: true, lastLoginAt: true, createdAt: true } } } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, sessions: sessions.map((session) => ({
    id: session.id,
    status: session.status,
    serviceType: session.serviceType,
    scheduledAt: session.scheduledAt,
    pricePaid: session.pricePaid,
    client: { id: session.client.id, name: session.client.name, email: session.client.email, userAccount: session.client.userAccount },
  })) });
}

export async function POST(request: NextRequest) {
  if (!await getCurrentAdmin()) return NextResponse.json({ success: false, error: "Admin authentication required" }, { status: 401 });
  try {
    const body = await request.json() as { sessionId?: string };
    if (!body.sessionId) return NextResponse.json({ success: false, error: "sessionId is required" }, { status: 400 });
    const coachId = await getNumerologyCoachId();
    const session = await db.session.findFirst({ where: { id: body.sessionId, client: { coachId } }, include: { client: true } });
    if (!session) return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
    if (!session.client.email) return NextResponse.json({ success: false, error: "This client needs an email address before credentials can be created." }, { status: 400 });

    const username = normalizeUsername(session.client.email);
    const temporaryPassword = generateTemporaryPassword();
    const account = await db.userAccount.upsert({
      where: { clientId: session.clientId },
      create: { clientId: session.clientId, username, passwordHash: hashPassword(temporaryPassword), status: "active", mustChangePassword: true },
      update: { username, passwordHash: hashPassword(temporaryPassword), status: "active", mustChangePassword: true, lastLoginAt: null },
    });
    await db.authSession.deleteMany({ where: { userAccountId: account.id } });
    return NextResponse.json({ success: true, credentials: { username, temporaryPassword, loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:7777"}/login`, clientName: session.client.name } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Credentials could not be created";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
