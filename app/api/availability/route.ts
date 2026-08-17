import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { ensureDefaultAvailability, formatIstTimeRange, PRACTICE_TIMEZONE } from "@/lib/availability";
import { getNumerologyCoachId } from "@/lib/tenant";

export const dynamic = "force-dynamic";

const createSlotSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional(),
  capacity: z.number().int().min(1).max(10).default(1),
});

function serializeSlot(slot: { id: string; startsAt: Date; endsAt: Date; timezone: string; capacity: number; bookedCount: number; isActive: boolean }) {
  return {
    id: slot.id,
    startsAt: slot.startsAt.toISOString(),
    endsAt: slot.endsAt.toISOString(),
    timezone: slot.timezone,
    capacity: slot.capacity,
    bookedCount: slot.bookedCount,
    remaining: Math.max(0, slot.capacity - slot.bookedCount),
    isActive: slot.isActive,
    label: formatIstTimeRange(slot.startsAt, slot.endsAt),
  };
}

export async function GET(req: NextRequest) {
  try {
    await ensureDefaultAvailability();
    const coachId = await getNumerologyCoachId();
    const slots = await db.availabilitySlot.findMany({
      where: { coachId, isActive: true, startsAt: { gt: new Date() } },
      orderBy: { startsAt: "asc" },
      take: 30,
    });
    const includeBooked = req.nextUrl.searchParams.get("includeBooked") === "true";
    return NextResponse.json({ success: true, timezone: PRACTICE_TIMEZONE, slots: (includeBooked ? slots : slots.filter((slot) => slot.bookedCount < slot.capacity)).map(serializeSlot) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[availability]", error);
    return NextResponse.json({ success: false, error: "Availability could not be loaded" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const input = createSlotSchema.parse(await req.json());
    const coachId = await getNumerologyCoachId();
    const startsAt = new Date(input.startsAt);
    const endsAt = input.endsAt ? new Date(input.endsAt) : new Date(startsAt.getTime() + 15 * 60_000);
    if (startsAt <= new Date() || endsAt <= startsAt) return NextResponse.json({ success: false, error: "Choose a future 15-minute window" }, { status: 400 });
    const slot = await db.availabilitySlot.create({ data: { coachId, startsAt, endsAt, capacity: input.capacity, timezone: PRACTICE_TIMEZONE } });
    return NextResponse.json({ success: true, slot: serializeSlot(slot) }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Availability could not be published";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
