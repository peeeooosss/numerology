import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createUserSession, normalizeUsername, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { username?: string; password?: string };
    const username = normalizeUsername(body.username || "");
    const password = body.password || "";
    const account = await db.userAccount.findUnique({ where: { username } });
    if (!account || account.status !== "active" || !verifyPassword(password, account.passwordHash)) return NextResponse.json({ success: false, error: "Invalid username or password." }, { status: 401 });
    await db.userAccount.update({ where: { id: account.id }, data: { lastLoginAt: new Date() } });
    await createUserSession(account.id);
    return NextResponse.json({ success: true, mustChangePassword: account.mustChangePassword });
  } catch {
    return NextResponse.json({ success: false, error: "Unable to sign in." }, { status: 400 });
  }
}
