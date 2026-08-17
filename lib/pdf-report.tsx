/* eslint-disable jsx-a11y/alt-text, react/no-unescaped-entities */
import React from "react";
import path from "path";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { CoreNumbers, MonthlyForecast } from "./numerology-engine";
import { LIFE_PATH_TITLES, PERSONAL_YEAR_THEMES } from "./numerology-engine";
import type { Interpretation } from "./interpretations";
import {
  LIFE_PATH_INTERPRETATIONS,
  PERSONAL_YEAR_INTERPRETATIONS,
} from "./interpretations";
import type { AIReportContent } from "./ai/report-schema";
import type { LoShuResult } from "./lo-shu";
import type { BasicReportContent } from "./interpretations-loshu";

const LOCKED_GRID_IMAGE_URL =
  "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSmE1MKyJA6khmKCCCwFkxlx_ylwI0sm4j4TGRvOV74OeFhRjw1dJGLv3OOVBOngZGGZPFwL0DTcP3LQPI";

// ─── FONTS (local, no CDN dependency) ────────────────────────────────────────
const FONTS_DIR = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Playfair",
  fonts: [
    { src: path.join(FONTS_DIR, "PlayfairDisplay-Regular.ttf"), fontWeight: "normal", fontStyle: "normal" },
    { src: path.join(FONTS_DIR, "PlayfairDisplay-Bold.ttf"),    fontWeight: "bold",   fontStyle: "normal" },
    { src: path.join(FONTS_DIR, "PlayfairDisplay-Regular.ttf"), fontWeight: "normal", fontStyle: "italic" },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(FONTS_DIR, "Inter-Regular.ttf"), fontWeight: "normal" },
  ],
});

// ─── COLOURS ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#0B0D1A",
  bgCard: "#13162C",
  bgLight: "#1A1E3A",
  gold: "#D4AF37",
  goldLight: "#F3DE8A",
  cream: "#F6F1E7",
  lav: "#AAA6C4",
  divider: "#2A2E50",
  red: "#C0392B",
  green: "#27AE60",
  purple: "#7B2D8B",
  white: "#FFFFFF",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    backgroundColor: C.bg,
    fontFamily: "Inter",
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },

  // ── cover ──
  coverPage: {
    backgroundColor: C.bg,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 48,
  },
  coverEyebrow: {
    fontSize: 9,
    letterSpacing: 3,
    color: C.gold,
    textTransform: "uppercase",
    marginBottom: 24,
    fontFamily: "Inter",
  },
  coverName: {
    fontFamily: "Playfair",
    fontSize: 40,
    color: C.cream,
    textAlign: "center",
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 11,
    color: C.lav,
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 1.6,
  },
  coverNumberBox: {
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 36,
    alignItems: "center",
    marginBottom: 48,
  },
  coverNumberLabel: {
    fontSize: 9,
    color: C.lav,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  coverNumber: {
    fontFamily: "Playfair",
    fontSize: 72,
    color: C.gold,
    lineHeight: 1,
  },
  coverNumberTitle: {
    fontFamily: "Playfair",
    fontSize: 16,
    color: C.goldLight,
    marginTop: 6,
  },
  coverDivider: {
    height: 1,
    backgroundColor: C.gold,
    width: 60,
    marginVertical: 24,
    opacity: 0.4,
  },
  coverMeta: {
    fontSize: 9,
    color: C.lav,
    textAlign: "center",
    lineHeight: 1.7,
  },
  coverGold: {
    color: C.gold,
  },

  // ── page chrome ──
  innerPage: {
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 44,
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  pageHeaderBrand: {
    fontFamily: "Playfair",
    fontSize: 11,
    color: C.gold,
    letterSpacing: 1,
  },
  pageHeaderClient: {
    fontSize: 9,
    color: C.lav,
  },

  // ── section headings ──
  sectionEyebrow: {
    fontSize: 8,
    letterSpacing: 3,
    color: C.gold,
    textTransform: "uppercase",
    marginBottom: 6,
    fontFamily: "Inter",
  },
  sectionTitle: {
    fontFamily: "Playfair",
    fontSize: 24,
    color: C.cream,
    marginBottom: 16,
    lineHeight: 1.2,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: C.divider,
    marginVertical: 20,
  },

  // ── body text ──
  body: {
    fontSize: 10,
    color: C.lav,
    lineHeight: 1.8,
    marginBottom: 10,
  },
  bodyWhite: {
    fontSize: 10,
    color: C.cream,
    lineHeight: 1.8,
    marginBottom: 10,
  },

  // ── number callout ──
  numberCallout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.bgCard,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: C.gold,
  },
  numberCalloutBig: {
    fontFamily: "Playfair",
    fontSize: 48,
    color: C.gold,
    marginRight: 16,
    lineHeight: 1,
  },
  numberCalloutInfo: {
    flex: 1,
  },
  numberCalloutTitle: {
    fontFamily: "Playfair",
    fontSize: 15,
    color: C.cream,
    marginBottom: 3,
  },
  numberCalloutSub: {
    fontSize: 9,
    color: C.lav,
    lineHeight: 1.5,
  },

  // ── two-col layout ──
  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  col: {
    flex: 1,
  },

  // ── card ──
  card: {
    backgroundColor: C.bgCard,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "Playfair",
    fontSize: 11,
    color: C.gold,
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 9,
    color: C.lav,
    lineHeight: 1.7,
  },

  // ── Lo Shu teaser ──
  lockedImage: {
    width: 220,
    height: 126,
    objectFit: "cover",
    alignSelf: "center",
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.gold,
  },
  secretCallout: {
    backgroundColor: C.bgCard,
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 10,
    padding: 18,
    marginTop: 8,
    marginBottom: 16,
  },
  secretCta: {
    backgroundColor: C.gold,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: C.bg,
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },

  // ── bullet list ──
  bulletRow: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 14,
    fontSize: 14,
    color: C.gold,
    lineHeight: 1.3,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: C.lav,
    lineHeight: 1.6,
  },

  // ── tags ──
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  tag: {
    backgroundColor: C.bgLight,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: C.divider,
  },
  tagText: {
    fontSize: 8,
    color: C.lav,
  },
  tagGold: {
    borderColor: C.gold,
  },
  tagGoldText: {
    fontSize: 8,
    color: C.gold,
  },

  // ── monthly row ──
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.bgCard,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  monthNum: {
    fontFamily: "Playfair",
    fontSize: 20,
    color: C.gold,
    width: 32,
  },
  monthName: {
    fontSize: 10,
    color: C.cream,
    width: 80,
    fontWeight: "bold",
  },
  monthTheme: {
    flex: 1,
    fontSize: 8,
    color: C.lav,
    lineHeight: 1.5,
  },
  monthBadge: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  monthBadgeHigh: {
    backgroundColor: "#27AE6020",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  monthBadgeMed: {
    backgroundColor: "#D4AF3720",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  monthBadgeLow: {
    backgroundColor: "#AAA6C420",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  monthBadgeText: {
    fontSize: 7,
    color: C.lav,
  },

  // ── affirmation ──
  affirmation: {
    borderLeftWidth: 2,
    borderLeftColor: C.gold,
    paddingLeft: 12,
    marginBottom: 10,
  },
  affirmationText: {
    fontFamily: "Playfair",
    fontSize: 11,
    color: C.goldLight,
    lineHeight: 1.6,
  },

  // ── lucky number chips ──
  luckyChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: C.gold,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  luckyChipText: {
    fontFamily: "Playfair",
    fontSize: 18,
    color: C.gold,
  },

  // ── numbers overview grid ──
  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  overviewCell: {
    width: "18.5%",
    backgroundColor: C.bgCard,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  overviewCellGold: {
    borderWidth: 1,
    borderColor: C.gold,
  },
  overviewCellNum: {
    fontFamily: "Playfair",
    fontSize: 28,
    color: C.gold,
    lineHeight: 1,
  },
  overviewCellLabel: {
    fontSize: 7,
    color: C.lav,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 1.4,
  },

  // ── footer ──
  pageFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  footerText: {
    fontSize: 7,
    color: C.divider,
  },
});

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Bullet({ text }: { text: string }) {
  return (
    <View style={S.bulletRow}>
      <Text style={S.bulletDot}>•</Text>
      <Text style={S.bulletText}>{text}</Text>
    </View>
  );
}

function PageChrome({
  clientName,
  section,
  children,
}: {
  clientName: string;
  section: string;
  children: React.ReactNode;
}) {
  return (
    <Page size="A4" style={S.page}>
      <View style={S.innerPage}>
        <View style={S.pageHeader}>
          <Text style={S.pageHeaderBrand}>AURA · Personal Numerology Report</Text>
          <Text style={S.pageHeaderClient}>
            {clientName} · {section}
          </Text>
        </View>
        {children}
        <View style={S.pageFooter}>
          <Text style={S.footerText}>Confidential — prepared exclusively for {clientName}</Text>
          <Text style={S.footerText}>
            © {new Date().getFullYear()} Vinod Numerology | numerologywithvinod.com
          </Text>
        </View>
      </View>
    </Page>
  );
}

// ─── REPORT DATA TYPE ─────────────────────────────────────────────────────────

export interface ReportData {
  client: {
    name: string;
    dob: string;
    focusArea?: string;
    question?: string;
    reportId: string;
    generatedAt: string;
  };
  core: CoreNumbers;
  monthlyForecast: MonthlyForecast[];
  aiContent?: AIReportContent;
  loShuGrid?: LoShuResult;
  basicContent?: BasicReportContent;
}

// ─── DOCUMENT ─────────────────────────────────────────────────────────────────

export function NumerologyReportDocument({ data }: { data: ReportData }) {
  const { client, core, monthlyForecast, aiContent, basicContent } = data;

  const lpInterp: Interpretation =
    LIFE_PATH_INTERPRETATIONS[core.lifePath] ??
    LIFE_PATH_INTERPRETATIONS[1];
  const pyInterp: Interpretation =
    PERSONAL_YEAR_INTERPRETATIONS[core.personalYear] ??
    PERSONAL_YEAR_INTERPRETATIONS[1];

  const lpTitle = LIFE_PATH_TITLES[core.lifePath] ?? "The Seeker";
  const pyTheme = PERSONAL_YEAR_THEMES[core.personalYear] ?? "A Year of Transformation";

  const firstName = client.name.split(" ")[0];

  return (
    <Document
      title={`Personal Numerology Report — ${client.name}`}
      author="Vinod Numerology"
      subject="Personalised Numerological Reading"
    >
      {/* ── PAGE 1: COVER ───────────────────────────────────────────────── */}
      <Page size="A4" style={S.page}>
        <View style={S.coverPage}>
          <Text style={S.coverEyebrow}>Personal Numerology Report</Text>

          <Text style={S.coverName}>{client.name}</Text>
          <Text style={S.coverSubtitle}>
            Prepared with precision and care{"\n"}
            using separate Western Pythagorean and Vedic/Chaldean perspectives
          </Text>

          <View style={S.coverNumberBox}>
            <Text style={S.coverNumberLabel}>Life Path Number</Text>
            <Text style={S.coverNumber}>{core.lifePath}</Text>
            <Text style={S.coverNumberTitle}>{lpTitle}</Text>
          </View>

          <View style={S.coverDivider} />

          <Text style={S.coverMeta}>
            <Text style={S.coverGold}>Date of Birth: </Text>
            {client.dob}
            {"   "}
            <Text style={S.coverGold}>Focus: </Text>
            {client.focusArea ?? "Personal Growth"}
            {"\n"}
            <Text style={S.coverGold}>Report Generated: </Text>
            {client.generatedAt}
            {"   "}
            <Text style={S.coverGold}>ID: </Text>
            {client.reportId}
          </Text>
        </View>
      </Page>

      {/* ── PAGE 2: PERSONAL LETTER ─────────────────────────────────────── */}
      {aiContent && (
        <PageChrome clientName={client.name} section="A Personal Note">
          <Text style={S.sectionEyebrow}>A Note For You</Text>
          <Text style={S.sectionTitle}>Read This Slowly</Text>
          <View style={[S.card, { borderLeftWidth: 3, borderLeftColor: C.gold, padding: 20 }]}>
            <Text style={[S.bodyWhite, { fontFamily: "Playfair", fontSize: 14, lineHeight: 1.8 }]}>
              {aiContent.openingLetter}
            </Text>
          </View>
          <View style={S.sectionDivider} />
          <Text style={S.sectionEyebrow}>Your Profile In One View</Text>
          <Text style={S.bodyWhite}>{aiContent.profileSynthesis}</Text>
          <View style={S.sectionDivider} />
          <Text style={S.body}>
            This report combines fixed calculations with a personalised editorial reading. The numbers
            are calculated by the AURA engine; the narrative is designed to help you reflect on those
            patterns in the context of your focus and question.
          </Text>
        </PageChrome>
      )}

      {/* ── PAGE 2: NUMBERS AT A GLANCE ─────────────────────────────────── */}
      <PageChrome clientName={client.name} section="Your Core Numbers">
        <Text style={S.sectionEyebrow}>Your Cosmic Blueprint</Text>
        <Text style={S.sectionTitle}>Numbers at a Glance</Text>

        <Text style={S.body}>
          Every soul enters this world carrying a unique numerical blueprint. The five core numbers below
          were calculated from your exact date of birth and full name — the two most precise spiritual
          signatures you carry. Together they form a complete picture of who you are, what you are here
          to do, and what this year holds for you.
        </Text>

        <View style={S.overviewGrid}>
          {[
            { n: core.lifePath, label: "Life Path", sub: lpTitle },
            { n: core.expression, label: "Expression", sub: "Your Destiny" },
            { n: core.soulUrge, label: "Soul Urge", sub: "Heart's Desire" },
            { n: core.personality, label: "Personality", sub: "How You Appear" },
            { n: core.personalYear, label: "Personal Year", sub: pyTheme.replace("A Year of ", "") },
          ].map(({ n, label, sub }) => (
            <View
              key={label}
              style={[
                S.overviewCell,
                label === "Life Path" ? S.overviewCellGold : {},
              ]}
            >
              <Text style={S.overviewCellNum}>{n}</Text>
              <Text style={S.overviewCellLabel}>
                {label}{"\n"}
                <Text style={{ color: C.gold, fontSize: 7 }}>{sub}</Text>
              </Text>
            </View>
          ))}
        </View>

        <View style={S.sectionDivider} />

        {/* Lucky Numbers */}
        <Text style={S.sectionEyebrow}>Your Lucky Numbers</Text>
        <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 16 }}>
          {core.luckyNumbers.map((n) => (
            <View key={n} style={S.luckyChip}>
              <Text style={S.luckyChipText}>{n}</Text>
            </View>
          ))}
        </View>
        <Text style={S.body}>
          These numbers carry the combined frequency of your Life Path, Expression, Personal Year, and
          Soul Urge. When they appear in dates, addresses, phone numbers, or any significant context,
          consider them confirmatory signals — you are aligned.
        </Text>

        <View style={S.sectionDivider} />

        {/* How the numbers were calculated */}
        <Text style={S.sectionEyebrow}>Calculation Transparency</Text>
        <View style={S.row}>
          <View style={S.col}>
            <View style={S.card}>
              <Text style={S.cardTitle}>Life Path</Text>
              <Text style={S.cardBody}>
                Day + Month + Year of birth, each component reduced independently.
                DOB: {client.dob}
              </Text>
            </View>
            <View style={S.card}>
              <Text style={S.cardTitle}>Expression</Text>
              <Text style={S.cardBody}>
                All letters of your full birth name converted using the Western
                Pythagorean chart. The Vedic Chaldean name number is shown separately.
              </Text>
            </View>
          </View>
          <View style={S.col}>
            <View style={S.card}>
              <Text style={S.cardTitle}>Soul Urge</Text>
              <Text style={S.cardBody}>
                Vowels only from your full birth name, summed and reduced.
                Reveals your deepest, most private motivations.
              </Text>
            </View>
            <View style={S.card}>
              <Text style={S.cardTitle}>Personal Year</Text>
              <Text style={S.cardBody}>
                Birth day + Birth month + Current year, reduced. Changes each
                birthday. Current year: {new Date().getFullYear()}.
              </Text>
            </View>
          </View>
        </View>
      </PageChrome>

      {/* ── PAGE 3: LIFE PATH ────────────────────────────────────────────── */}
      <PageChrome clientName={client.name} section="Life Path Analysis">
        <Text style={S.sectionEyebrow}>Part One — Your Core Purpose</Text>
        <Text style={S.sectionTitle}>Life Path {core.lifePath}: {lpTitle}</Text>

        <View style={S.numberCallout}>
          <Text style={S.numberCalloutBig}>{core.lifePath}</Text>
          <View style={S.numberCalloutInfo}>
            <Text style={S.numberCalloutTitle}>{lpTitle}</Text>
            <Text style={S.numberCalloutSub}>{lpInterp.summary}</Text>
          </View>
        </View>

        <Text style={S.bodyWhite}>
          {firstName}, {aiContent?.lifePathReading || lpInterp.fullText.slice(0, 900)}
        </Text>
      </PageChrome>

      {/* ── PAGE 4: LIFE PATH (CONTINUED) ───────────────────────────────── */}
      <PageChrome clientName={client.name} section="Life Path — Strengths & Guidance">
        <Text style={S.sectionEyebrow}>Life Path {core.lifePath} — Continued</Text>
        <Text style={S.sectionTitle}>Strengths, Challenges & Guidance</Text>

        <Text style={S.body}>{aiContent ? lpInterp.summary : lpInterp.fullText.slice(900)}</Text>

        <View style={S.sectionDivider} />

        <View style={S.row}>
          <View style={S.col}>
            <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>Your Strengths</Text>
            {lpInterp.strengths.map((s) => (
              <Bullet key={s} text={s} />
            ))}
          </View>
          <View style={S.col}>
            <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>Your Challenges</Text>
            {lpInterp.challenges.map((c) => (
              <Bullet key={c} text={c} />
            ))}
          </View>
        </View>

        <View style={S.sectionDivider} />

        <View style={S.card}>
          <Text style={S.cardTitle}>Career Guidance</Text>
          <Text style={S.cardBody}>{aiContent?.focusAreaReading || lpInterp.careerGuide}</Text>
        </View>

        <View style={S.card}>
          <Text style={S.cardTitle}>Love & Relationships</Text>
          <Text style={S.cardBody}>{aiContent?.expressionReading || lpInterp.loveGuide}</Text>
        </View>

        <View style={S.card}>
          <Text style={S.cardTitle}>Health & Wellbeing</Text>
          <Text style={S.cardBody}>{aiContent?.personalityReading || lpInterp.healthNotes}</Text>
        </View>
      </PageChrome>

      {/* ── PAGE 5: EXPRESSION + SOUL URGE ──────────────────────────────── */}
      <PageChrome clientName={client.name} section="Expression & Soul Urge">
        <Text style={S.sectionEyebrow}>Part Two — How You Express</Text>
        <Text style={S.sectionTitle}>Expression Number {core.expression}</Text>

        <View style={S.numberCallout}>
          <Text style={S.numberCalloutBig}>{core.expression}</Text>
          <View style={S.numberCalloutInfo}>
            <Text style={S.numberCalloutTitle}>Your Destiny Number</Text>
            <Text style={S.numberCalloutSub}>
              Calculated from your full birth name, this number reveals the abilities
              and talents you were given to develop and share in this lifetime.
            </Text>
          </View>
        </View>

        <Text style={S.body}>{aiContent?.expressionReading || `Your Expression number ${core.expression} speaks to how you are naturally built to contribute to the world. It complements your Life Path by describing the tools you have been given to walk that path.`}</Text>

        <View style={S.sectionDivider} />

        <Text style={S.sectionEyebrow}>Part Three — Your Heart's Desire</Text>
        <Text style={S.sectionTitle}>Soul Urge Number {core.soulUrge}</Text>

        <View style={S.numberCallout}>
          <Text style={S.numberCalloutBig}>{core.soulUrge}</Text>
          <View style={S.numberCalloutInfo}>
            <Text style={S.numberCalloutTitle}>What You Truly Seek</Text>
            <Text style={S.numberCalloutSub}>
              Derived from the vowels of your full birth name — the vowels carry the soul's breath.
              This number is your most private truth: what you want when no one is watching.
            </Text>
          </View>
        </View>

        <Text style={S.body}>{aiContent?.soulUrgeReading || `Your Soul Urge ${core.soulUrge} reveals the deepest motivation beneath your visible choices. When your outer life respects this inner number, your decisions can feel more grounded and fulfilling.`}</Text>

        <View style={S.sectionDivider} />

        {/* Vedic Notes */}
        <View style={{ backgroundColor: "#1A1E3A", borderRadius: 8, padding: 16 }}>
          <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>Vedic Insight — Life Path {core.lifePath}</Text>
          <Text style={S.body}>{aiContent?.westernVedicIntegration || lpInterp.vedicNotes}</Text>
        </View>
      </PageChrome>

      {/* ── PAGE 6: PERSONAL YEAR ────────────────────────────────────────── */}
      <PageChrome clientName={client.name} section="Personal Year Forecast">
        <Text style={S.sectionEyebrow}>Part Four — Your {new Date().getFullYear()} Forecast</Text>
        <Text style={S.sectionTitle}>Personal Year {core.personalYear}</Text>
        <Text style={[S.sectionTitle, { fontSize: 16, marginTop: -10, marginBottom: 20, color: C.goldLight }]}>
          {pyTheme}
        </Text>

        <View style={S.numberCallout}>
          <Text style={S.numberCalloutBig}>{core.personalYear}</Text>
          <View style={S.numberCalloutInfo}>
            <Text style={S.numberCalloutTitle}>{pyInterp.title}</Text>
            <Text style={S.numberCalloutSub}>{pyInterp.summary}</Text>
          </View>
        </View>

        <Text style={S.bodyWhite}>{aiContent?.personalYearReading || pyInterp.fullText.slice(0, 800)}</Text>

        <View style={S.sectionDivider} />

        <View style={S.row}>
          <View style={S.col}>
            <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>This Year's Strengths</Text>
            {pyInterp.strengths.map((s) => (
              <Bullet key={s} text={s} />
            ))}
          </View>
          <View style={S.col}>
            <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>This Year's Challenges</Text>
            {pyInterp.challenges.map((c) => (
              <Bullet key={c} text={c} />
            ))}
          </View>
        </View>

        <View style={S.sectionDivider} />

        <View style={S.row}>
          <View style={S.col}>
            <View style={S.card}>
              <Text style={S.cardTitle}>Career This Year</Text>
              <Text style={S.cardBody}>{pyInterp.careerGuide}</Text>
            </View>
          </View>
          <View style={S.col}>
            <View style={S.card}>
              <Text style={S.cardTitle}>Love & Relationships This Year</Text>
              <Text style={S.cardBody}>{pyInterp.loveGuide}</Text>
            </View>
          </View>
        </View>
      </PageChrome>

      {/* ── PAGE 7: MONTHLY FORECAST (Jan–Jun) ──────────────────────────── */}
      <PageChrome clientName={client.name} section="12-Month Forecast">
        <Text style={S.sectionEyebrow}>Part Five — Your Monthly Roadmap</Text>
        <Text style={S.sectionTitle}>12-Month Forecast {new Date().getFullYear()}</Text>
        <Text style={S.body}>
          Each month carries its own energy, shaped by your Personal Year number and your individual birth
          cycle. Use these themes as navigation tools — they indicate the quality of energy available, not
          outcomes that are fixed.
        </Text>

        {monthlyForecast.slice(0, 6).map((m) => (
          <View key={m.month} style={S.monthRow}>
            <Text style={S.monthNum}>{m.personalMonth}</Text>
            <Text style={S.monthName}>{m.month}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, color: C.cream, marginBottom: 2 }}>{m.theme}</Text>
              <Text style={S.monthTheme}>{m.focus}</Text>
            </View>
            <View style={S.monthBadge}>
              <View
                style={
                  m.energy === "high"
                    ? S.monthBadgeHigh
                    : m.energy === "low"
                    ? S.monthBadgeLow
                    : S.monthBadgeMed
                }
              >
                <Text style={S.monthBadgeText}>
                  {m.energy === "high" ? "HIGH" : m.energy === "low" ? "REST" : "MED"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </PageChrome>

      {/* ── PAGE 8: MONTHLY FORECAST (Jul–Dec) ──────────────────────────── */}
      <PageChrome clientName={client.name} section="12-Month Forecast Continued">
        <Text style={S.sectionEyebrow}>Your Monthly Roadmap — Continued</Text>
        <Text style={S.sectionTitle}>July through December</Text>

        {monthlyForecast.slice(6, 12).map((m) => (
          <View key={m.month} style={S.monthRow}>
            <Text style={S.monthNum}>{m.personalMonth}</Text>
            <Text style={S.monthName}>{m.month}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, color: C.cream, marginBottom: 2 }}>{m.theme}</Text>
              <Text style={S.monthTheme}>{m.focus}</Text>
            </View>
            <View style={S.monthBadge}>
              <View
                style={
                  m.energy === "high"
                    ? S.monthBadgeHigh
                    : m.energy === "low"
                    ? S.monthBadgeLow
                    : S.monthBadgeMed
                }
              >
                <Text style={S.monthBadgeText}>
                  {m.energy === "high" ? "HIGH" : m.energy === "low" ? "REST" : "MED"}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={S.sectionDivider} />

        {/* Best months */}
        <Text style={[S.sectionEyebrow, { marginBottom: 10 }]}>
          Your Power Months This Year
        </Text>
        <View style={S.row}>
          <View style={S.col}>
            <View style={S.card}>
              <Text style={S.cardTitle}>Highest Energy Months</Text>
              <Text style={S.cardBody}>
                {monthlyForecast
                  .filter((m) => m.energy === "high")
                  .map((m) => m.month)
                  .join(", ")}
                {"\n"}These months carry the most productive and expansive energy.
                Schedule launches, negotiations, and bold moves here.
              </Text>
            </View>
          </View>
          <View style={S.col}>
            <View style={S.card}>
              <Text style={S.cardTitle}>Rest & Reflection Months</Text>
              <Text style={S.cardBody}>
                {monthlyForecast
                  .filter((m) => m.energy === "low")
                  .map((m) => m.month)
                  .join(", ") || "None this year — good momentum throughout"}
                {"\n"}These months ask for inner work, study, and restoration rather than external push.
              </Text>
            </View>
          </View>
        </View>
      </PageChrome>

      {/* ── PAGE 9: LUCKY NUMBERS + GUIDANCE ───────────────────────────── */}
      <PageChrome clientName={client.name} section="Lucky Numbers & Daily Guidance">
        <Text style={S.sectionEyebrow}>Part Six — Your Personal Frequency</Text>
        <Text style={S.sectionTitle}>Lucky Numbers & Alignment</Text>

        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {core.luckyNumbers.map((n) => (
            <View key={n} style={S.luckyChip}>
              <Text style={S.luckyChipText}>{n}</Text>
            </View>
          ))}
        </View>

        <Text style={S.body}>
          Your lucky numbers are derived from the harmonic interplay of your Life Path {core.lifePath},
          Expression {core.expression}, Personal Year {core.personalYear}, and Soul Urge {core.soulUrge}.
          When these numbers appear — in dates, prices, addresses, flight numbers, or any significant
          context — treat them as confirmatory alignment signals.
        </Text>

        <View style={S.sectionDivider} />

        <View style={S.row}>
          <View style={S.col}>
            <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>Lucky Colours</Text>
            <View style={S.tagRow}>
              {lpInterp.colors.map((c) => (
                <View key={c} style={[S.tag, S.tagGold]}>
                  <Text style={S.tagGoldText}>{c}</Text>
                </View>
              ))}
            </View>
            <Text style={[S.body, { marginTop: 8 }]}>
              Wearing or surrounding yourself with these colours strengthens your
              Life Path {core.lifePath} vibration.
            </Text>
          </View>
          <View style={S.col}>
            <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>Aligned Gemstones</Text>
            <View style={S.tagRow}>
              {lpInterp.gemstones.map((g) => (
                <View key={g} style={S.tag}>
                  <Text style={S.tagText}>{g}</Text>
                </View>
              ))}
            </View>
            <Text style={[S.body, { marginTop: 8 }]}>
              In Vedic numerology, these gemstones carry frequencies that
              harmonise with your core number's planetary ruler.
            </Text>
          </View>
        </View>

        <View style={S.sectionDivider} />

        <Text style={[S.sectionEyebrow, { marginBottom: 10 }]}>Daily Do's & Don'ts</Text>
        <View style={S.row}>
          <View style={S.col}>
            <Text style={{ fontSize: 9, color: C.green, marginBottom: 6 }}>Daily Do's</Text>
            {(lpInterp.dos ?? []).map((d) => (
              <View key={d} style={S.bulletRow}>
                <Text style={[S.bulletDot, { color: C.green, fontSize: 10 }]}>✓</Text>
                <Text style={S.bulletText}>{d}</Text>
              </View>
            ))}
          </View>
          <View style={S.col}>
            <Text style={{ fontSize: 9, color: C.red, marginBottom: 6 }}>Daily Don'ts</Text>
            {(lpInterp.donts ?? []).map((d) => (
              <View key={d} style={S.bulletRow}>
                <Text style={[S.bulletDot, { color: C.red, fontSize: 10 }]}>✗</Text>
                <Text style={S.bulletText}>{d}</Text>
              </View>
            ))}
          </View>
        </View>
      </PageChrome>

      {/* ── PAGE 10: FOCUS + QUESTION ────────────────────────────────────── */}
      {aiContent && (
        <PageChrome clientName={client.name} section="Your Focus & Question">
          <Text style={S.sectionEyebrow}>Part Seven — Personalised Guidance</Text>
          <Text style={S.sectionTitle}>{client.focusArea || "Your Current Focus"}</Text>
          <View style={[S.card, { borderLeftWidth: 3, borderLeftColor: C.gold }]}>
            <Text style={S.cardTitle}>Your focus reading</Text>
            <Text style={S.cardBody}>{aiContent.focusAreaReading}</Text>
          </View>

          <View style={S.sectionDivider} />
          <Text style={S.sectionEyebrow}>A Reflective Answer</Text>
          <Text style={S.sectionTitle}>Your Question</Text>
          <View style={S.card}>
            <Text style={S.cardTitle}>{client.question || "A question for your next chapter"}</Text>
            <Text style={S.cardBody}>{aiContent.questionAnswer}</Text>
          </View>

          <View style={S.sectionDivider} />
          <Text style={S.sectionEyebrow}>Your Action Plan</Text>
          {aiContent.actionPlan.map((action, index) => (
            <View key={action} style={S.bulletRow}>
              <Text style={S.bulletDot}>{index + 1}.</Text>
              <Text style={S.bulletText}>{action}</Text>
            </View>
          ))}
        </PageChrome>
      )}

      {/* ── PAGE 10: AFFIRMATIONS + NEXT STEPS ──────────────────────────── */}
      <PageChrome clientName={client.name} section="Affirmations & Next Steps">
        <Text style={S.sectionEyebrow}>Part Seven — Your Personal Practice</Text>
        <Text style={S.sectionTitle}>Affirmations for Life Path {core.lifePath}</Text>

        <Text style={S.body}>
          These affirmations were selected specifically for your Life Path {core.lifePath} —
          {lpTitle}. They are designed to address your core challenge while amplifying your core gift.
          Speak one of these aloud each morning, or write it in a journal each night, for 21 consecutive days.
          The repetition creates a neurological shift that the casual reading of inspiring words does not.
        </Text>

        <View style={{ marginTop: 12, marginBottom: 24 }}>
          {(aiContent?.affirmations || lpInterp.affirmations).map((a) => (
            <View key={a} style={S.affirmation}>
              <Text style={S.affirmationText}>"{a}"</Text>
            </View>
          ))}
        </View>

        <View style={S.sectionDivider} />

        <Text style={[S.sectionEyebrow, { marginBottom: 8 }]}>Your Next Steps</Text>

        <View style={S.card}>
          <Text style={S.cardTitle}>1. Book Your 15-Minute Session (₹999)</Text>
          <Text style={S.cardBody}>
            This report is the foundation. Your session is where everything becomes specific to your life —
            your actual questions, your specific timing, the decisions you are currently facing.
            Book at aura-numerology.com with the code from your confirmation email.
          </Text>
        </View>

        <View style={S.card}>
          <Text style={S.cardTitle}>2. Access Your AURA Daily Dashboard (Post-Session)</Text>
          <Text style={S.cardBody}>
            After your session, you'll receive access to the AURA AI dashboard — a personalised daily
            guidance system that calculates your Personal Day number each morning and delivers specific
            Do's, Don'ts, and insights calibrated to your exact numerological profile.
          </Text>
        </View>

        <View style={S.card}>
          <Text style={S.cardTitle}>3. Receive Your 12-Month Forecast PDF (Included Free)</Text>
          <Text style={S.cardBody}>
            Your session includes a detailed 12-month forecast built specifically around your
            Personal Year {core.personalYear} and monthly cycles — with specific timing for career
            moves, financial decisions, relationship investments, and ideal periods for rest.
          </Text>
        </View>

        <View style={S.sectionDivider} />

        <Text style={[S.body, { textAlign: "center", color: C.lav, fontSize: 9 }]}>
          This report was prepared personally using your exact birth data.{"\n"}
          No two reports are identical. This is your numerological truth, {firstName}.{"\n\n"}
          {"Report ID: "}
          {client.reportId}
          {" · Generated: "}
          {client.generatedAt}
        </Text>
      </PageChrome>

      {/* ── PAGE 11: VEDIC CORE PROFILE ──────────────────────────────────── */}
      {basicContent && (
        <PageChrome clientName={client.name} section="Vedic Core Profile">
          <Text style={S.sectionEyebrow}>Your Vedic Foundation</Text>
          <Text style={S.sectionTitle}>Driver &amp; Conductor</Text>
          <Text style={S.body}>
            These two numbers create the foundation of your personal Vedic numerology profile. Your Driver
            reflects the way your natural energy moves, while your Conductor reflects the larger direction
            your life is learning to express.
          </Text>

          <View style={S.row}>
            <View style={S.col}>
              <View style={S.numberCallout}>
                <Text style={S.numberCalloutBig}>{core.vedic.driver}</Text>
                <View style={S.numberCalloutInfo}>
                  <Text style={S.numberCalloutTitle}>Driver Number</Text>
                  <Text style={S.numberCalloutSub}>Your natural style, instincts, and first response to life.</Text>
                </View>
              </View>
            </View>
            <View style={S.col}>
              <View style={S.numberCallout}>
                <Text style={S.numberCalloutBig}>{core.vedic.conductor}</Text>
                <View style={S.numberCalloutInfo}>
                  <Text style={S.numberCalloutTitle}>Conductor Number</Text>
                  <Text style={S.numberCalloutSub}>Your broader life direction and long-term rhythm.</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[S.card, { borderLeftWidth: 3, borderLeftColor: C.gold, padding: 20 }]}>
            <Text style={[S.bodyWhite, { fontFamily: "Playfair", fontSize: 13, lineHeight: 1.85 }]}>
              {basicContent.coreProfile}
            </Text>
          </View>
        </PageChrome>
      )}

      {/* ── PAGE 12: ONE LO SHU STRENGTH ─────────────────────────────────── */}
      {basicContent && (
        <PageChrome clientName={client.name} section="One Major Strength">
          <Text style={S.sectionEyebrow}>A Personal Lo Shu Insight</Text>
          <Text style={S.sectionTitle}>One Major Strength</Text>
          <Text style={S.body}>
            Your date of birth contains a distinctive pattern of energy. We are revealing one positive
            signature from that pattern here — enough to recognise your natural power while keeping your
            complete personal map private for your one-to-one session.
          </Text>

          <View style={[S.card, { borderLeftWidth: 4, borderLeftColor: C.gold, padding: 22, marginTop: 12 }]}>
            <Text style={[S.sectionEyebrow, { marginBottom: 10 }]}>Your revealed strength</Text>
            <Text style={[S.sectionTitle, { fontSize: 22, color: C.goldLight }]}>
              {basicContent.majorStrength.label}
            </Text>
            <Text style={S.bodyWhite}>{basicContent.majorStrength.text}</Text>
          </View>

          <View style={S.sectionDivider} />
          <Text style={S.body}>
            This is one strength within a much larger energy map. Used consciously, it can become a practical
            advantage in the way you choose, communicate, build, and lead.
          </Text>
        </PageChrome>
      )}

      {/* ── PAGE 13: FINAL SECRET ────────────────────────────────────────── */}
      {basicContent && (
        <PageChrome clientName={client.name} section="Your Locked Blueprint">
          <Text style={S.sectionEyebrow}>The Final Secret</Text>
          <Text style={S.sectionTitle}>Your Complete Energy Map</Text>

          <View style={S.secretCallout}>
            <Text style={S.bodyWhite}>
              While your Driver and Conductor numbers reveal your foundation, they are only 20% of the picture.
              The true blueprint of your destiny lies in your complete Lo Shu Energy Map.
            </Text>

            <Text style={S.bodyWhite}>
              Based on our background calculations of your Date of Birth, our system has detected{" "}
              <Text style={{ color: C.goldLight, fontWeight: "bold" }}>{basicContent.missingCount} missing numbers</Text>{" "}
              in your personal grid.
            </Text>

            <Text style={S.bodyWhite}>
              Missing numbers represent karmic blockages. They are the invisible forces causing delays in your
              wealth, instability in your career, or friction in your relationships.
            </Text>

            <Text style={[S.bodyWhite, { fontWeight: "bold", color: C.goldLight, marginTop: 8 }]}>
              Your personalized grid is currently locked.
            </Text>

            <Image src={LOCKED_GRID_IMAGE_URL} style={S.lockedImage} />

            <Text style={[S.body, { fontSize: 7, textAlign: "center", color: C.gold }]}>
              {LOCKED_GRID_IMAGE_URL}
            </Text>

            <Text style={S.bodyWhite}>
              To unlock your exact missing numbers, understand your karmic blockages, and receive the specific
              remedies to balance your energy for maximum success, you need a master's eye.
            </Text>

            <Text style={S.secretCta}>
              [ CLICK HERE TO UNLOCK YOUR GRID - BOOK YOUR 15-MIN SESSION (₹999) ]
            </Text>
          </View>

          <Text style={[S.body, { textAlign: "center", fontSize: 8 }]}>Session booking: numerologywithvinod.com</Text>
        </PageChrome>
      )}
    </Document>
  );
}
