import { astro } from "iztro";
import { Solar } from "lunar-javascript";

// 农历1994年九月十一 → 转成阳历计算
const testSolar = Solar.fromYmd(1994, 10, 15);
const testLunar = testSolar.getLunar();
console.log("阳历1994-10-15 -> 农历:", testLunar.toString());

const lYear = testLunar.getYear();
const lMonth = testLunar.getMonth();
const lDay = testLunar.getDay();
console.log("农历" + lYear + "年" + Math.abs(lMonth) + "月" + lDay + "日");

// 午时 = 6 (iztro hour index: 子0丑1寅2卯3辰4巳5午6未7申8酉9戌10亥11)
// gender: 0=女
const chart = astro.bySolar("1994-10-15", 6, 0, false);

console.log("\n\n========== 紫微斗数命盘 ==========");
console.log("出生: 农历1994年甲戌年九月十一日 午时 (阳历1994-10-15) 女");
console.log("================================\n");

const soulBranch = chart.earthlyBranchOfSoulPalace || "?";
const bodyBranch = chart.earthlyBranchOfBodyPalace || "?";
console.log("命宫地支: " + soulBranch);
console.log("身宫地支: " + bodyBranch);
console.log("五行局: " + (chart.fiveElementsClass || "?"));

// Print sihua
console.log("\n===== 四化 =====");
for (const key of Object.keys(chart)) {
  if (key.toLowerCase().includes("hua") || key.toLowerCase().includes("mutagen")) {
    console.log(key + ":", JSON.stringify(chart[key]));
  }
}

// Print all palaces
const palaces = chart.palaces;
console.log("\n===== 十二宫星曜分布 =====");
for (const p of palaces) {
  const branch = p.earthlyBranch || "";
  const stem = p.heavenlyStem || "";
  const stars = p.stars || [];
  const majorStars = stars.filter(s => s.type === "major" || s.type === "majorStar").map(s => {
    let extra = "";
    if (s.mutagen) extra += "【" + s.mutagen + "】";
    if (s.brightness) extra += "(" + s.brightness + ")";
    return s.name + extra;
  });
  const minorStars = stars.filter(s => s.type !== "major" && s.type !== "majorStar").map(s => {
    let extra = "";
    if (s.mutagen) extra += "【" + s.mutagen + "】";
    if (s.brightness) extra += "(" + s.brightness + ")";
    return s.name + extra;
  });
  const isBody = p.isBodyPalace ? " [身宫]" : "";
  console.log("【" + p.name + "】" + stem + branch + isBody);
  console.log("  主星: " + (majorStars.join("、") || "空"));
  console.log("  辅星: " + (minorStars.join("、") || "无"));
}

// Print da xian info
console.log("\n===== 大限 =====");
for (const p of palaces) {
  if (p.decadal) {
    const range = p.decadal.range;
    console.log("【" + p.name + "】" + (range ? range.join("-") + "岁" : "?"));
  }
}

// Full JSON
import { writeFileSync } from "fs";
const chartJSON = JSON.stringify(chart, (key, val) => typeof val === "function" ? undefined : val, 2);
writeFileSync("chart_output.json", chartJSON, "utf-8");
console.log("\n\n完整JSON已写入 chart_output.json");
