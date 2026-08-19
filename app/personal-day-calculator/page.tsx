import type { Metadata } from "next";
import { ToolShell } from "@/components/tools/tool-shell";
import { ToolForm } from "@/components/tools/tool-form";
import { TOOL_DEFINITIONS } from "@/lib/tools/calculations";

const tool = TOOL_DEFINITIONS["personal-day-calculator"];
const siteUrl = "https://magicofnumbers.in";

export const metadata: Metadata = {
  title: tool.meta.title,
  description: tool.meta.description,
  alternates: { canonical: `${siteUrl}/${tool.meta.slug}` },
  openGraph: {
    type: "website",
    title: tool.meta.title,
    description: tool.meta.description,
    url: `${siteUrl}/${tool.meta.slug}`,
  },
};

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ToolForm tool={tool} slug="personal-day-calculator" />
    </ToolShell>
  );
}
