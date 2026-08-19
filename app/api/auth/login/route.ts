import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createUserSession, normalizeUsername, verifyPassword } from "@/lib/auth";
import { getRequestAddress, rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(`user-login:${getRequestAddress(request)}`, 8, 15 * 60 * 1000);
    if (!limit.allowed) return NextResponse.json({ success: false, error: "Too many sign-in attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
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
