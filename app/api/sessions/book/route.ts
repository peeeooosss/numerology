import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { formatIstDate } from "@/lib/availability";
import { getService, isServiceType, type ServiceType } from "@/lib/services";
import { getNumerologyCoachId } from "@/lib/tenant";

export const dynamic = "force-dynamic";

const bookingSchema = z.object({
  name: z.string().trim().min(2),
  fullBirthName: z.string().trim().min(2),
  currentName: z.string().trim().min(2).optional(),
  dateOfBirth: z.string().trim().min(4),
  email: z.string().email().optional(),
  phone: z.string().trim().optional(),
  focusArea: z.string().trim().min(2),
  subFocusArea: z.string().trim().min(2).optional(),
  question: z.string().trim().optional(),
  desiredOutcome: z.string().trim().optional(),
  additionalContext: z.string().trim().optional(),
  scheduledAt: z.string().trim().optional(),
  slotId: z.string().trim().min(2).optional(),
  paymentId: z.string().trim().min(2),
  serviceType: z.string().trim().optional(),
  nameType: z.string().trim().optional(),
  pronunciation: z.string().trim().optional(),
  nameLanguage: z.string().trim().optional(),
  usageContext: z.string().trim().optional(),
  nameConcern: z.string().trim().optional(),
  candidateNames: z.string().trim().optional(),
  nameConstraints: z.string().trim().optional(),
  mustPreserve: z.string().trim().optional(),
  legalChange: z.string().trim().optional(),
});

class SlotUnavailableError extends Error {}

export async function POST(req: NextRequest) {
  try {
    const input = bookingSchema.parse(await req.json());
    const serviceType: ServiceType = input.serviceType && isServiceType(input.serviceType) ? input.serviceType : "numerology";
    const service = getService(serviceType);
    const coachId = await getNumerologyCoachId();

    const existing = await db.session.findUnique({
      where: { paymentId: input.paymentId },
      include: { client: true },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        bookingId: existing.id,
        clientId: existing.clientId,
        status: existing.status,
        scheduledAt: existing.scheduledAt,
        reused: true,
      });
    }

    let client = input.email
      ? await db.client.findFirst({ where: { coachId, email: input.email } })
      : null;

    if (!client) {
      client = await db.client.create({
        data: {
          coachId,
          name: input.name,
          fullBirthName: input.fullBirthName,
          currentName: input.currentName,
          dateOfBirth: input.dateOfBirth,
          email: input.email,
          phone: input.phone,
          focusArea: input.focusArea,
          question: input.question,
          goal: input.desiredOutcome,
        },
      });
    } else {
      client = await db.client.update({
        where: { id: client.id },
        data: {
          name: input.name,
          fullBirthName: input.fullBirthName,
          currentName: input.currentName,
          dateOfBirth: input.dateOfBirth,
          phone: input.phone,
          focusArea: input.focusArea,
          question: input.question,
        },
      });
    }

    const session = await db.$transaction(async (tx) => {
      let scheduledAt = input.scheduledAt || "Pending confirmation";
      if (input.slotId) {
         const slot = await tx.availabilitySlot.findFirst({ where: { id: input.slotId, coachId } });
        if (!slot || !slot.isActive || slot.startsAt <= new Date() || slot.bookedCount >= slot.capacity) throw new SlotUnavailableError("This time has just been booked. Please choose another slot.");
        const claimed = await tx.availabilitySlot.updateMany({
          where: { id: slot.id, isActive: true, bookedCount: { lt: slot.capacity } },
          data: { bookedCount: { increment: 1 } },
        });
        if (claimed.count !== 1) throw new SlotUnavailableError("This time has just been booked. Please choose another slot.");
        scheduledAt = formatIstDate(slot.startsAt);
      }

      return tx.session.create({
        data: {
          clientId: client.id,
          availabilitySlotId: input.slotId,
          focusArea: input.focusArea,
          subFocusArea: input.subFocusArea,
          serviceType,
          pricePaid: service.price,
          scheduledAt,
          duration: service.durationMinutes,
          status: "booked",
          paymentId: input.paymentId,
          question: input.question,
          desiredOutcome: input.desiredOutcome,
          additionalContext: input.additionalContext,
          intakeResponsesJson: JSON.stringify({
            nameType: input.nameType,
            pronunciation: input.pronunciation,
            nameLanguage: input.nameLanguage,
            usageContext: input.usageContext,
            nameConcern: input.nameConcern,
            candidateNames: input.candidateNames,
            nameConstraints: input.nameConstraints,
            mustPreserve: input.mustPreserve,
            legalChange: input.legalChange,
          }),
        },
      });
    });

    return NextResponse.json({
      success: true,
      bookingId: session.id,
      clientId: client.id,
      status: session.status,
      scheduledAt: session.scheduledAt,
      serviceType: session.serviceType,
      serviceName: service.name,
      duration: session.duration,
      pricePaid: session.pricePaid,
      dashboardAccess: "pending_first_session",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Booking failed";
    return NextResponse.json({ success: false, error: message }, { status: error instanceof SlotUnavailableError ? 409 : 400 });
  }
}
