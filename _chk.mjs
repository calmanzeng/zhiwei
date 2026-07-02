
import { Solar, Lunar } from "lunar-javascript";
import { astro } from "iztro";

// 2000-02-22 23:45 的太阳日
const solar = Solar.fromYmd(2000, 2, 22);
console.log("=== 阳历2000-02-22 23:45 ===");
console.log("太阳日:", solar.toFullString());
const lunar = solar.getLunar();
console.log("农历:", lunar.toString());
console.log("年干支:", lunar.getYearInGanZhi());
console.log("月干支:", lunar.getMonthInGanZhi());
console.log("日干支:", lunar.getDayInGanZhi());
console.log("时干支:", lunar.getTimeInGanZhi());

// 晚子时: 23:00-23:59, 日干用次日
const solarNext = Solar.fromYmd(2000, 2, 23);
const lunarNext = solarNext.getLunar();
console.log("\n=== 次日2000-02-23 ===");
console.log("日干支:", lunarNext.getDayInGanZhi());
console.log("时干支(子时):", lunarNext.getTimeInGanZhi());

// 方案A: 按2000-02-22子时排盘
console.log("\n=== 方案A: astro.bySolar(2000-02-22, 0) ===");
const chartA = astro.bySolar("2000-02-22", 0, 1, false);
console.log("命宫:", chartA.earthlyBranchOfSoulPalace);
console.log("身宫:", chartA.earthlyBranchOfBodyPalace);
console.log("五行局:", chartA.fiveElementsClass);
const a_sihua = {};
chartA.palaces.forEach(p => {
  (p.majorStars||[]).concat(p.minorStars||[]).forEach(s => {
    if(s.mutagen) a_sihua[s.mutagen] = `${s.name}→${p.name}`;
  });
});
console.log("四化:", JSON.stringify(a_sihua));

// 方案B: 按2000-02-23子时排盘(晚子时规则)
console.log("\n=== 方案B: astro.bySolar(2000-02-23, 0) - 晚子时 ===");
const chartB = astro.bySolar("2000-02-23", 0, 1, false);
console.log("命宫:", chartB.earthlyBranchOfSoulPalace);
console.log("身宫:", chartB.earthlyBranchOfBodyPalace);
console.log("五行局:", chartB.fiveElementsClass);
const b_sihua = {};
chartB.palaces.forEach(p => {
  (p.majorStars||[]).concat(p.minorStars||[]).forEach(s => {
    if(s.mutagen) b_sihua[s.mutagen] = `${s.name}→${p.name}`;
  });
});
console.log("四化:", JSON.stringify(b_sihua));

// 对比年份干支
console.log("\n=== 年干支 ===");
console.log("2000-02-22 年干支:", lunar.getYearInGanZhi());
console.log("2000-02-23 年干支:", lunarNext.getYearInGanZhi());

// iztro内部晚子时处理: bySolar的第四个参数isLeapMonth
// 查iztro是否内部处理了晚子时
console.log("\n=== iztro bySolar 参数说明 ===");
console.log("bySolar(solarDateStr, hourIndex, gender, isLeapMonth)");
console.log("子时(23:00-00:59)=index 0");

// 输出十二宫对比
console.log("\n\n=== 十二宫对比 ===");
for(let i=0; i<12; i++) {
  const pA = chartA.palaces[i];
  const pB = chartB.palaces[i];
  const aMs = (pA.majorStars||[]).map(s=>s.name+(s.mutagen?"【"+s.mutagen+"】":"")).join(",");
  const bMs = (pB.majorStars||[]).map(s=>s.name+(s.mutagen?"【"+s.mutagen+"】":"")).join(",");
  if(aMs !== bMs || pA.name !== pB.name) {
    console.log(`${pA.name}: A=[${aMs}] B=[${bMs}]`);
  }
}
process.stdout.write("\nDONE");
