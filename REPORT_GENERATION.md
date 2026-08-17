# Report Generation

## Pipeline

1. The application calculates Western Pythagorean and Vedic/Chaldean values locally.
2. The canonical facts object is persisted with the report and is never delegated to AI.
3. GPT-5 receives only the client's facts, relevant Master's interpretations, focus area, and question.
4. OpenRouter must return the versioned structured JSON schema in `lib/ai/report-schema.ts`.
5. Zod and deterministic quality checks validate the response.
6. If OpenRouter is unavailable or fails validation, the Master's static library produces a complete fallback.
7. The validated content is rendered into the branded PDF template.
8. The final AI content and PDF path are persisted. A payment retry returns the existing report.

## Lo Shu Value Split

The ₹99 PDF keeps the existing Western/Vedic report pages and appends three deterministic pages:

- Driver and Conductor numbers with a positive two-paragraph profile.
- Exactly one positive Lo Shu strength, selected from a completed line or repeated digit.
- The Final Secret teaser showing only the missing-number count and a locked-grid call to action.

The PDF never displays the filled Lo Shu grid, the missing-number list, negative repeated-number interpretations,
or grid-specific remedies. After a ₹999 session is marked `completed`, the existing `DashboardAccess` entitlement
unlocks `/dashboard/lo-shu-blueprint`, which exposes the full grid, missing-number analysis, and personalised
grid remedies through `/api/dashboard/lo-shu`.

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Add `OPENROUTER_API_KEY` for AI-generated narratives. Leaving it empty intentionally uses the deterministic fallback.
3. Configure Razorpay test keys before enabling real checkout.
4. Run `npx prisma migrate dev`.
5. Run `npm run dev`.

## Methodology

Western values include Life Path, Expression, Soul Urge, and Personality numbers using the Pythagorean chart.

Vedic values include Driver, Conductor, and Chaldean Name Number. These are displayed as a separate perspective rather than averaged into an invented universal formula.

## AI Cost Controls

- The default model is `openai/gpt-5`.
- The fallback is `google/gemini-2.5-pro`.
- Output is limited to 6,000 tokens so the structured monthly sections can complete without truncation.
- GPT-5 has a 120-second timeout for reasoning; the fallback model has a 45-second timeout.
- AI is called only once for a successful report generation.
- The final content is stored in `Report.aiContentJson`.
- Repeated downloads never call OpenRouter again.

## Safety Rules

The model must not produce medical diagnoses, guaranteed financial outcomes, fear-based predictions, guaranteed relationship outcomes, or gemstone cures. Numerology is presented as reflective spiritual guidance, not scientific certainty or professional advice.
