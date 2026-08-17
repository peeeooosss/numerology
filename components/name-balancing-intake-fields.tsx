"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SessionIntakeValues } from "@/lib/session-intake";

type Props = {
  form: SessionIntakeValues;
  updateField: (field: keyof SessionIntakeValues, value: string) => void;
  idPrefix?: string;
  showPreferredTime?: boolean;
};

const nameTypes = ["Personal name", "Professional name", "Business or brand name", "Stage or public name", "Baby or child name", "Signature name"];

export function NameBalancingIntakeFields({ form, updateField, idPrefix = "name-balancing", showPreferredTime = true }: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gold/15 bg-gold/5 p-3 text-xs leading-relaxed text-lav">
        Enter the exact Roman/English spelling you want analyzed. Name Balancing is a reflective numerology consultation and does not guarantee personal, financial, health, legal, or business outcomes.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-birth-name`}>Full name at birth</Label>
          <Input id={`${idPrefix}-birth-name`} required value={form.fullBirthName} onChange={(event) => updateField("fullBirthName", event.target.value)} placeholder="As on birth certificate" />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-current-name`}>Current name used daily</Label>
          <Input id={`${idPrefix}-current-name`} required value={form.currentName} onChange={(event) => { updateField("currentName", event.target.value); updateField("name", event.target.value); }} placeholder="The name people call you" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-dob`}>Exact date of birth</Label>
          <Input id={`${idPrefix}-dob`} required type="date" value={form.dob} onChange={(event) => updateField("dob", event.target.value)} />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-type`}>Name type</Label>
          <select id={`${idPrefix}-type`} required value={form.nameType} onChange={(event) => updateField("nameType", event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream focus:border-gold/40 focus:outline-none">
            {nameTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-language`}>Language or cultural context</Label>
          <Input id={`${idPrefix}-language`} value={form.nameLanguage} onChange={(event) => updateField("nameLanguage", event.target.value)} placeholder="Hindi, English, Tamil..." />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-pronunciation`}>Preferred pronunciation</Label>
          <Input id={`${idPrefix}-pronunciation`} value={form.pronunciation} onChange={(event) => updateField("pronunciation", event.target.value)} placeholder="How should it sound?" />
        </div>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-usage`}>Where is this name used?</Label>
        <textarea id={`${idPrefix}-usage`} required rows={2} value={form.usageContext} onChange={(event) => updateField("usageContext", event.target.value)} placeholder="Legal documents, workplace, business, email, social media, signature..." className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-concern`}>Why are you considering Name Balancing?</Label>
        <textarea id={`${idPrefix}-concern`} required rows={3} value={form.nameConcern} onChange={(event) => updateField("nameConcern", event.target.value)} placeholder="Describe the decision, concern, or transition you want help with." className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-candidates`}>Candidate names or spellings</Label>
        <textarea id={`${idPrefix}-candidates`} rows={3} value={form.candidateNames} onChange={(event) => updateField("candidateNames", event.target.value)} placeholder="Enter up to five options, one per line. Leave blank if you want the Master to suggest options." className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-preserve`}>What must be preserved?</Label>
          <Input id={`${idPrefix}-preserve`} value={form.mustPreserve} onChange={(event) => updateField("mustPreserve", event.target.value)} placeholder="Family name, initials, meaning..." />
        </div>
        <div>
          <Label htmlFor={`${idPrefix}-legal`}>Can the name change legally?</Label>
          <select id={`${idPrefix}-legal`} value={form.legalChange} onChange={(event) => updateField("legalChange", event.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream focus:border-gold/40 focus:outline-none">
            <option value="">Not sure</option><option value="yes">Yes</option><option value="no">No, only daily/professional use</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-constraints`}>Practical constraints</Label>
        <textarea id={`${idPrefix}-constraints`} rows={2} value={form.nameConstraints} onChange={(event) => updateField("nameConstraints", event.target.value)} placeholder="Pronunciation, cultural meaning, syllables, domain availability, letters to avoid..." className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-outcome`}>What decision would make this useful?</Label>
        <textarea id={`${idPrefix}-outcome`} required rows={2} value={form.desiredOutcome} onChange={(event) => updateField("desiredOutcome", event.target.value)} placeholder="For example: choose between two spellings or understand whether a professional name fits my goals." className="w-full rounded-xl border border-white/10 bg-[#0d0f20] px-3 py-2 text-sm text-cream placeholder-lav/50 focus:border-gold/40 focus:outline-none" />
      </div>

      {showPreferredTime && (
        <div>
          <Label htmlFor={`${idPrefix}-time`}>Preferred time (optional)</Label>
          <Input id={`${idPrefix}-time`} type="datetime-local" value={form.scheduledAt} onChange={(event) => updateField("scheduledAt", event.target.value)} />
        </div>
      )}
    </div>
  );
}
