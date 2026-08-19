type ToolAnalyticsEvent =
  | { type: "tool_view"; slug: string }
  | { type: "tool_calculate"; slug: string }
  | { type: "tool_result"; slug: string }
  | { type: "tool_cta_click"; slug: string; cta: string };

export function trackToolEvent(event: ToolAnalyticsEvent) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("tool-analytics", { detail: event })
  );

  if (typeof window.gtag === "function") {
    window.gtag("event", event.type, {
      event_category: "tools",
      event_label: event.slug,
      ...(event.type === "tool_cta_click" ? { cta_target: event.cta } : {}),
    });
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
