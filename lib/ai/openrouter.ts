import { aiReportJsonSchema, aiReportContentSchema, type AIReportContent } from "./report-schema";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface OpenRouterResult {
  content: AIReportContent;
  model: string;
  inputTokens?: number;
  outputTokens?: number;
}

function getModel(primary = true): string {
  return primary
    ? process.env.OPENROUTER_MODEL || "openai/gpt-5"
    : process.env.OPENROUTER_FALLBACK_MODEL || "google/gemini-2.5-pro";
}

function requestTimeout(primary: boolean): number {
  const configured = primary
    ? process.env.OPENROUTER_PRIMARY_TIMEOUT_MS || process.env.OPENROUTER_TIMEOUT_MS
    : process.env.OPENROUTER_FALLBACK_TIMEOUT_MS || process.env.OPENROUTER_TIMEOUT_MS;
  const value = Number(configured || (primary ? 120_000 : 45_000));
  return Number.isFinite(value) ? value : 45_000;
}

function parseJsonContent(raw: string): unknown {
  const candidates = [
    raw.trim(),
    raw.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim(),
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      // Try the next representation.
    }
  }

  // Some providers prepend a short sentence despite JSON mode. Extract the
  // outermost object while still validating the complete object with Zod.
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start >= 0 && end > start) return JSON.parse(raw.slice(start, end + 1));

  throw new Error("OpenRouter returned invalid JSON");
}

export async function requestOpenRouterReport(
  systemPrompt: string,
  userPrompt: string,
  primary = true
): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.includes("YOUR_")) {
    throw new Error("OpenRouter API key is not configured");
  }

  const model = getModel(primary);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeout(primary));

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(process.env.NEXT_PUBLIC_APP_URL
          ? { "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL }
          : {}),
        "X-Title": "AURA Personal Numerology Report",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: Number(process.env.OPENROUTER_MAX_OUTPUT_TOKENS || 6_000),
        reasoning: { effort: "minimal" },
        response_format: {
          type: "json_schema",
          json_schema: aiReportJsonSchema,
        },
        provider: {
          require_parameters: true,
        },
      }),
      signal: controller.signal,
    });

    const payload = await response.json() as {
      error?: { message?: string };
      choices?: Array<{ message?: { content?: string | null } }>;
      model?: string;
      usage?: { prompt_tokens?: number; completion_tokens?: number };
    };

    if (!response.ok) {
      throw new Error(payload.error?.message || `OpenRouter request failed (${response.status})`);
    }

    const raw = payload.choices?.[0]?.message?.content;
    if (!raw) throw new Error("OpenRouter returned an empty response");

    const parsed = parseJsonContent(raw);
    const content = aiReportContentSchema.parse(parsed);
    return {
      content,
      model: payload.model || model,
      inputTokens: payload.usage?.prompt_tokens,
      outputTokens: payload.usage?.completion_tokens,
    };
  } finally {
    clearTimeout(timer);
  }
}
