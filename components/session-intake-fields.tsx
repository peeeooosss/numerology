"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { focusQuestions, type SessionIntakeValues } from "@/lib/session-intake";

type Props = {
  form: SessionIntakeValues;
  updateField: (field: keyof SessionIntakeValues, value: string) => void;
  idPrefix?: string;
  showPreferredTime?: boolean;
};

export function SessionIntakeFields({ form, updateField, idPrefix = "session", showPreferredTime = true }: Props) {
  const focus = focusQuestions[form.focusArea] ?? focusQuestions["Career direction"];

  function updateFocus(value: string) {
    updateField("focusArea", value);
    updateField("subFocusArea", focusQuestions[value]?.prompts[0] ?? "");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-birth-name`}>Full name at birth</Label>
          <Input id={`${idPrefix}-birth-name`} required value={form.fullBirthName} onChange={(event) => updateField("fullBirthName", event.target.value)} placeholder="As on birth certificate" />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-daily-name`}>Current name used daily</Label>
          <Input id={`${idPrefix}-daily-name`} required value={form.currentName} onChange={(event) => { updateField("currentName", event.target.value); if (!form.name || form.name === form.currentName) updateField("name", event.target.value); }} placeholder="The name people call you" />
        </div>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-name`}>Booking name</Label>
        <Input id={`${idPrefix}-name`} required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your preferred name" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-dob`}>Exact date of birth</Label>
          <Input id={`${idPrefix}-dob`} required type="date" value={form.dob} onChange={(event) => updateField("dob", event.target.value)} />
        </div>
        {showPreferredTime && (
          <div>
            <Label htmlFor={`${idPrefix}-time`}>Preferred time (optional)</Label>
            <Input id={`${idPrefix}-time`} type="datetime-local" value={form.scheduledAt} onChange={(event) => updateField("scheduledAt", event.target.value)} />
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-email`}>Email (optional)</Label>
          <Input id={`${idPrefix}-email`} type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-phone`}>Phone (optional)</Label>
          <Input id={`${idPrefix}-phone`} type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+91 98765 43210" />
        </div>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-focus`}>Primary focus area</Label>
        <select id={`${idPrefix}-focus`} value={form.focusArea} onChange={(event) => updateFocus(event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream focus:border-gold/40 focus:outline-none">
          {Object.keys(focusQuestions).map((area) => <option key={area} value={area}>{area}</option>)}
        </select>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-subfocus`}>What would you like to focus on?</Label>
        <select id={`${idPrefix}-subfocus`} required value={form.subFocusArea} onChange={(event) => updateField("subFocusArea", event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream focus:border-gold/40 focus:outline-none">
          {focus.prompts.map((prompt) => <option key={prompt} value={prompt}>{prompt}</option>)}
        </select>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-question`}>Main question</Label>
        <textarea id={`${idPrefix}-question`} required rows={3} value={form.question} onChange={(event) => updateField("question", event.target.value)} placeholder="What would you like to discuss with the Master?" className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-outcome`}>Desired outcome (optional)</Label>
        <textarea id={`${idPrefix}-outcome`} rows={2} value={form.desiredOutcome} onChange={(event) => updateField("desiredOutcome", event.target.value)} placeholder="What clarity or decision would make this session useful?" className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-context`}>Additional context (optional)</Label>
        <textarea id={`${idPrefix}-context`} rows={2} value={form.additionalContext} onChange={(event) => updateField("additionalContext", event.target.value)} placeholder="Share any dates, choices, or background that would help the Master prepare." className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      {(form.focusArea === "Wealth & timing" || form.focusArea === "Health guidance") && (
        <p className="rounded-xl border border-gold/15 bg-gold/5 p-3 text-xs leading-relaxed text-lav">
          {form.focusArea === "Wealth & timing" ? "Numerology guidance is reflective and educational, not financial advice or a guarantee of investment results." : "Numerology guidance is reflective and educational, not medical advice, diagnosis, or treatment."}
        </p>
      )}
    </div>
  );
}
