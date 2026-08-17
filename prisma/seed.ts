import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function upsertClient(email: string, data: any) {
  const existing = await db.client.findFirst({ where: { email, coachId: data.coachId } });
  if (existing) return existing;
  return db.client.create({ data });
}

async function main() {
  const coach = await db.coach.findUnique({ where: { slug: process.env.COACH_SLUG || "vinod-numerology" } });
  if (!coach) throw new Error("Vinod's coach tenant is missing. Run the AURA COACH seed first.");

  const client = await upsertClient("aarav@example.com", {
    coachId: coach.id,
    name: "Aarav Mehta",
    fullBirthName: "Aarav Rajesh Mehta",
    currentName: "Aarav M",
    dateOfBirth: "14 May 1992",
    email: "aarav@example.com",
    phone: "+919876543210",
    focusArea: "Career direction",
    question: "Should I switch jobs this year?",
    goal: "Clarity on career path",
  });

  const client2 = await upsertClient("priya@example.com", {
    coachId: coach.id,
    name: "Priya Sharma",
    fullBirthName: "Priya Anand Sharma",
    currentName: "Priya S",
    dateOfBirth: "22 November 1988",
    email: "priya@example.com",
    phone: "+919123456789",
    focusArea: "Love & relationships",
    question: "When will I meet my partner?",
    goal: "Relationship guidance",
  });

  const client3 = await upsertClient("rohit@example.com", {
    coachId: coach.id,
    name: "Rohit Singh",
    fullBirthName: "Rohit Kumar Singh",
    dateOfBirth: "5 March 1995",
    email: "rohit@example.com",
    phone: "+919988776655",
    focusArea: "Wealth & timing",
    question: "Good time to invest?",
    goal: "Financial planning",
  });

  await db.session.upsert({
    where: { paymentId: "pay_mock_001" },
    update: {},
    create: {
      clientId: client.id,
      focusArea: "Career direction",
      serviceType: "numerology",
      pricePaid: 999,
      scheduledAt: "15 Aug 2026, 11:00 AM IST",
      duration: 15,
      status: "booked",
      paymentId: "pay_mock_001",
      question: "Should I switch jobs this year?",
      desiredOutcome: "Clear decision on job change",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      intakeResponsesJson: JSON.stringify({}),
    },
  });

  await db.session.upsert({
    where: { paymentId: "pay_mock_002" },
    update: {},
    create: {
      clientId: client2.id,
      focusArea: "Love & relationships",
      serviceType: "numerology",
      pricePaid: 999,
      scheduledAt: "16 Aug 2026, 02:30 PM IST",
      duration: 15,
      status: "booked",
      paymentId: "pay_mock_002",
      question: "When will I meet my partner?",
      desiredOutcome: "Relationship timeline clarity",
      meetingLink: "https://meet.google.com/xyz-uvw-rst",
      intakeResponsesJson: JSON.stringify({}),
    },
  });

  await db.session.upsert({
    where: { paymentId: "pay_mock_003" },
    update: {},
    create: {
      clientId: client3.id,
      focusArea: "Name balancing",
      serviceType: "name-balancing",
      pricePaid: 499,
      scheduledAt: "17 Aug 2026, 10:00 AM IST",
      duration: 10,
      status: "booked",
      paymentId: "pay_mock_003",
      question: "Name correction for business",
      desiredOutcome: "Lucky business name",
      meetingLink: "https://meet.google.com/name-balance-123",
      intakeResponsesJson: JSON.stringify({
        nameType: "Business",
        pronunciation: "Rohit Singh",
        nameLanguage: "English",
        usageContext: "Business cards, website",
        nameConcern: "Want a name that attracts wealth",
        candidateNames: "Rohit Singh, Rohit K Singh, R K Singh",
        nameConstraints: "Must keep Rohit",
        mustPreserve: "Rohit",
        legalChange: "No",
      }),
    },
  });

  await db.dashboardAccess.upsert({
    where: { clientId: client.id },
    update: { isActive: true },
    create: { clientId: client.id, isActive: true },
  });

  console.log("Seed complete: 3 clients, 3 sessions with meeting links");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
