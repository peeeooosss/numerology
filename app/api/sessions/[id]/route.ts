import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";
import { getCurrentAdmin } from "@/lib/auth";

const statusSchema = z.object({
  status: z.enum(["booked", "completed", "cancelled"]).optional(),
  notes: z.string().optional(),
  adminAnalysisJson: z.string().optional(),
  meetingLink: z.string().url().optional().or(z.literal("")),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!await getCurrentAdmin()) return NextResponse.json({ success: false, error: "Admin authentication required" }, { status: 401 });
    const input = statusSchema.parse(await req.json());
    const coachId = await getNumerologyCoachId();
    if (!input.status && input.notes === undefined && input.adminAnalysisJson === undefined) throw new Error("No session changes provided");
    const session = await db.$transaction(async (tx) => {
       const current = await tx.session.findFirst({ where: { id: params.id, client: { coachId } } });
      if (!current) throw new Error("Session not found");
      const updated = await tx.session.update({ where: { id: params.id }, data: {
        ...(input.status ? { status: input.status } : {}),
        ...(input.notes !== undefined ? { notes: input.notes } : {}),
        ...(input.adminAnalysisJson !== undefined ? { adminAnalysisJson: input.adminAnalysisJson } : {}),
        ...(input.meetingLink !== undefined ? { meetingLink: input.meetingLink || null } : {}),
      } });
      if (current.status !== "cancelled" && input.status === "cancelled" && current.availabilitySlotId) {
        await tx.availabilitySlot.updateMany({ where: { id: current.availabilitySlotId, bookedCount: { gt: 0 } }, data: { bookedCount: { decrement: 1 } } });
      }
      if (input.status === "completed") {
        await tx.dashboardAccess.upsert({ where: { clientId: current.clientId }, create: { clientId: current.clientId }, update: { isActive: true, grantedAt: new Date() } });
      }
      return updated;
    });
    return NextResponse.json({ success: true, session });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Session could not be updated";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
