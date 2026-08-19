import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, ensureAdminAccount, verifyPassword } from "@/lib/auth";
import { getRequestAddress, rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(`admin-login:${getRequestAddress(request)}`, 6, 15 * 60 * 1000);
    if (!limit.allowed) return Response.json({ success: false, error: "Too many sign-in attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    const body = await request.json() as { email?: string; password?: string };
    const admin = await ensureAdminAccount();
    if (admin.email !== body.email?.trim().toLowerCase() || !verifyPassword(body.password || "", admin.passwordHash)) return NextResponse.json({ success: false, error: "That admin email or password is not recognised." }, { status: 401 });
    await createAdminSession(admin.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Unable to sign in as admin." }, { status: 400 });
  }
}
