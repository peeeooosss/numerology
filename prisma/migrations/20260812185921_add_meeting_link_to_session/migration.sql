-- DropIndex
DROP INDEX "Session_serviceType_idx";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "meetingLink" TEXT;
