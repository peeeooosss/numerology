import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, ensureAdminAccount, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string; password?: string };
    const admin = await ensureAdminAccount();
    if (admin.email !== body.email?.trim().toLowerCase() || !verifyPassword(body.password || "", admin.passwordHash)) return NextResponse.json({ success: false, error: "That admin email or password is not recognised." }, { status: 401 });
    await createAdminSession(admin.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Unable to sign in as admin." }, { status: 400 });
  }
}
