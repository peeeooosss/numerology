import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateTemporaryPassword, getCurrentAdmin, hashPassword } from "@/lib/auth";
import { getNumerologyCoachId } from "@/lib/tenant";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!await getCurrentAdmin()) return NextResponse.json({ success: false, error: "Admin authentication required" }, { status: 401 });
  try {
    const body = await request.json() as { action?: "reset" | "disable" | "enable" };
    const coachId = await getNumerologyCoachId();
    const account = await db.userAccount.findFirst({ where: { id: params.id, client: { coachId } } });
    if (!account) return NextResponse.json({ success: false, error: "Account not found" }, { status: 404 });
    if (body.action === "disable") {
      await db.userAccount.update({ where: { id: account.id }, data: { status: "disabled" } });
      await db.authSession.deleteMany({ where: { userAccountId: account.id } });
      return NextResponse.json({ success: true, status: "disabled" });
    }
    if (body.action === "enable") {
      await db.userAccount.update({ where: { id: account.id }, data: { status: "active" } });
      return NextResponse.json({ success: true, status: "active" });
    }
    const temporaryPassword = generateTemporaryPassword();
    await db.userAccount.update({ where: { id: account.id }, data: { passwordHash: hashPassword(temporaryPassword), status: "active", mustChangePassword: true, lastLoginAt: null } });
    await db.authSession.deleteMany({ where: { userAccountId: account.id } });
    return NextResponse.json({ success: true, credentials: { username: account.username, temporaryPassword, loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:7777"}/login` } });
  } catch {
    return NextResponse.json({ success: false, error: "Account update failed" }, { status: 400 });
  }
}
