import type { CoreNumbers } from "./numerology-engine";
import type { LoShuResult, MajorStrength } from "./lo-shu";

export const DRIVER_INTERPRETATIONS: Record<number, string> = {
  1: "Your Driver 1 gives you a direct, pioneering presence. You are naturally inclined to initiate, make clear decisions, and create movement where others are still considering their options.",
  2: "Your Driver 2 gives you a perceptive, collaborative presence. You read people and situations with care, and your ability to bring balance can become one of your quietest forms of leadership.",
  3: "Your Driver 3 gives you a bright, expressive presence. Ideas, communication, and creative connection are natural channels through which you can lift the energy of the people around you.",
  4: "Your Driver 4 gives you a grounded, methodical presence. You are strongest when turning an intention into a dependable system, and people can trust the consistency you bring.",
  5: "Your Driver 5 gives you an adaptable, curious presence. You learn quickly, respond intelligently to change, and often see possibilities in situations that others experience as limitations.",
  6: "Your Driver 6 gives you a warm, responsible presence. You notice what needs care, value harmony, and have a natural instinct for creating environments where people can grow.",
  7: "Your Driver 7 gives you an observant, thoughtful presence. You look beneath the surface, value truth over noise, and can develop uncommon insight through reflection and study.",
  8: "Your Driver 8 gives you a capable, achievement-oriented presence. You understand responsibility, resources, and results, with the potential to turn ambition into tangible progress.",
  9: "Your Driver 9 gives you a generous, purposeful presence. You are moved by meaning, compassion, and the desire to make your effort matter beyond yourself.",
};

export const CONDUCTOR_INTERPRETATIONS: Record<number, string> = {
  1: "Your Conductor 1 points your larger life path toward independence and original action. Your progress becomes strongest when you trust your own direction while allowing the right people to contribute alongside you.",
  2: "Your Conductor 2 points your larger life path toward partnership, diplomacy, and emotional intelligence. Your greatest results often come through patient alignment rather than unnecessary force.",
  3: "Your Conductor 3 points your larger life path toward communication, creativity, and joyful contribution. Expression is not just a talent for you; it is one of the ways your life gains momentum.",
  4: "Your Conductor 4 points your larger life path toward structure, mastery, and lasting foundations. Your life rewards the steady work that turns a promising idea into something useful and enduring.",
  5: "Your Conductor 5 points your larger life path toward freedom, learning, and intelligent change. You are built to evolve, and your adaptability becomes most powerful when guided by a clear purpose.",
  6: "Your Conductor 6 points your larger life path toward service, responsibility, and meaningful relationships. Your influence grows when care is balanced with self-respect and healthy boundaries.",
  7: "Your Conductor 7 points your larger life path toward knowledge, inner clarity, and spiritual inquiry. Your discernment is a life asset, especially when you give it time to mature before acting.",
  8: "Your Conductor 8 points your larger life path toward authority, stewardship, and material accomplishment. You are invited to build success that is both visible and responsibly managed.",
  9: "Your Conductor 9 points your larger life path toward completion, compassion, and wider impact. Your perspective expands when personal achievement is connected to a contribution that helps others.",
};

export const LOSHU_PLANE_STRENGTHS: Record<string, string> = {
  "4-9-2": "This completed plane highlights an exceptional ability to connect discipline, vision, and practical judgement. You can see the larger direction while still respecting the steps required to make it real. When you commit to a goal, your strength is not only enthusiasm; it is the rare combination of order and foresight that helps an idea become a result.",
  "3-5-7": "This completed plane highlights an expressive mind with strong intuitive balance. You can bring together communication, adaptability, and thoughtful observation, which helps you understand both the message and the meaning beneath it. People may experience you as someone who can make complex ideas feel clear and human.",
  "8-1-6": "This completed plane highlights purposeful action, personal authority, and responsibility. You have a strong capacity to move from intention to leadership while keeping the effect of your choices in view. This gives you the potential to create progress that is both ambitious and protective of what matters.",
  "4-3-8": "This completed plane highlights practical intelligence and the ability to build through action. You can organise an idea, communicate it clearly, and carry it forward with persistence. Your advantage is the capacity to make progress visible instead of leaving good intentions in the planning stage.",
  "9-5-1": "This completed plane highlights a powerful flow between vision, centred judgement, and initiative. You can hold a meaningful purpose in mind while making the decisive first move. This combination supports confidence, influence, and the ability to inspire people around a clear direction.",
  "2-7-6": "This completed plane highlights emotional awareness, insight, and care. You can understand what people need while also noticing the deeper pattern behind a situation. This is a powerful strength for building trust, guiding others, and creating steady improvement without unnecessary drama.",
  "4-5-6": "This completed plane highlights a grounded ability to balance structure, judgement, and responsibility. You are capable of creating order without losing humanity, which helps you become a dependable decision-maker in both personal and professional settings.",
  "2-5-8": "This completed plane highlights the ability to balance sensitivity, discernment, and determined execution. You can listen deeply, assess wisely, and then act with conviction. That blend gives you a strong foundation for navigating people, pressure, and important decisions.",
};

export const LOSHU_REPEAT_STRENGTHS: Record<number, string> = {
  1: "Repeated 1 energy amplifies initiative, confidence, and the instinct to start. You carry a strong inner spark that helps you act before certainty is complete and become the person who creates the first opening.",
  2: "Repeated 2 energy amplifies sensitivity, cooperation, and relational intelligence. You can detect nuance quickly and use that awareness to create trust, alignment, and more thoughtful outcomes.",
  3: "Repeated 3 energy amplifies creativity, expression, and social brightness. Your voice can make ideas memorable and give other people permission to think more freely.",
  4: "Repeated 4 energy amplifies reliability, discipline, and construction. You have the stamina to organise complexity and keep improving a foundation until it can carry real weight.",
  5: "Repeated 5 energy amplifies adaptability, curiosity, and communication. You can move through changing conditions with speed while continuing to gather useful information.",
  6: "Repeated 6 energy amplifies care, responsibility, and the desire to improve the lives of others. You naturally notice how to make a space, team, or relationship feel more supported.",
  7: "Repeated 7 energy amplifies analysis, intuition, and the search for deeper truth. You can concentrate on what matters and recognise patterns that are easy for others to overlook.",
  8: "Repeated 8 energy amplifies ambition, resourcefulness, and executive strength. You have the potential to manage responsibility confidently and translate effort into measurable progress.",
  9: "Repeated 9 energy amplifies compassion, courage, and a wide perspective. You are able to connect personal experiences to a larger purpose and bring heart to meaningful action.",
};

export const LOSHU_MISSING_DETAILS: Record<number, { title: string; impact: string; remedies: string[] }> = {
  1: { title: "Self-direction", impact: "may feel slower when decisions require confidence and independent action", remedies: ["Create one clear priority each morning", "Use a written decision deadline", "Choose a personal symbol of initiative"] },
  2: { title: "Partnership", impact: "may feel less settled when cooperation and emotional expression are needed", remedies: ["Practise naming one feeling directly", "Schedule a weekly relationship check-in", "Use calm, patient communication"] },
  3: { title: "Expression", impact: "may feel blocked when ideas need a visible voice or creative outlet", remedies: ["Write or speak one idea each day", "Share work before it feels perfect", "Make regular space for creative play"] },
  4: { title: "Structure", impact: "may feel inconsistent when plans need routines, patience, and follow-through", remedies: ["Use a simple weekly system", "Break large work into repeatable steps", "Review progress at the same time each week"] },
  5: { title: "Adaptability", impact: "may feel constrained when change, variety, or communication is required", remedies: ["Try one new route or method each week", "Keep a flexible backup plan", "Learn through conversation and experimentation"] },
  6: { title: "Responsibility", impact: "may feel uneven when care, family, or sustainable commitments become central", remedies: ["Set one healthy boundary", "Create a calming home ritual", "Balance giving with scheduled recovery"] },
  7: { title: "Inner wisdom", impact: "may feel noisy when reflection, study, and trust in intuition are needed", remedies: ["Protect quiet thinking time", "Keep a question-and-insight journal", "Study one subject deeply rather than broadly"] },
  8: { title: "Authority", impact: "may feel delayed when money, leadership, or disciplined execution is involved", remedies: ["Track one resource consistently", "Practise making a measurable goal", "Review commitments before accepting more"] },
  9: { title: "Completion", impact: "may feel unresolved when release, forgiveness, or wider purpose is required", remedies: ["Close one unfinished loop", "Donate or release something unused", "Connect one goal to service or contribution"] },
};

export interface BasicReportContent {
  coreProfile: string;
  majorStrength: {
    label: string;
    text: string;
  };
  missingCount: number;
}

export function assembleBasicReport(
  core: CoreNumbers,
  grid: LoShuResult,
  strength: MajorStrength
): BasicReportContent {
  const driver = DRIVER_INTERPRETATIONS[core.vedic.driver] ?? DRIVER_INTERPRETATIONS[1];
  const conductor = CONDUCTOR_INTERPRETATIONS[core.vedic.conductor] ?? CONDUCTOR_INTERPRETATIONS[1];

  let majorStrengthText: string;
  if (strength.kind === "plane" && strength.line) {
    majorStrengthText = LOSHU_PLANE_STRENGTHS[strength.line.label] ?? LOSHU_PLANE_STRENGTHS["4-9-2"];
  } else if (strength.kind === "repeat" && strength.digit) {
    majorStrengthText = LOSHU_REPEAT_STRENGTHS[strength.digit] ?? LOSHU_REPEAT_STRENGTHS[1];
  } else {
    majorStrengthText = `Your ${strength.label} points to an amplified capacity for purpose, perspective, and meaningful contribution. This is a signature of potential: when you give it a clear direction, it can become a powerful source of growth and influence.`;
  }

  return {
    coreProfile: `${driver}\n\n${conductor}`,
    majorStrength: { label: strength.label, text: majorStrengthText },
    missingCount: grid.missing.length,
  };
}
