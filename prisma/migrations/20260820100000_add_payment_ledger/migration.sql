CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "providerOrderId" TEXT NOT NULL,
    "providerPaymentId" TEXT,
    "productType" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" TEXT NOT NULL DEFAULT 'created',
    "metadataJson" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Payment_providerOrderId_key" ON "Payment"("providerOrderId");
CREATE UNIQUE INDEX "Payment_providerPaymentId_key" ON "Payment"("providerPaymentId");
CREATE INDEX "Payment_providerPaymentId_status_idx" ON "Payment"("providerPaymentId", "status");
CREATE INDEX "Payment_productType_status_createdAt_idx" ON "Payment"("productType", "status", "createdAt");
