
import { astro } from "iztro";

// 测试: 2000-02-22, hourIndex=12 (晚子时)
console.log("--- 方案C: astro.bySolar(2000-02-22, 12=晚子时) ---");
const chartC = astro.bySolar("2000-02-22", 12, 1, false);
console.log("命宫:", chartC.earthlyBranchOfSoulPalace, "身宫:", chartC.earthlyBranchOfBodyPalace, "五行局:", chartC.fiveElementsClass);
chartC.palaces.forEach(p => {
  const ms = (p.majorStars||[]).map(s => {
    let txt = s.name+"("+s.brightness+")";
    if(s.mutagen) txt += "【"+s.mutagen+"】";
    return txt;
  }).join(",");
  const ns = (p.minorStars||[]).map(s => s.name).join(",");
  const adj = (p.adjectiveStars||[]).map(s => s.name).join(",");
  const cur = (p.decadal && p.decadal.range[0]<=26 && p.decadal.range[1]>=26) ? " ◀当前" : "";
  console.log(`  ${p.name}${p.decadal?"["+p.decadal.range[0]+"-"+p.decadal.range[1]+"岁]":""}${cur}: 主=[${ms}] 辅=[${ns}] 杂=[${adj}]`+(p.isBodyPalace?" [身]":""));
});

// 验证hourIndex范围
console.log("\n--- iztro hourIndex 范围测试 ---");
for(let h=0;h<=12;h++) {
  try {
    const ch = astro.bySolar("2000-02-22", h, 1, false);
    if(ch && ch.fiveElementsClass) {
      console.log(`  hourIndex=${h}: √ 五行局=${ch.fiveElementsClass}`);
    }
  } catch(e) {
    console.log(`  hourIndex=${h}: ✗ ${e.message||"error"}`);
  }
}
process.stdout.write("\nDONE");
