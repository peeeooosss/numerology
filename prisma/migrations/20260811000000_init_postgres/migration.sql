-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullBirthName" TEXT,
    "currentName" TEXT,
    "dateOfBirth" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "focusArea" TEXT,
    "question" TEXT,
    "goal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "lifePathNumber" INTEGER NOT NULL,
    "expressionNumber" INTEGER NOT NULL,
    "soulUrgeNumber" INTEGER NOT NULL,
    "personalityNumber" INTEGER NOT NULL,
    "personalYearNumber" INTEGER NOT NULL,
    "luckyNumbers" TEXT NOT NULL,
    "numerologyFactsJson" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "paymentId" TEXT,
    "amountPaid" INTEGER NOT NULL DEFAULT 99,
    "reportStatus" TEXT NOT NULL DEFAULT 'pending',
    "pdfPath" TEXT,
    "generatedAt" TIMESTAMP(3),
    "aiContentJson" TEXT,
    "aiModel" TEXT,
    "aiStatus" TEXT NOT NULL DEFAULT 'pending',
    "aiPromptVersion" TEXT,
    "methodologyVersion" TEXT,
    "aiGeneratedAt" TIMESTAMP(3),
    "aiInputTokens" INTEGER,
    "aiOutputTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "availabilitySlotId" TEXT,
    "focusArea" TEXT NOT NULL,
    "subFocusArea" TEXT,
    "scheduledAt" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 15,
    "status" TEXT NOT NULL DEFAULT 'booked',
    "paymentId" TEXT,
    "question" TEXT,
    "desiredOutcome" TEXT,
    "additionalContext" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailabilitySlot" (
    "id" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "bookedCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailabilitySlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardAccess" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DashboardAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyPrediction" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "luckyNumbers" TEXT NOT NULL,
    "energyScore" INTEGER NOT NULL,
    "dos" TEXT NOT NULL,
    "donts" TEXT NOT NULL,
    "prediction" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "personalDay" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyPrediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpretation" (
    "id" TEXT NOT NULL,
    "numberKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "fullText" TEXT NOT NULL,
    "strengths" TEXT NOT NULL,
    "challenges" TEXT NOT NULL,
    "careerGuide" TEXT,
    "loveGuide" TEXT,
    "healthNotes" TEXT,
    "luckyNumbers" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "gemstones" TEXT NOT NULL,
    "affirmations" TEXT NOT NULL,
    "vedicNotes" TEXT,
    "dos" TEXT,
    "donts" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interpretation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_paymentId_key" ON "Report"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_paymentId_key" ON "Session"("paymentId");

-- CreateIndex
CREATE INDEX "AvailabilitySlot_startsAt_isActive_idx" ON "AvailabilitySlot"("startsAt", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilitySlot_startsAt_endsAt_key" ON "AvailabilitySlot"("startsAt", "endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardAccess_clientId_key" ON "DashboardAccess"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyPrediction_clientId_date_key" ON "DailyPrediction"("clientId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Interpretation_numberKey_key" ON "Interpretation"("numberKey");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_availabilitySlotId_fkey" FOREIGN KEY ("availabilitySlotId") REFERENCES "AvailabilitySlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardAccess" ADD CONSTRAINT "DashboardAccess_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyPrediction" ADD CONSTRAINT "DailyPrediction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

