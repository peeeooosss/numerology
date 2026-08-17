ALTER TABLE "Report"
ADD COLUMN "reportType" TEXT NOT NULL DEFAULT 'basic',
ADD COLUMN "driverNumber" INTEGER,
ADD COLUMN "conductorNumber" INTEGER,
ADD COLUMN "missingNumberCount" INTEGER,
ADD COLUMN "loShuFactsJson" TEXT;
