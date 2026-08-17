import { parseDOB, type CoreNumbers } from "./numerology-engine";

export type LoShuDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type LoShuLineKind = "horizontal" | "vertical" | "diagonal";

export interface LoShuLine {
  digits: LoShuDigit[];
  label: string;
  kind: LoShuLineKind;
}

export interface LoShuResult {
  counts: Record<LoShuDigit, number>;
  present: LoShuDigit[];
  repeated: Array<{ digit: LoShuDigit; count: number }>;
  missing: LoShuDigit[];
  completedLines: LoShuLine[];
  sourceDigits: LoShuDigit[];
}

export interface MajorStrength {
  kind: "plane" | "repeat" | "master";
  label: string;
  line?: LoShuLine;
  digit?: LoShuDigit;
  number?: number;
}

export const LOSHU_ROWS: LoShuDigit[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export const LOSHU_LINES: LoShuLine[] = [
  { digits: [4, 9, 2], label: "4-9-2", kind: "horizontal" },
  { digits: [3, 5, 7], label: "3-5-7", kind: "horizontal" },
  { digits: [8, 1, 6], label: "8-1-6", kind: "horizontal" },
  { digits: [4, 3, 8], label: "4-3-8", kind: "vertical" },
  { digits: [9, 5, 1], label: "9-5-1", kind: "vertical" },
  { digits: [2, 7, 6], label: "2-7-6", kind: "vertical" },
  { digits: [4, 5, 6], label: "4-5-6", kind: "diagonal" },
  { digits: [2, 5, 8], label: "2-5-8", kind: "diagonal" },
];

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as LoShuDigit[];

function dobDigits(dob: string): LoShuDigit[] {
  const date = parseDOB(dob);
  if (!date) throw new Error(`Cannot parse date: ${dob}`);

  return `${String(date.day).padStart(2, "0")}${String(date.month).padStart(2, "0")}${date.year}`
    .split("")
    .map(Number)
    .filter((digit): digit is LoShuDigit => digit >= 1 && digit <= 9);
}

export function calculateLoShuGrid(
  dob: string,
  driver: number,
  conductor: number
): LoShuResult {
  const counts = Object.fromEntries(DIGITS.map((digit) => [digit, 0])) as Record<LoShuDigit, number>;
  const sourceDigits = [
    ...dobDigits(dob),
    driver,
    conductor,
  ].filter((digit): digit is LoShuDigit => digit >= 1 && digit <= 9);

  sourceDigits.forEach((digit) => {
    counts[digit] += 1;
  });

  const present = DIGITS.filter((digit) => counts[digit] > 0);
  const repeated = DIGITS
    .filter((digit) => counts[digit] >= 2)
    .map((digit) => ({ digit, count: counts[digit] }));
  const missing = DIGITS.filter((digit) => counts[digit] === 0);
  const completedLines = LOSHU_LINES.filter((line) => line.digits.every((digit) => counts[digit] > 0));

  return { counts, present, repeated, missing, completedLines, sourceDigits };
}

function linePriority(line: LoShuLine): number {
  if (line.kind === "diagonal") return 0;
  if (line.kind === "vertical") return 1;
  return 2;
}

export function selectMajorStrength(grid: LoShuResult, core: CoreNumbers): MajorStrength {
  const driver = core.vedic.driver;
  const conductor = core.vedic.conductor;

  const completedLine = [...grid.completedLines].sort((a, b) => {
    const priority = linePriority(a) - linePriority(b);
    if (priority !== 0) return priority;
    const aContainsConductor = a.digits.includes(conductor as LoShuDigit) ? 1 : 0;
    const bContainsConductor = b.digits.includes(conductor as LoShuDigit) ? 1 : 0;
    if (aContainsConductor !== bContainsConductor) return bContainsConductor - aContainsConductor;
    const aContainsDriver = a.digits.includes(driver as LoShuDigit) ? 1 : 0;
    const bContainsDriver = b.digits.includes(driver as LoShuDigit) ? 1 : 0;
    return bContainsDriver - aContainsDriver;
  })[0];

  if (completedLine) {
    return {
      kind: "plane",
      label: `Completed plane ${completedLine.label}`,
      line: completedLine,
    };
  }

  const repeated = [...grid.repeated].sort((a, b) => b.count - a.count || b.digit - a.digit)[0];
  if (repeated) {
    return {
      kind: "repeat",
      label: `Strong repeated number ${String(repeated.digit).repeat(repeated.count)}`,
      digit: repeated.digit,
    };
  }

  const master = [core.vedic.driver, core.vedic.conductor, core.lifePath].find((number) =>
    number === 11 || number === 22 || number === 33
  );

  return {
    kind: "master",
    label: `Master number ${master ?? core.vedic.conductor}`,
    number: master ?? core.vedic.conductor,
  };
}
