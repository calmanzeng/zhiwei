
import { astro } from "iztro";
const chart = astro.bySolar("2006-09-24", 8, 0, false);
// Print ALL fields of first palace
const p = chart.palaces[0];
console.log("=== Palace 0 all keys ===");
console.log(JSON.stringify(Object.keys(p)));
// Print all non-star fields
for (const k of Object.keys(p)) {
  if (!["majorStars","minorStars","adjectiveStars","index","name","isBodyPalace","isOriginalPalace","heavenlyStem","earthlyBranch"].includes(k)) {
    console.log(k + ":", JSON.stringify(p[k]));
  }
}
// Also check the top-level chart for any global star arrays
console.log("\n=== Chart-level extra fields ===");
for (const k of Object.keys(chart)) {
  if (!["palaces","gender","solarDate","lunarDate","chineseDate","rawDates","time","timeRange","sign","zodiac","earthlyBranchOfBodyPalace","earthlyBranchOfSoulPalace","soul","body","fiveElementsClass","copyright","plugins"].includes(k)) {
    console.log(k + ":", typeof chart[k], Array.isArray(chart[k]) ? chart[k].length : "");
  }
}
