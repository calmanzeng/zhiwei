
import { astro } from "iztro";
import { Solar } from "lunar-javascript";

// 1999年7月25日 午时(11-13点) 女
const solar = Solar.fromYmd(1999, 7, 25);
const lunar = solar.getLunar();
console.log("阳历:", solar.toString());
console.log("阴历:", lunar.toString());

// iztro v2: astro.bySolar("YYYY-MM-DD", hourIndex, gender, isLeapMonth)
// 午时 = hour index 6 in iztro (子0丑1寅2卯3辰4巳5午6)
// gender: 1=男, 0=女
const chart = astro.bySolar("1999-7-25", 6, 0, false);

// Print all palace info
const palaces = chart.palaces;
console.log("\n===== 十二宫 =====");
for (const p of palaces) {
  const stars = p.stars || [];
  const majorStars = stars.filter(s => s.type === "major" || s.type === "majorStar").map(s => s.name);
  const minorStars = stars.filter(s => s.type !== "major" && s.type !== "majorStar").map(s => s.name);
  console.log(`【${p.name}】${p.earthlyBranch || ""} | 主星: ${majorStars.join("+") || "无主星"} | 辅星: ${minorStars.join(",")}`);
}

// Print four transformations
console.log("\n===== 四化 =====");
try {
  // Get the chart's sihua info
  const chartStr = JSON.stringify(chart, (key, val) => typeof val === "function" ? undefined : val, 2);
  // Search for hua/化 related fields
  const lines = chartStr.split("\n");
  for (const line of lines) {
    if (line.includes("hua") || line.includes("Hua") || line.includes("化") || line.includes("Lu") || line.includes("Quan") || line.includes("Ke") || line.includes("Ji")) {
      console.log(line);
    }
  }
} catch(e) {
  console.log("四化解析异常:", e.message);
}

// Full JSON for analysis
const chartJSON = JSON.stringify(chart, (key, val) => typeof val === "function" ? undefined : val, 2);
// Write to file
import { writeFileSync } from "fs";
writeFileSync("chart_output.json", chartJSON, "utf-8");
console.log("\nJSON written to chart_output.json, length:", chartJSON.length);
