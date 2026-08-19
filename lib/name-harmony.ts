import { reduceStrict } from "./numerology-engine";

// This matrix keeps the public score explainable: it is based on the same
// number relationships used to describe harmony, not an AI-generated rating.
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

function relationshipScore(nameNumber: number, target: number) {
  if (nameNumber === target) return 100;
  const nameFriends = FRIEND_NUMBERS[nameNumber] ?? [];
  const targetFriends = FRIEND_NUMBERS[target] ?? [];
  if (nameFriends.includes(target) && targetFriends.includes(nameNumber)) return 86;
  if (nameFriends.includes(target) || targetFriends.includes(nameNumber)) return 72;
  return 52;
}

export function calculateNameHarmony(nameNumber: number, driver: number, conductor: number, lifePath: number) {
  const name = reduceStrict(nameNumber);
  const driverScore = relationshipScore(name, reduceStrict(driver));
  const conductorScore = relationshipScore(name, reduceStrict(conductor));
  const lifePathScore = relationshipScore(name, reduceStrict(lifePath));
  const score = Math.round(driverScore * 0.4 + conductorScore * 0.35 + lifePathScore * 0.25);
  const label = score >= 85 ? "Strong Harmony" : score >= 70 ? "Supportive Pattern" : "Needs Balance";

  return {
    score,
    label,
    method: "Calculated from the Chaldean Name Number and its number relationships with your Driver, Conductor and Life Path numbers.",
  };
}
