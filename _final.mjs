
import { Solar, Lunar } from "lunar-javascript";

// 白天 2000-02-22 00:00
const s1 = Solar.fromYmd(2000, 2, 22);
const l1 = s1.getLunar();
console.log("2000-02-22 00:00 → 农历:", l1.toString(), "日干支:", l1.getDayInGanZhi());

// 23:45 用 Solar.fromYmdHms
const s2 = Solar.fromYmdHms(2000, 2, 22, 23, 45, 0);
const l2 = s2.getLunar();
console.log("2000-02-22 23:45 → 农历:", l2.toString(), "日干支:", l2.getDayInGanZhi());

// 次日 2000-02-23 00:00
const s3 = Solar.fromYmd(2000, 2, 23);
const l3 = s3.getLunar();
console.log("2000-02-23 00:00 → 农历:", l3.toString(), "日干支:", l3.getDayInGanZhi());
console.log("");

// 两种排盘对比
import { astro } from "iztro";

console.log("═══════════ 方案A(22日子时·早子时规则) ═══════════");
const chartA = astro.bySolar("2000-02-22", 0, 1, false);
chartA.palaces.forEach(p => {
  const ms = (p.majorStars||[]).map(s => {
    let txt = s.name+"("+s.brightness+")";
    if(s.mutagen) txt += "【"+s.mutagen+"】";
    return txt;
  }).join(",");
  const ns = (p.minorStars||[]).map(s => s.name+((s.mutagen&&s.mutagen!=="")?"【"+s.mutagen+"】":"")).join(",");
  const adj = (p.adjectiveStars||[]).map(s => s.name).join(",");
  const dx = p.decadal ? `[${p.decadal.range[0]}-${p.decadal.range[1]}岁]` : "";
  const cur = (p.decadal && p.decadal.range[0]<=26 && p.decadal.range[1]>=26) ? " ◀当前" : "";
  console.log(`  ${p.name}${dx}${cur}: 主=[${ms}] 辅=[${ns}] 杂=[${adj}]`+(p.isBodyPalace?" [身]":""));
});

console.log("\n═══════════ 方案B(23日子时·晚子时正确规则) ═══════════");
const chartB = astro.bySolar("2000-02-23", 0, 1, false);
chartB.palaces.forEach(p => {
  const ms = (p.majorStars||[]).map(s => {
    let txt = s.name+"("+s.brightness+")";
    if(s.mutagen) txt += "【"+s.mutagen+"】";
    return txt;
  }).join(",");
  const ns = (p.minorStars||[]).map(s => s.name+((s.mutagen&&s.mutagen!=="")?"【"+s.mutagen+"】":"")).join(",");
  const adj = (p.adjectiveStars||[]).map(s => s.name).join(",");
  const dx = p.decadal ? `[${p.decadal.range[0]}-${p.decadal.range[1]}岁]` : "";
  const cur = (p.decadal && p.decadal.range[0]<=26 && p.decadal.range[1]>=26) ? " ◀当前" : "";
  console.log(`  ${p.name}${dx}${cur}: 主=[${ms}] 辅=[${ns}] 杂=[${adj}]`+(p.isBodyPalace?" [身]":""));
});

console.log("\n═══════════ 四化对比 ═══════════");
console.log("方案A(22日):", JSON.stringify(chartA.palaces.flatMap(p=>(p.majorStars||[])).filter(s=>s.mutagen).map(s=>s.name+"【"+s.mutagen+"】→"+s.name)));
console.log("方案B(23日):", JSON.stringify(chartB.palaces.flatMap(p=>(p.majorStars||[])).filter(s=>s.mutagen).map(s=>s.name+"【"+s.mutagen+"】→"+s.name)));

const aSihua = {};
chartA.palaces.forEach(p => {(p.majorStars||[]).concat(p.minorStars||[]).forEach(s=>{if(s.mutagen)aSihua[s.mutagen]={star:s.name, palace:p.name};});});
const bSihua = {};
chartB.palaces.forEach(p => {(p.majorStars||[]).concat(p.minorStars||[]).forEach(s=>{if(s.mutagen)bSihua[s.mutagen]={star:s.name, palace:p.name};});});
console.log("A:", JSON.stringify(aSihua));
console.log("B:", JSON.stringify(bSihua));
process.stdout.write("\nDONE");
