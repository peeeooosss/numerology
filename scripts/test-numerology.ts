import assert from "node:assert/strict";
import {
  buildNumerologyProfile,
  calculateChaldeanNameNumber,
  calculateLifePath,
  generateMonthlyForecast,
  parseDOB,
} from "../lib/numerology-engine";
import { calculateLoShuGrid, selectMajorStrength } from "../lib/lo-shu";
import { assembleBasicReport } from "../lib/interpretations-loshu";

function testDateParsing() {
  assert.deepEqual(parseDOB("14 May 1992"), { day: 14, month: 5, year: 1992 });
  assert.deepEqual(parseDOB("1992-05-14"), { day: 14, month: 5, year: 1992 });
  assert.deepEqual(parseDOB("14/05/1992"), { day: 14, month: 5, year: 1992 });
}

function testMasterNumbers() {
  assert.equal(calculateLifePath("09 Apr 1998").number, 22);
  assert.equal(calculateLifePath("22 Feb 1989").number, 33);
  assert.equal(calculateLifePath("03 Feb 1995").number, 11);
}

function testWesternAndVedicFacts() {
  const profile = buildNumerologyProfile("14 May 1992", "Aarav Rajesh Mehta", "western", "Aarav Mehta");
  assert.equal(profile.western.lifePath, profile.lifePath);
  assert.equal(profile.western.expression, profile.expression);
  assert.equal(profile.vedic.driver, 5);
  assert.equal(profile.vedic.conductor, 4);
  assert.equal(profile.vedic.currentNameNumber, calculateChaldeanNameNumber("Aarav Mehta"));
  assert.ok(profile.luckyNumbers.length > 0);
}

function testMonthlyForecast() {
  const forecast = generateMonthlyForecast("14 May 1992", 2026);
  assert.equal(forecast.length, 12);
  assert.deepEqual(forecast.map((month) => month.month), [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]);
  assert.ok(forecast.every((month) => month.personalMonth >= 1 && month.personalMonth <= 9));
}

function testLoShuReportLayer() {
  const profile = buildNumerologyProfile("14 May 1992", "Aarav Rajesh Mehta", "western");
  const grid = calculateLoShuGrid("14 May 1992", profile.vedic.driver, profile.vedic.conductor);
  const strength = selectMajorStrength(grid, profile);
  const basic = assembleBasicReport(profile, grid, strength);

  assert.equal(profile.vedic.driver, 5);
  assert.equal(profile.vedic.conductor, 4);
  assert.equal(grid.counts[1], 2);
  assert.equal(grid.counts[4], 2);
  assert.equal(grid.counts[9], 2);
  assert.equal(grid.missing.length, 4);
  assert.ok(grid.completedLines.some((line) => line.label === "4-9-2"));
  assert.ok(strength.label.startsWith("Completed plane"));
  assert.equal(basic.missingCount, 4);
  assert.equal(basic.coreProfile.includes("missing"), false);
  assert.equal(basic.majorStrength.text.includes("remed"), false);
}

testDateParsing();
testMasterNumbers();
testWesternAndVedicFacts();
testMonthlyForecast();
testLoShuReportLayer();
console.log("Numerology engine checks passed");
