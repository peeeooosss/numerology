import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const current = await getCurrentUser();
  if (!current) return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
  try {
    const body = await request.json() as { currentPassword?: string; newPassword?: string };
    const currentPassword = body.currentPassword || "";
    const newPassword = body.newPassword || "";
    if (!verifyPassword(currentPassword, current.account.passwordHash)) return NextResponse.json({ success: false, error: "Current password is incorrect." }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ success: false, error: "New password must be at least 8 characters." }, { status: 400 });
    await db.userAccount.update({ where: { id: current.account.id }, data: { passwordHash: hashPassword(newPassword), mustChangePassword: false } });
    await db.authSession.deleteMany({ where: { userAccountId: current.account.id, id: { not: current.session.id } } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Password could not be changed." }, { status: 400 });
  }
}
