import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";
import { getCurrentAdmin } from "@/lib/auth";

type Context = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    if (!await getCurrentAdmin()) return NextResponse.json({ success: false, error: "Admin authentication required" }, { status: 401 });
    const coachId = await getNumerologyCoachId();
    const body = await req.json() as { isActive?: boolean; capacity?: number };
    const existing = await db.availabilitySlot.findFirst({ where: { id: params.id, coachId } });
    if (!existing) return NextResponse.json({ success: false, error: "Slot not found" }, { status: 404 });
    const slot = await db.availabilitySlot.update({ where: { id: params.id }, data: { isActive: body.isActive, capacity: body.capacity } });
    return NextResponse.json({ success: true, slot });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Slot could not be updated";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  try {
    if (!await getCurrentAdmin()) return NextResponse.json({ success: false, error: "Admin authentication required" }, { status: 401 });
    const coachId = await getNumerologyCoachId();
    const existing = await db.availabilitySlot.findFirst({ where: { id: params.id, coachId } });
    if (!existing) return NextResponse.json({ success: false, error: "Slot not found" }, { status: 404 });
    await db.availabilitySlot.update({ where: { id: params.id }, data: { isActive: false } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Slot could not be removed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
