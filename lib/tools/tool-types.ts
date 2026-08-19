export type ToolSlug =
  | "personal-day-calculator"
  | "name-comparison-calculator"
  | "numerology-compatibility-calculator"
  | "business-name-numerology-calculator"
  | "lucky-date-calculator"
  | "numerology-cycles-calculator"
  | "session-question-builder";

export type ToolPrimaryCta = "report" | "name-balance" | "consultation" | "free-analysis";

export interface ToolMeta {
  slug: ToolSlug;
  title: string;
  description: string;
  primaryKeyword: string;
  category: string;
  readingTime: string;
}

export interface ToolField {
  name: string;
  label: string;
  type: "text" | "date" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  options?: Array<{ value: string; label: string }>;
}

export interface ToolCalculationResult {
  primary: { label: string; value: string | number; subtitle?: string };
  formula: string;
  explanation: string;
  reflection?: string;
  limitation?: string;
  fields?: Array<{ label: string; value: string | number }>;
  sections?: Array<{ heading: string; content: string; items?: string[] }>;
}

export interface ToolResult {
  calculation: ToolCalculationResult;
  primaryCta: ToolPrimaryCta;
  primaryCtaLabel: string;
  secondaryCta?: ToolPrimaryCta;
  secondaryCtaLabel?: string;
  relatedArticles?: string[];
}

export interface ToolDefinition {
  meta: ToolMeta;
  fields: readonly ToolField[];
  disclaimer?: string;
  privacyNote?: string;
}

export interface PersonalDayInput {
  dateOfBirth: string;
  targetDate: string;
}

export interface NameComparisonInput {
  dateOfBirth: string;
  currentName: string;
  optionA: string;
  optionB: string;
  optionC?: string;
}

export interface CompatibilityInput {
  personAName: string;
  personADob: string;
  personBName: string;
  personBDob: string;
}

export interface BusinessNameInput {
  founderName: string;
  founderDob: string;
  businessCategory: string;
  candidateNames: string[];
}

export interface LuckyDateInput {
  dateOfBirth: string;
  targetDate: string;
  purpose?: string;
}

export interface CyclesInput {
  dateOfBirth: string;
}

export interface QuestionBuilderInput {
  concern: string;
  situation?: string;
}

export type ToolInput =
  | PersonalDayInput
  | NameComparisonInput
  | CompatibilityInput
  | BusinessNameInput
  | LuckyDateInput
  | CyclesInput
  | QuestionBuilderInput;
