/**
 * REPORT SERVICE
 * Deterministic calculations -> validated AI narrative -> branded PDF.
 * A report is generated once and then served from persisted storage.
 */

import fs from "fs";
import path from "path";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "./db";
import { getNumerologyCoachId } from "./tenant";
import {
  buildNumerologyProfile,
  generateMonthlyForecast,
} from "./numerology-engine";
import { NumerologyReportDocument, type ReportData } from "./pdf-report";
import { calculateLoShuGrid, selectMajorStrength } from "./lo-shu";
import { assembleBasicReport } from "./interpretations-loshu";
import { generateAIReport } from "./ai/report-ai";
import { AI_REPORT_SCHEMA_VERSION } from "./ai/report-schema";

const IS_SERVERLESS = process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
const REPORTS_DIR = IS_SERVERLESS
  ? path.join("/tmp", "reports")
  : path.join(process.cwd(), "public", "reports");
const METHODOLOGY_VERSION = "western-pythagorean+vedic-driver-conductor-chaldean+lo-shu-v1";

function ensureReportsDir() {
  if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

export interface GenerateReportInput {
  name: string;
  fullBirthName: string;
  currentName?: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  focusArea?: string;
  question?: string;
  goal?: string;
  paymentId?: string;
  amountPaid?: number;
}

export interface GeneratedReportResult {
  reportId: string;
  pdfPath: string;
  pdfUrl: string;
  core: ReturnType<typeof buildNumerologyProfile>;
  aiStatus: string;
  aiModel: string;
}

function canonicalFactsJson(core: ReturnType<typeof buildNumerologyProfile>) {
  return JSON.stringify({
    western: core.western,
    vedic: core.vedic,
    currentCycles: {
      lifePath: core.lifePath,
      personalYear: core.personalYear,
      personalMonth: core.personalMonth,
      personalDay: core.personalDay,
    },
    luckyNumbers: core.luckyNumbers,
    challengeNumbers: core.challengeNumbers,
    pinnacleNumbers: core.pinnacleNumbers,
  });
}

export async function generateReport(input: GenerateReportInput): Promise<GeneratedReportResult> {
  ensureReportsDir();

  // Payment IDs are idempotency keys. A client retry must not create another AI call.
  if (input.paymentId) {
    const existing = await db.report.findUnique({ where: { paymentId: input.paymentId } });
    if (existing?.pdfBytes) {
      return {
        reportId: existing.id,
        pdfPath: existing.pdfPath ?? "",
        pdfUrl: `/reports/${existing.id}.pdf`,
        core: buildNumerologyProfile(input.dateOfBirth, input.fullBirthName, "western", input.currentName),
        aiStatus: existing.aiStatus,
        aiModel: existing.aiModel || "unknown",
      };
    }
    // Fallback to filesystem check for older reports
    if (existing?.pdfPath && fs.existsSync(existing.pdfPath)) {
      return {
        reportId: existing.id,
        pdfPath: existing.pdfPath,
        pdfUrl: `/reports/${existing.id}.pdf`,
        core: buildNumerologyProfile(input.dateOfBirth, input.fullBirthName, "western", input.currentName),
        aiStatus: existing.aiStatus,
        aiModel: existing.aiModel || "unknown",
      };
    }
  }

  const core = buildNumerologyProfile(input.dateOfBirth, input.fullBirthName, "western", input.currentName);
  const monthlyForecast = generateMonthlyForecast(input.dateOfBirth);
  const loShuGrid = calculateLoShuGrid(input.dateOfBirth, core.vedic.driver, core.vedic.conductor);
  const majorStrength = selectMajorStrength(loShuGrid, core);
  const basicContent = assembleBasicReport(core, loShuGrid, majorStrength);
  const coachId = await getNumerologyCoachId();

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
        goal: input.goal,
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
        goal: input.goal,
      },
    });
  }

  const reportRecord = await db.report.create({
    data: {
      clientId: client.id,
      lifePathNumber: core.lifePath,
      expressionNumber: core.expression,
      soulUrgeNumber: core.soulUrge,
      personalityNumber: core.personality,
      personalYearNumber: core.personalYear,
      luckyNumbers: JSON.stringify(core.luckyNumbers),
      numerologyFactsJson: canonicalFactsJson(core),
      reportType: "basic",
      driverNumber: core.vedic.driver,
      conductorNumber: core.vedic.conductor,
      missingNumberCount: basicContent.missingCount,
      loShuFactsJson: JSON.stringify({ loShuGrid, majorStrength }),
      paymentStatus: input.paymentId ? "paid" : "free",
      paymentId: input.paymentId,
      amountPaid: input.amountPaid ?? 99,
      reportStatus: "generating",
      aiStatus: "pending",
      aiPromptVersion: AI_REPORT_SCHEMA_VERSION,
      methodologyVersion: METHODOLOGY_VERSION,
    },
  });

  try {
    const aiResult = await generateAIReport({
      client: {
        name: input.name,
        dateOfBirth: input.dateOfBirth,
        focusArea: input.focusArea,
        question: input.question,
      },
      core,
      monthlyForecast,
    });

    const reportData: ReportData = {
      client: {
        name: input.name,
        dob: input.dateOfBirth,
        focusArea: input.focusArea,
        question: input.question,
        reportId: reportRecord.id,
        generatedAt: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      },
      core,
      monthlyForecast,
      aiContent: aiResult.content,
      loShuGrid,
      basicContent,
    };

    const pdfBuffer = await renderToBuffer(
      React.createElement(NumerologyReportDocument, { data: reportData }) as never
    );
    const fileName = `${reportRecord.id}.pdf`;
    const filePath = path.join(REPORTS_DIR, fileName);
    fs.writeFileSync(filePath, pdfBuffer);
    const pdfBase64 = pdfBuffer.toString("base64");

    await db.report.update({
      where: { id: reportRecord.id },
      data: {
        reportStatus: "generated",
        pdfPath: filePath,
        pdfBytes: pdfBase64,
        generatedAt: new Date(),
        aiContentJson: JSON.stringify(aiResult.content),
        aiModel: aiResult.model,
        aiStatus: aiResult.status,
        aiGeneratedAt: new Date(),
        aiInputTokens: aiResult.inputTokens,
        aiOutputTokens: aiResult.outputTokens,
      },
    });

    return {
      reportId: reportRecord.id,
      pdfPath: filePath,
      pdfUrl: `/reports/${fileName}`,
      core,
      aiStatus: aiResult.status,
      aiModel: aiResult.model,
    };
  } catch (error) {
    await db.report.update({
      where: { id: reportRecord.id },
      data: { reportStatus: "failed", aiStatus: "failed" },
    });
    throw error;
  }
}

export async function getReport(reportId: string) {
  const coachId = await getNumerologyCoachId();
  return db.report.findFirst({ where: { id: reportId, client: { coachId } }, include: { client: true } });
}

export async function streamReportPdf(reportId: string): Promise<Buffer | null> {
  const report = await getReport(reportId);
  if (report?.pdfBytes) {
    return Buffer.from(report.pdfBytes, "base64");
  }
  // Fallback: filesystem (local dev cache)
  if (report?.pdfPath && fs.existsSync(report.pdfPath)) {
    return fs.readFileSync(report.pdfPath);
  }
  return null;
}
