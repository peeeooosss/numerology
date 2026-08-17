ALTER TABLE "Session" ADD COLUMN "serviceType" TEXT NOT NULL DEFAULT 'numerology';
ALTER TABLE "Session" ADD COLUMN "pricePaid" INTEGER NOT NULL DEFAULT 999;
ALTER TABLE "Session" ADD COLUMN "intakeResponsesJson" TEXT;
ALTER TABLE "Session" ADD COLUMN "adminAnalysisJson" TEXT;

CREATE INDEX "Session_serviceType_idx" ON "Session"("serviceType");
