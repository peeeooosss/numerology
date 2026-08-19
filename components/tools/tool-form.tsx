"use client";

import { FormEvent, useState, useEffect } from "react";
import { ArrowRight, Loader2, LockKeyhole } from "lucide-react";
import type { ToolDefinition, ToolField, ToolSlug } from "@/lib/tools/tool-types";
import { useToolContext } from "@/lib/tools/tool-context";
import { trackToolEvent } from "@/lib/tools/analytics";

type Props = {
  tool: ToolDefinition;
  slug: ToolSlug;
};

const today = new Date().toISOString().slice(0, 10);

function fieldId(slug: string, name: string) {
  return `${slug}-${name}`;
}

export function ToolForm({ tool, slug }: Props) {
  const { setResult } = useToolContext();
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackToolEvent({ type: "tool_view", slug });
  }, [slug]);

  function setField(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      trackToolEvent({ type: "tool_calculate", slug });
      const response = await fetch("/api/tools/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...values }),
      });
      const payload = await response.json() as { success: boolean; result?: import("@/lib/tools/tool-types").ToolResult; error?: string };
      if (!response.ok || !payload.success || !payload.result) {
        throw new Error(payload.error || "Calculation failed.");
      }
      setResult(payload.result);
      trackToolEvent({ type: "tool_result", slug });
      window.setTimeout(() => {
        document.getElementById("tool-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Calculation failed.");
    } finally {
      setLoading(false);
    }
  }

  function renderField(field: ToolField) {
    const id = fieldId(slug, field.name);

    if (field.type === "select") {
      return (
        <div key={field.name}>
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-cream">
            {field.label}
          </label>
          <select
            id={id}
            required={field.required}
            value={values[field.name] ?? ""}
            onChange={(e) => setField(field.name, e.target.value)}
            className="h-12 w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 text-base text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            <option value="">Select…</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.name}>
          <label htmlFor={id} className="mb-2 block text-sm font-medium text-cream">
            {field.label}
          </label>
          <textarea
            id={id}
            required={field.required}
            maxLength={field.maxLength}
            value={values[field.name] ?? ""}
            onChange={(e) => setField(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 py-3 text-base text-cream outline-none placeholder:text-lav/70 focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
      );
    }

    return (
      <div key={field.name}>
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-cream">
          {field.label}
        </label>
        <input
          id={id}
          required={field.required}
          type={field.type}
          minLength={field.type === "text" ? 2 : undefined}
          maxLength={field.maxLength}
          max={field.type === "date" ? today : undefined}
          value={values[field.name] ?? ""}
          onChange={(e) => setField(field.name, e.target.value)}
          placeholder={field.placeholder}
          className="h-12 w-full rounded-xl border border-gold/20 bg-white/[.04] px-4 text-base text-cream outline-none placeholder:text-lav/70 focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gold/25 bg-[#101225]/90 p-6 shadow-cardglow sm:p-8">
      <p className="text-xs uppercase tracking-[.2em] text-gold">Free calculation</p>
      <h2 className="mt-3 font-display text-2xl text-cream">
        {tool.meta.title.replace(" Calculator", "").replace(" by Date of Birth", "")}
      </h2>
      <form onSubmit={submit} className="mt-7 space-y-5">
        {tool.fields.map(renderField)}
        {error && (
          <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-goldlite to-copper px-5 text-sm font-semibold text-midnight shadow-goldglow transition hover:brightness-110 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Calculating…
            </>
          ) : (
            <>
              Calculate
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="flex items-center justify-center gap-2 text-center text-xs text-lav">
          <LockKeyhole className="h-3.5 w-3.5 text-gold" />
          Free · No signup · Not stored
        </p>
      </form>
      {tool.privacyNote && (
        <p className="mt-4 text-center text-xs text-lav/70">{tool.privacyNote}</p>
      )}
    </div>
  );
}
