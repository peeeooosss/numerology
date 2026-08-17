export type SessionIntakeValues = {
  name: string;
  fullBirthName: string;
  currentName: string;
  dob: string;
  email: string;
  phone: string;
  focusArea: string;
  subFocusArea: string;
  question: string;
  desiredOutcome: string;
  additionalContext: string;
  scheduledAt: string;
  nameType: string;
  pronunciation: string;
  nameLanguage: string;
  usageContext: string;
  nameConcern: string;
  candidateNames: string;
  nameConstraints: string;
  mustPreserve: string;
  legalChange: string;
};

export const focusQuestions: Record<string, { label: string; prompts: string[] }> = {
  "Career direction": {
    label: "Career direction",
    prompts: ["Career transition", "Promotion or leadership", "New job decision", "Business or entrepreneurship", "Workplace conflict", "Education and skills", "Relocation for work", "Career timing"],
  },
  "Wealth & timing": {
    label: "Wealth & timing",
    prompts: ["Income growth", "Business launch", "Business expansion", "Investment timing", "Debt and financial pressure", "Property purchase", "Salary negotiation", "Financial stability"],
  },
  "Love & relationships": {
    label: "Love & relationships",
    prompts: ["Compatibility", "Marriage or commitment", "Communication problems", "Breakup or healing", "Relationship timing", "Long-distance relationship", "Family approval", "Moving in together"],
  },
  "Name correction": {
    label: "Name correction",
    prompts: ["Personal name", "Business name", "Brand name", "Spelling variation", "Signature", "Professional name", "Social media name", "Company launch"],
  },
  "Personal growth": {
    label: "Personal growth",
    prompts: ["Life purpose", "Confidence", "Decision clarity", "Habits", "Spiritual development", "Emotional patterns", "Discipline", "Self-expression"],
  },
  "Health guidance": {
    label: "Health guidance",
    prompts: ["Stress and burnout", "Energy and routine", "Sleep and rest", "Emotional wellbeing", "Lifestyle balance", "Recovery support", "Work-life balance", "Spiritual wellbeing"],
  },
};

export const focusAreas = Object.keys(focusQuestions);

export const initialSessionIntake: SessionIntakeValues = {
  name: "",
  fullBirthName: "",
  currentName: "",
  dob: "",
  email: "",
  phone: "",
  focusArea: focusAreas[0],
  subFocusArea: focusQuestions[focusAreas[0]].prompts[0],
  question: "",
  desiredOutcome: "",
  additionalContext: "",
  scheduledAt: "",
  nameType: "Personal name",
  pronunciation: "",
  nameLanguage: "",
  usageContext: "",
  nameConcern: "",
  candidateNames: "",
  nameConstraints: "",
  mustPreserve: "",
  legalChange: "",
};

export function formatDateOfBirth(value: string) {
  if (!value) return value;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
