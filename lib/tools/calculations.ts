import {
  calculateLifePath,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay as enginePersonalDay,
  calculateChaldeanNameNumber,
  calculateVedicNumbers,
  calculateChallenges,
  calculatePinnacles,
  reduceStrict,
  parseDOB,
  LIFE_PATH_TITLES,
  PERSONAL_YEAR_THEMES,
} from "@/lib/numerology-engine";
import { calculateLoShuGrid, LOSHU_LINES, type LoShuDigit } from "@/lib/lo-shu";
import { calculateNameHarmony } from "@/lib/name-harmony";
import { DRIVER_INTERPRETATIONS, CONDUCTOR_INTERPRETATIONS } from "@/lib/interpretations-loshu";
import type {
  PersonalDayInput,
  NameComparisonInput,
  CompatibilityInput,
  BusinessNameInput,
  LuckyDateInput,
  CyclesInput,
  QuestionBuilderInput,
  ToolCalculationResult,
  ToolResult,
  ToolPrimaryCta,
  ToolDefinition,
  ToolSlug,
} from "./tool-types";

const FRIEND_NUMBERS: Record<number, number[]> = {
  1: [1, 2, 3, 4, 9],
  2: [1, 2, 4, 7, 8],
  3: [1, 3, 6, 9],
  4: [1, 2, 4, 6, 8],
  5: [1, 3, 5, 6, 9],
  6: [3, 4, 5, 6, 9],
  7: [1, 2, 7],
  8: [2, 4, 6, 8],
  9: [1, 3, 5, 6, 9],
};

const CHALLENGE_LABELS = ["First Challenge", "Second Challenge", "Third Challenge", "Fourth Challenge"];
const PINNACLE_LABELS = ["First Pinnacle", "Second Pinnacle", "Third Pinnacle", "Fourth Pinnacle"];
const PERSONAL_DAY_THEMES: Record<number, string> = {
  1: "A day for new beginnings, independent action, and bold decisions.",
  2: "A day for patience, cooperation, and careful attention to relationships.",
  3: "A day for creativity, expression, and joyful social connection.",
  4: "A day for discipline, organisation, and steady focused work.",
  5: "A day for change, variety, and openness to new experience.",
  6: "A day for responsibility, care, and attention to home or loved ones.",
  7: "A day for reflection, solitude, and trust in your inner knowing.",
  8: "A day for ambition, practical results, and attention to material goals.",
  9: "A day for completion, generosity, and release of what no longer serves.",
};

const LUCKY_DATE_PURPOSES = [
  { value: "general", label: "General reflection" },
  { value: "project", label: "Starting a project" },
  { value: "interview", label: "Interview or meeting" },
  { value: "travel", label: "Travel or movement" },
  { value: "decision", label: "Important decision" },
  { value: "event", label: "Personal event" },
];

const BUSINESS_CATEGORIES = [
  { value: "technology", label: "Technology or IT" },
  { value: "consulting", label: "Consulting or advisory" },
  { value: "creative", label: "Creative or design" },
  { value: "health", label: "Health or wellness" },
  { value: "education", label: "Education or coaching" },
  { value: "retail", label: "Retail or e-commerce" },
  { value: "finance", label: "Finance or accounting" },
  { value: "hospitality", label: "Hospitality or food" },
  { value: "legal", label: "Legal or compliance" },
  { value: "realestate", label: "Real estate" },
  { value: "manufacturing", label: "Manufacturing or supply" },
  { value: "other", label: "Other" },
];

const CONCERNS = [
  { value: "career", label: "Career or professional direction" },
  { value: "relationship", label: "Relationships or family" },
  { value: "name", label: "Name choice or spelling" },
  { value: "timing", label: "Timing or life rhythm" },
  { value: "business", label: "Business or start-up" },
  { value: "personal", label: "Personal direction or clarity" },
];

const COMPATIBILITY_THEMES: Record<number, string> = {
  1: "Independence and initiative define this relationship.",
  2: "Cooperation, sensitivity, and emotional awareness shape this bond.",
  3: "Creativity, expression, and shared joy characterise this connection.",
  4: "Structure, loyalty, and steady commitment anchor this partnership.",
  5: "Freedom, variety, and shared exploration drive this relationship.",
  6: "Care, responsibility, and mutual support sustain this connection.",
  7: "Depth, reflection, and shared understanding define this bond.",
  8: "Ambition, shared goals, and mutual respect characterise this partnership.",
  9: "Compassion, shared vision, and wider purpose shape this relationship.",
};

function relationshipLabel(a: number, b: number): string {
  const aFriends = FRIEND_NUMBERS[a] ?? [];
  const bFriends = FRIEND_NUMBERS[b] ?? [];
  if (a === b) return "Same energy creates a strong mirror effect.";
  if (aFriends.includes(b) && bFriends.includes(a)) return "Mutual harmony — both numbers naturally support each other.";
  if (aFriends.includes(b) || bFriends.includes(a)) return "One-directional support — one number naturally uplifts the other.";
  return "Contrasting energy — both can grow through conscious awareness of each other's style.";
}

function compatibilityScore(a: number, b: number): number {
  if (a === b) return 85;
  const aFriends = FRIEND_NUMBERS[a] ?? [];
  const bFriends = FRIEND_NUMBERS[b] ?? [];
  if (aFriends.includes(b) && bFriends.includes(a)) return 82;
  if (aFriends.includes(b) || bFriends.includes(a)) return 68;
  return 52;
}

function energyStyle(n: number): string {
  const styles: Record<number, string> = {
    1: "decisive, independent, pioneering",
    2: "collaborative, sensitive, diplomatic",
    3: "creative, expressive, social",
    4: "structured, reliable, methodical",
    5: "adaptable, curious, freedom-loving",
    6: "nurturing, responsible, harmonious",
    7: "reflective, analytical, intuitive",
    8: "ambitious, authoritative, practical",
    9: "compassionate, visionary, purposeful",
  };
  return styles[n] ?? "balanced";
}

function communicationStyle(n: number): string {
  const styles: Record<number, string> = {
    1: "Direct and assertive — prefers clear, action-oriented communication.",
    2: "Gentle and perceptive — listens deeply and responds with care.",
    3: "Expressive and enthusiastic — uses words, humour, or stories to connect.",
    4: "Practical and precise — values facts, structure, and follow-through.",
    5: "Dynamic and varied — adapts communication style to the audience.",
    6: "Warm and considered — focuses on harmony and emotional connection.",
    7: "Thoughtful and measured — shares insights only after careful observation.",
    8: "Confident and results-oriented — communicates with authority and clarity.",
    9: "Compassionate and broad — connects through shared values and vision.",
  };
  return styles[n] ?? "Balanced and adaptive.";
}

function sharedStrengths(a: number, b: number): string[] {
  const strengths: string[] = [];
  if (a === b) {
    strengths.push("Natural understanding of each other's rhythm and motivation.");
    strengths.push("Shared values and approach to problems.");
  } else {
    const aFriends = FRIEND_NUMBERS[a] ?? [];
    if (aFriends.includes(b)) strengths.push(`${a} energy naturally supports ${b} energy's approach.`);
    const bFriends = FRIEND_NUMBERS[b] ?? [];
    if (bFriends.includes(a)) strengths.push(`${b} energy naturally recognises ${a} energy's strengths.`);
    if (strengths.length === 0) strengths.push("Different perspectives create opportunities for growth.");
  }
  strengths.push("Both bring distinct gifts that the other can learn from.");
  return strengths;
}

function discussionPoints(a: number, b: number): string[] {
  const points: string[] = [];
  if (Math.abs(a - b) >= 4) {
    points.push("Pace of decisions — one may want faster action, the other more time.");
  }
  points.push("How much structure versus flexibility each person needs.");
  points.push("How to give honest feedback without creating unnecessary tension.");
  return points;
}

function purposeEnergy(purpose: string): string {
  const map: Record<string, string> = {
    general: "General reflection and self-awareness",
    project: "Starting new projects or initiatives",
    interview: "Interviews, meetings, and presentations",
    travel: "Travel and movement",
    decision: "Making important decisions",
    event: "Personal events and milestones",
  };
  return map[purpose] ?? map.general;
}

function purposeAdvice(purpose: string, personalDay: number): string {
  const advice: Record<string, Record<number, string>> = {
    general: {
      1: "A strong day for setting new intentions. Trust your instinct to act.",
      2: "A good day for collaboration. Listen before making declarations.",
      3: "A day when creative expression flows naturally. Share your ideas.",
      4: "Focus on practical tasks. Discipline today builds momentum.",
      5: "Embrace change and new experiences. Stay flexible.",
      6: "Attend to relationships and responsibilities. Care is productive today.",
      7: "Take time for research or inner reflection before acting.",
      8: "Focus on tangible results. Practical action carries weight.",
      9: "Complete or release something. A generous spirit opens new doors.",
    },
    project: {
      1: "Excellent for launching a new project. Initiative is well-supported.",
      2: "Better for planning and collaboration than launching alone.",
      3: "Creative projects benefit from visible expression today.",
      4: "Good for foundation work and detailed preparation.",
      5: "Projects that involve change or variety are well-timed.",
      6: "Good for projects involving care, family, or community.",
      7: "Better for research and planning than execution.",
      8: "Strong for business or financially focused projects.",
      9: "Good for projects with a social or humanitarian purpose.",
    },
    interview: {
      1: "Project confidence and initiative. Make your decisions clear.",
      2: "Listen actively and respond with patience.",
      3: "Bring warmth and expressiveness. Let your personality show.",
      4: "Present structure, reliability, and a systematic approach.",
      5: "Show adaptability and enthusiasm for learning.",
      6: "Focus on teamwork and responsibility.",
      7: "Highlight your analytical strengths and depth of knowledge.",
      8: "Demonstrate leadership and results orientation.",
      9: "Show compassion and a broad perspective.",
    },
  };
  const purposeMap = advice[purpose] ?? advice.general;
  return purposeMap[personalDay] ?? purposeMap[1];
}

function questionBank(concern: string): { questions: string[]; prepare: string[]; suggestedService: string; serviceLabel: string } {
  const banks: Record<string, { questions: string[]; prepare: string[]; suggestedService: string; serviceLabel: string }> = {
    career: {
      questions: [
        "What pattern in my current career transition would benefit from structured reflection?",
        "Which Personal Year phase am I in, and how does it relate to this decision?",
        "What practical question should I ask before choosing between these options?",
      ],
      prepare: ["Your current job title or role", "The decision you are weighing", "Key dates when the opportunity arose"],
      suggestedService: "consultation",
      serviceLabel: "Book a ₹999 consultation",
    },
    relationship: {
      questions: [
        "What number dynamic best describes the pattern I am noticing in this relationship?",
        "Where could I improve communication without losing authenticity?",
        "What does my Personal Year suggest about timing in this situation?",
      ],
      prepare: ["The relationship context", "Your date of birth", "Specific areas you want to discuss"],
      suggestedService: "consultation",
      serviceLabel: "Book a ₹999 consultation",
    },
    name: {
      questions: [
        "How does my current name number relate to my Driver and Conductor Numbers?",
        "What are the strengths and trade-offs of each candidate name?",
        "Which spelling creates the most supportive pattern with my birth numbers?",
      ],
      prepare: ["Your current name", "Candidate name options", "Your date of birth"],
      suggestedService: "name-balance",
      serviceLabel: "Book a ₹499 Name Balance session",
    },
    timing: {
      questions: [
        "What are the key Personal Year and Personal Month numbers around this period?",
        "Which months in the coming year carry the strongest potential for my goal?",
        "What does my Pinnacle cycle suggest about the next phase of my life?",
      ],
      prepare: ["Your date of birth", "The specific period you want to explore", "The event or decision you are timing"],
      suggestedService: "report",
      serviceLabel: "Get the ₹99 12-month report",
    },
    business: {
      questions: [
        "How does my personal number profile relate to my business direction?",
        "What should I consider before finalising this business name?",
        "Where do my natural strengths and the business needs intersect?",
      ],
      prepare: ["Your date of birth", "Business name candidates", "A brief description of the business"],
      suggestedService: "name-balance",
      serviceLabel: "Book a ₹499 Name Balance session",
    },
    personal: {
      questions: [
        "What is my current Personal Year theme, and how can I use it intentionally?",
        "Which Lo Shu pattern element deserves more of my attention right now?",
        "What one change would create the most alignment in my daily routine?",
      ],
      prepare: ["Your date of birth", "A specific area of life you want clarity on", "Any patterns you have already noticed"],
      suggestedService: "report",
      serviceLabel: "Get the ₹99 detailed report",
    },
  };
  return banks[concern] ?? banks.personal;
}

export function calculatePersonalDay(input: PersonalDayInput): ToolResult {
  const dateObj = parseDOB(input.dateOfBirth);
  const target = parseDOB(input.targetDate);
  if (!dateObj || !target) {
    throw new Error("Could not parse the dates provided.");
  }

  const personalYear = calculatePersonalYear(input.dateOfBirth, target.year);
  const personalMonth = calculatePersonalMonth(personalYear, target.month);
  const personalDay = enginePersonalDay(personalMonth, target.day);
  const lifePath = calculateLifePath(input.dateOfBirth);
  const theme = PERSONAL_DAY_THEMES[personalDay] ?? "A day of reflection and balance.";

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return {
    calculation: {
      primary: {
        label: "Your Personal Day Number",
        value: personalDay,
        subtitle: PERSONAL_YEAR_THEMES[personalYear] ?? "",
      },
      formula: `Reduce (birth day + birth month + target year) = Personal Year ${personalYear}, then (Personal Year + target month) = Personal Month ${personalMonth}, then (Personal Month + target day) = Personal Day ${personalDay}.`,
      explanation: theme,
      reflection: "Ask yourself: which single action, taken today, would bring my energy into better alignment with this number?",
      fields: [
        { label: "Personal Year", value: personalYear },
        { label: "Personal Month", value: personalMonth },
        { label: "Personal Day", value: personalDay },
        { label: "Life Path", value: lifePath.number },
        { label: "Date explored", value: `${target.day} ${monthNames[target.month - 1]} ${target.year}` },
      ],
    },
    primaryCta: "report",
    primaryCtaLabel: "See your full 12-month forecast · ₹99",
    secondaryCta: "consultation",
    secondaryCtaLabel: "Ask a question in a live session · ₹999",
    relatedArticles: ["driver-number-moolank", "conductor-number-bhagyank"],
  };
}

export function calculateNameComparison(input: NameComparisonInput): ToolResult {
  const vedic = calculateVedicNumbers(input.dateOfBirth, input.currentName);
  const lifePath = calculateLifePath(input.dateOfBirth);
  const options = [input.optionA, input.optionB];
  if (input.optionC?.trim()) options.push(input.optionC.trim());

  const results = options.map((name) => {
    const nameNumber = calculateChaldeanNameNumber(name);
    const harmony = calculateNameHarmony(nameNumber, vedic.driver, vedic.conductor, lifePath.number);
    return { name, nameNumber, harmony };
  });

  const comparisonRows = results.map((r) => ({
    label: r.name,
    nameNumber: r.nameNumber,
    harmonyScore: r.harmony.score,
    harmonyLabel: r.harmony.label,
  }));

  const bestName = [...results].sort((a, b) => b.harmony.score - a.harmony.score)[0];
  const weakestName = [...results].sort((a, b) => a.harmony.score - b.harmony.score)[0];

  return {
    calculation: {
      primary: {
        label: "Name Comparison",
        value: bestName.nameNumber,
        subtitle: `Highest harmony: ${bestName.harmony.score}% — ${bestName.harmony.label}`,
      },
      formula: "Each name is converted to its Chaldean Name Number, then compared with your Driver, Conductor, and Life Path numbers.",
      explanation: "A higher harmony score means the name number has a more supportive mathematical relationship with your birth numbers. This is a reflection tool — the best name is also the one you use comfortably and confidently.",
      reflection: "Consider not only the number, but how each name sounds, how it feels to say it, and whether it fits your personal and professional context.",
      limitation: "No name number guarantees a specific outcome. A good name calculation should support self-awareness, not create fear.",
      sections: comparisonRows.map((row) => ({
        heading: row.label,
        content: `Chaldean Name Number: ${row.nameNumber} · Harmony: ${row.harmonyScore}% · ${row.harmonyLabel}`,
        items: [
          `Relationship with Driver ${vedic.driver}: ${relationshipLabel(reduceStrict(row.nameNumber), vedic.driver)}`,
          `Relationship with Conductor ${vedic.conductor}: ${relationshipLabel(reduceStrict(row.nameNumber), vedic.conductor)}`,
          `Relationship with Life Path ${lifePath.number}: ${relationshipLabel(reduceStrict(row.nameNumber), lifePath.number)}`,
        ],
      })),
    },
    primaryCta: "name-balance",
    primaryCtaLabel: "Book a Name Balance session · ₹499",
    secondaryCta: "report",
    secondaryCtaLabel: "Get the detailed report · ₹99",
    relatedArticles: ["chaldean-vs-pythagorean-numerology", "driver-vs-conductor-number"],
  };
}

export function calculateCompatibility(input: CompatibilityInput): ToolResult {
  const vedicA = calculateVedicNumbers(input.personADob, input.personAName);
  const vedicB = calculateVedicNumbers(input.personBDob, input.personBName);
  const lifePathA = calculateLifePath(input.personADob);
  const lifePathB = calculateLifePath(input.personBDob);
  const nameNumA = calculateChaldeanNameNumber(input.personAName);
  const nameNumB = calculateChaldeanNameNumber(input.personBName);

  const driverScore = compatibilityScore(vedicA.driver, vedicB.driver);
  const lifePathScore = compatibilityScore(lifePathA.number, lifePathB.number);
  const nameScore = compatibilityScore(reduceStrict(nameNumA), reduceStrict(nameNumB));
  const overallScore = Math.round(driverScore * 0.35 + lifePathScore * 0.35 + nameScore * 0.3);

  const sharedStrength = sharedStrengths(vedicA.driver, vedicB.driver);
  const discuss = discussionPoints(vedicA.driver, vedicB.driver);

  return {
    calculation: {
      primary: {
        label: "Compatibility Overview",
        value: `${overallScore}%`,
        subtitle: overallScore >= 80 ? "Strong natural alignment" : overallScore >= 65 ? "Supportive with conscious awareness" : "Growth-oriented with complementary strengths",
      },
      formula: "Weighted comparison of Driver Number (35%), Life Path (35%), and Chaldean Name Number (30%) from both profiles.",
      explanation: "This is a reflection on how two number profiles relate. It is not a prediction of success or failure. Every relationship benefits from communication, awareness, and effort — regardless of the numbers.",
      limitation: "Numerology describes patterns, not guarantees. No compatibility score should replace thoughtful, real-world relationship assessment.",
      fields: [
        { label: `${input.personAName} Driver`, value: vedicA.driver },
        { label: `${input.personBName} Driver`, value: vedicB.driver },
        { label: `${input.personAName} Life Path`, value: lifePathA.number },
        { label: `${input.personBName} Life Path`, value: lifePathB.number },
        { label: `${input.personAName} Name Number`, value: nameNumA },
        { label: `${input.personBName} Name Number`, value: nameNumB },
      ],
      sections: [
        {
          heading: "Communication and Energy",
          content: `Person A's energy is ${energyStyle(vedicA.driver)}. Person B's energy is ${energyStyle(vedicB.driver)}.`,
          items: [
            `Person A communication: ${communicationStyle(vedicA.driver)}`,
            `Person B communication: ${communicationStyle(vedicB.driver)}`,
          ],
        },
        {
          heading: "Shared Strengths",
          content: "What naturally works between these two profiles:",
          items: sharedStrength,
        },
        {
          heading: "Areas for Discussion",
          content: "Topics that may benefit from conscious conversation:",
          items: discuss,
        },
      ],
    },
    primaryCta: "consultation",
    primaryCtaLabel: "Discuss a relationship question · ₹999",
    secondaryCta: "report",
    secondaryCtaLabel: "Get your full individual profile · ₹99",
    relatedArticles: ["driver-vs-conductor-number", "what-is-lo-shu-grid"],
  };
}

export function calculateBusinessName(input: BusinessNameInput): ToolResult {
  const vedic = calculateVedicNumbers(input.founderDob, input.founderName);
  const lifePath = calculateLifePath(input.founderDob);
  const candidates = input.candidateNames.filter((n) => n.trim());

  const results = candidates.map((name) => {
    const nameNumber = calculateChaldeanNameNumber(name);
    const harmony = calculateNameHarmony(nameNumber, vedic.driver, vedic.conductor, lifePath.number);
    return { name, nameNumber, harmony };
  });

  const best = [...results].sort((a, b) => b.harmony.score - a.harmony.score)[0];

  return {
    calculation: {
      primary: {
        label: "Business Name Comparison",
        value: best ? best.nameNumber : "—",
        subtitle: best ? `Highest harmony: ${best.name}% — ${best.harmony.label}` : "Add at least one candidate name",
      },
      formula: "Each candidate business name is converted to its Chaldean Name Number and compared with the founder's birth numbers.",
      explanation: "A business name's number creates a relationship with the founder's profile. A higher harmony score suggests a more supportive pattern, though real-world factors such as branding, market fit, and legal availability always matter.",
      limitation: "This is a numerology reflection tool, not legal, financial, or trademark advice. Always verify business name availability through appropriate channels.",
      fields: [
        { label: "Founder Driver Number", value: vedic.driver },
        { label: "Founder Conductor Number", value: vedic.conductor },
        { label: "Founder Life Path", value: lifePath.number },
        { label: "Business category", value: input.businessCategory },
      ],
      sections: results.map((r) => ({
        heading: r.name,
        content: `Chaldean Name Number: ${r.nameNumber} · Harmony: ${r.harmony.score}% · ${r.harmony.label}`,
        items: [
          `Relationship with founder Driver ${vedic.driver}: ${relationshipLabel(reduceStrict(r.nameNumber), vedic.driver)}`,
          `Relationship with founder Life Path ${lifePath.number}: ${relationshipLabel(reduceStrict(r.nameNumber), lifePath.number)}`,
        ],
      })),
    },
    primaryCta: "name-balance",
    primaryCtaLabel: "Get a Name Balance session · ₹499",
    secondaryCta: "consultation",
    secondaryCtaLabel: "Discuss your business direction · ₹999",
    relatedArticles: ["chaldean-vs-pythagorean-numerology", "driver-number-moolank"],
  };
}

export function calculateLuckyDate(input: LuckyDateInput): ToolResult {
  const dateObj = parseDOB(input.dateOfBirth);
  const target = parseDOB(input.targetDate);
  if (!dateObj || !target) throw new Error("Could not parse the dates provided.");

  const personalYear = calculatePersonalYear(input.dateOfBirth, target.year);
  const personalMonth = calculatePersonalMonth(personalYear, target.month);
  const personalDay = enginePersonalDay(personalMonth, target.day);
  const lifePath = calculateLifePath(input.dateOfBirth);
  const purpose = input.purpose ?? "general";
  const purposeLabel = LUCKY_DATE_PURPOSES.find((p) => p.value === purpose)?.label ?? "General reflection";

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return {
    calculation: {
      primary: {
        label: "Date Reflection",
        value: personalDay,
        subtitle: PERSONAL_DAY_THEMES[personalDay] ?? "A day of balance",
      },
      formula: `Personal Year ${personalYear} + month ${target.month} = Personal Month ${personalMonth}. Personal Month ${personalMonth} + day ${target.day} = Personal Day ${personalDay}.`,
      explanation: purposeAdvice(purpose, personalDay),
      reflection: `For the purpose "${purposeLabel}", the key question is: how can I align my actions with the energy of ${personalDay} on this day?`,
      limitation: "This is a traditional reflection tool, not a guarantee of outcomes. Always make practical decisions using real-world information and professional advice where appropriate.",
      fields: [
        { label: "Personal Year", value: personalYear },
        { label: "Personal Month", value: personalMonth },
        { label: "Personal Day", value: personalDay },
        { label: "Life Path", value: lifePath.number },
        { label: "Date explored", value: `${target.day} ${monthNames[target.month - 1]} ${target.year}` },
        { label: "Purpose", value: purposeLabel },
        { label: "Energy theme", value: purposeEnergy(purpose) },
      ],
    },
    primaryCta: "report",
    primaryCtaLabel: "Get the 12-month forecast · ₹99",
    secondaryCta: "consultation",
    secondaryCtaLabel: "Discuss your timing · ₹999",
    relatedArticles: ["driver-number-moolank", "what-is-lo-shu-grid"],
  };
}

export function calculateCycles(input: CyclesInput): ToolResult {
  const vedic = calculateVedicNumbers(input.dateOfBirth, "Magic of Numbers");
  const lifePath = calculateLifePath(input.dateOfBirth);
  const challenges = calculateChallenges(input.dateOfBirth);
  const pinnacles = calculatePinnacles(input.dateOfBirth);
  const personalYear = calculatePersonalYear(input.dateOfBirth);
  const today = new Date();
  const personalMonth = calculatePersonalMonth(personalYear, today.getMonth() + 1);
  const personalDay = enginePersonalDay(personalMonth, today.getDate());

  return {
    calculation: {
      primary: {
        label: "Your Numerology Cycles",
        value: lifePath.number,
        subtitle: LIFE_PATH_TITLES[lifePath.number] ?? "A unique life pattern",
      },
      formula: "Pinnacles and Challenges are calculated from the reduced day, month, and year of birth using traditional methods.",
      explanation: "Pinnacles represent broader life phases, while Challenges represent internal tests or growth areas. Together they describe the rhythm of your life stages.",
      limitation: "Cycle boundaries are approximate. The exact ages associated with each Pinnacle and Challenge depend on the numerology method used.",
      fields: [
        { label: "Driver Number", value: vedic.driver },
        { label: "Conductor Number", value: vedic.conductor },
        { label: "Life Path", value: lifePath.number },
        { label: "Current Personal Year", value: personalYear },
        { label: "Current Personal Month", value: personalMonth },
        { label: "Current Personal Day", value: personalDay },
      ],
      sections: [
        {
          heading: "Pinnacle Cycles",
          content: "Each Pinnacle represents a broader life phase with a particular theme:",
          items: pinnacles.map((p, i) => `${PINNACLE_LABELS[i]}: Number ${p} — ${COMPATIBILITY_THEMES[p] ?? "A period of growth and learning"}`),
        },
        {
          heading: "Challenge Numbers",
          content: "Each Challenge represents an internal area for development:",
          items: challenges.map((c, i) => `${CHALLENGE_LABELS[i]}: Number ${c}${c === 0 ? " — The Master Challenge: all growth is self-directed" : ` — An area for conscious development in the theme of ${c}`}`),
        },
        {
          heading: "Current Timing",
          content: `Your current Personal Year is ${personalYear} (${PERSONAL_YEAR_THEMES[personalYear] ?? ""}). This month's energy is ${personalMonth}. Today's energy is ${personalDay}.`,
        },
      ],
    },
    primaryCta: "report",
    primaryCtaLabel: "Get the full 12-month forecast · ₹99",
    secondaryCta: "consultation",
    secondaryCtaLabel: "Discuss your cycles · ₹999",
    relatedArticles: ["driver-number-moolank", "conductor-number-bhagyank"],
  };
}

export function buildQuestionResult(input: QuestionBuilderInput): ToolResult {
  const bank = questionBank(input.concern);

  return {
    calculation: {
      primary: {
        label: "Your Consultation Questions",
        value: bank.questions.length,
        subtitle: `Prepared for: ${CONCERNS.find((c) => c.value === input.concern)?.label ?? input.concern}`,
      },
      formula: "Questions generated from the consultation focus area and common patterns explored in numerology discussions.",
      explanation: "These questions are designed to help you get the most value from a consultation. They focus on patterns and reflection rather than simple yes-or-no answers.",
      reflection: input.situation
        ? `Your situation: ${input.situation}. Consider how this context shapes the questions above.`
        : "Consider which of these questions feels most urgent. That is usually the best place to start.",
      sections: [
        {
          heading: "Suggested Questions",
          content: "Choose one or two of these to focus on during your consultation:",
          items: bank.questions,
        },
        {
          heading: "Information to Prepare",
          content: "Bring these details to your session for a more focused discussion:",
          items: bank.prepare,
        },
        {
          heading: "Best Service Match",
          content: `Based on your concern, the ${bank.serviceLabel} is the most relevant starting point.`,
        },
      ],
    },
    primaryCta: bank.suggestedService as ToolPrimaryCta,
    primaryCtaLabel: bank.serviceLabel,
    secondaryCta: "free-analysis",
    secondaryCtaLabel: "Start with a free analysis",
    relatedArticles: ["driver-number-moolank", "driver-vs-conductor-number"],
  };
}

export const TOOL_CALCULATIONS = {
  "personal-day-calculator": calculatePersonalDay,
  "name-comparison-calculator": calculateNameComparison,
  "numerology-compatibility-calculator": calculateCompatibility,
  "business-name-numerology-calculator": calculateBusinessName,
  "lucky-date-calculator": calculateLuckyDate,
  "numerology-cycles-calculator": calculateCycles,
  "session-question-builder": buildQuestionResult,
} as const;

export const TOOL_DEFINITIONS: Record<ToolSlug, ToolDefinition> = {
  "personal-day-calculator": {
    meta: {
      slug: "personal-day-calculator" as const,
      title: "Personal Day Calculator by Date of Birth",
      description: "Calculate your Personal Day Number for any date using your date of birth. See the energy of the day and explore a short traditional reflection.",
      primaryKeyword: "Personal Day calculator",
      category: "Timing and Forecasting",
      readingTime: "3 min read",
    },
    fields: [
      { name: "dateOfBirth", label: "Your date of birth", type: "date" as const, required: true },
      { name: "targetDate", label: "Date to explore", type: "date" as const, required: true },
    ],
    disclaimer: "Personal Day is a traditional numerology calculation presented as a reflection tool. It should not be used to make medical, legal, financial, or guaranteed life decisions.",
    privacyNote: "Your date of birth is used only for this calculation and is not stored or shared.",
  },
  "name-comparison-calculator": {
    meta: {
      slug: "name-comparison-calculator" as const,
      title: "Name Numerology Comparison Calculator",
      description: "Compare two or three name options by their Chaldean Name Number and see how each relates to your birth numbers.",
      primaryKeyword: "name numerology calculator",
      category: "Name Analysis",
      readingTime: "4 min read",
    },
    fields: [
      { name: "currentName", label: "Your current name", type: "text" as const, required: true, maxLength: 100 },
      { name: "dateOfBirth", label: "Your date of birth", type: "date" as const, required: true },
      { name: "optionA", label: "Name option A", type: "text" as const, required: true, maxLength: 100 },
      { name: "optionB", label: "Name option B", type: "text" as const, required: true, maxLength: 100 },
      { name: "optionC", label: "Name option C (optional)", type: "text" as const, maxLength: 100 },
    ],
    disclaimer: "This tool compares name numbers as a reflection framework. It does not determine which name is objectively best. Consider pronunciation, context, and personal preference alongside the numbers.",
    privacyNote: "Names and dates of birth are used only for this calculation and are not stored.",
  },
  "numerology-compatibility-calculator": {
    meta: {
      slug: "numerology-compatibility-calculator" as const,
      title: "Numerology Compatibility Calculator",
      description: "Compare two people's Driver Numbers, Life Paths, and Name Numbers for a traditional numerology compatibility reflection.",
      primaryKeyword: "numerology compatibility calculator",
      category: "Relationship Numerology",
      readingTime: "4 min read",
    },
    fields: [
      { name: "personAName", label: "Person A name", type: "text" as const, required: true, maxLength: 100 },
      { name: "personADob", label: "Person A date of birth", type: "date" as const, required: true },
      { name: "personBName", label: "Person B name", type: "text" as const, required: true, maxLength: 100 },
      { name: "personBDob", label: "Person B date of birth", type: "date" as const, required: true },
    ],
    disclaimer: "This is a numerology reflection tool. It does not predict relationship success or failure. Every relationship benefits from communication, awareness, and mutual effort.",
    privacyNote: "Names and dates of birth are used only for this calculation and are not stored.",
  },
  "business-name-numerology-calculator": {
    meta: {
      slug: "business-name-numerology-calculator" as const,
      title: "Business Name Numerology Calculator",
      description: "Compare candidate business names by their Chaldean Name Number and see how each relates to the founder's birth numbers.",
      primaryKeyword: "business name numerology calculator",
      category: "Business Numerology",
      readingTime: "4 min read",
    },
    fields: [
      { name: "founderName", label: "Founder or owner name", type: "text" as const, required: true, maxLength: 100 },
      { name: "founderDob", label: "Founder date of birth", type: "date" as const, required: true },
      { name: "businessCategory", label: "Business category", type: "select" as const, required: true, options: BUSINESS_CATEGORIES },
      { name: "candidateName1", label: "Business name option 1", type: "text" as const, required: true, maxLength: 100 },
      { name: "candidateName2", label: "Business name option 2", type: "text" as const, required: true, maxLength: 100 },
      { name: "candidateName3", label: "Business name option 3 (optional)", type: "text" as const, maxLength: 100 },
    ],
    disclaimer: "This tool provides numerology-based name reflections. It is not legal, financial, trademark, or business strategy advice. Always verify name availability through appropriate channels.",
    privacyNote: "Names and dates of birth are used only for this calculation and are not stored.",
  },
  "lucky-date-calculator": {
    meta: {
      slug: "lucky-date-calculator" as const,
      title: "Lucky Date Calculator by Numerology",
      description: "Explore any date using your Personal Day Number. See the energy theme and a short reflection for your chosen purpose.",
      primaryKeyword: "lucky date calculator numerology",
      category: "Timing and Forecasting",
      readingTime: "3 min read",
    },
    fields: [
      { name: "dateOfBirth", label: "Your date of birth", type: "date" as const, required: true },
      { name: "targetDate", label: "Date to explore", type: "date" as const, required: true },
      { name: "purpose", label: "Purpose (optional)", type: "select" as const, options: LUCKY_DATE_PURPOSES },
    ],
    disclaimer: "This tool provides a traditional numerology reflection on a date. It is not a prediction of guaranteed outcomes. Always make practical decisions using real-world information and professional advice.",
    privacyNote: "Your date of birth is used only for this calculation and is not stored.",
  },
  "numerology-cycles-calculator": {
    meta: {
      slug: "numerology-cycles-calculator" as const,
      title: "Numerology Cycles Calculator — Pinnacles and Challenges",
      description: "See your Pinnacle Cycles, Challenge Numbers, and current Personal Year in one overview. A traditional numerology reflection on life rhythm.",
      primaryKeyword: "numerology pinnacle calculator",
      category: "Life Cycles",
      readingTime: "5 min read",
    },
    fields: [
      { name: "dateOfBirth", label: "Your date of birth", type: "date" as const, required: true },
    ],
    disclaimer: "Pinnacle and Challenge ages are approximate and depend on the method used. This tool is a traditional numerology reflection, not a guaranteed life forecast.",
    privacyNote: "Your date of birth is used only for this calculation and is not stored.",
  },
  "session-question-builder": {
    meta: {
      slug: "session-question-builder" as const,
      title: "Numerology Session Question Builder",
      description: "Build focused questions for a numerology consultation. Choose your concern and receive structured questions and preparation steps.",
      primaryKeyword: "numerology session questions",
      category: "Consultation Preparation",
      readingTime: "2 min read",
    },
    fields: [
      { name: "concern", label: "Main concern", type: "select" as const, required: true, options: CONCERNS },
      { name: "situation", label: "Brief situation (optional)", type: "textarea" as const, maxLength: 300 },
    ],
    disclaimer: "These questions are suggestions designed to help you get the most from a consultation. They are not required and do not determine the focus of a session.",
    privacyNote: "Your inputs are not stored or shared.",
  },
};
