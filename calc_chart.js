
const { astro } = require("iztro");
const { Solar } = require("lunar-javascript");

// 1999年7月25日 午时(11-13点) 女
// Convert to lunar date first
const solar = Solar.fromYmd(1999, 7, 25);
const lunar = solar.getLunar();
console.log("阳历:", solar.toString());
console.log("阴历:", lunar.toString());

// iztro uses: astro.bySolar(year, month, day, hour, gender, isLeapMonth)
// 午时 = 地支午 = index 7 in iztro (子0丑1寅2卯3辰4巳5午6未7... wait)
// Actually iztro hour mapping: 子=0, 丑=1, 寅=2, 卯=3, 辰=4, 巳=5, 午=6, 未=7, 申=8, 酉=9, 戌=10, 亥=11
// But the API might use different indexing. Let me check.

// gender: 1=男, 0=女 for iztro v2
const chart = astro.bySolar("1999-7-25", 6, 0, false);

console.log("\n===== 紫微命盘 =====");
console.log("命宫:", chart.palaceNames ? "available" : "not available");
console.log("星曜数量:", chart.stars ? chart.stars.length : "N/A");

// Print all palaces
const palaces = chart.palaces;
if (palaces && palaces.length > 0) {
  console.log("\n===== 十二宫详情 =====");
  for (const p of palaces) {
    console.log("\n【" + p.name + "】(" + p.earthlyBranch + ")");
    if (p.stars && p.stars.length > 0) {
      console.log("  主星:", p.stars.filter(s => s.type === "major").map(s => s.name).join(", ") || "无主星");
      console.log("  辅星:", p.stars.filter(s => s.type !== "major").map(s => s.name).join(", ") || "无");
    }
    if (p.surpalaces) {
      // 三方四正
    }
  }
}

// Print major hes
const hua = chart.hua || chart.majorHua;
console.log("\n===== 四化 =====");

// Try to get the full chart as JSON for detailed analysis
const chartJSON = JSON.stringify(chart, null, 2);
console.log("\n===== RAW JSON (first 5000 chars) =====");
console.log(chartJSON.substring(0, 5000));
console.log("... (total length:", chartJSON.length, ")");
