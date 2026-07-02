
import { astro } from "iztro";
import { getConfig } from "iztro";

// 先看当前 dayDivide 配置
const cfg = getConfig();
process.stdout.write("当前 dayDivide: " + cfg.dayDivide + "\n");

// 法1：用户23:50在阳历2002-01-01，用晚子时(hour=12)
process.stdout.write("\n=== 法1: 阳历2002-01-01 晚子时(23:00~00:00) ===\n");
const c1 = astro.bySolar("2002-01-01", 12, 0, false);
process.stdout.write("四柱: " + c1.chineseDate + "\n");
process.stdout.write("阳历: " + c1.solarDate + " 农历: " + c1.lunarDate + "\n");
const mc1 = c1.palaces.find(p => p.name==='命宫');
process.stdout.write("命宫: " + mc1.heavenlyStem + mc1.earthlyBranch + "\n");
process.stdout.write("主星: " + JSON.stringify(mc1.majorStars.map(s => s.name+(s.brightness||"")+(s.mutagen||""))) + "\n");

// 法2: 用阳历19日早子时(hour=0)
process.stdout.write("\n=== 法2: 阳历2002-01-02 早子时(00:00~01:00) ===\n");
const c2 = astro.bySolar("2002-01-02", 0, 0, false);
process.stdout.write("四柱: " + c2.chineseDate + "\n");
process.stdout.write("阳历: " + c2.solarDate + " 农历: " + c2.lunarDate + "\n");
const mc2 = c2.palaces.find(p => p.name==='命宫');
process.stdout.write("命宫: " + mc2.heavenlyStem + mc2.earthlyBranch + "\n");
process.stdout.write("主星: " + JSON.stringify(mc2.majorStars.map(s => s.name+(s.brightness||"")+(s.mutagen||""))) + "\n");

// 法3: 农历19日子时
process.stdout.write("\n=== 法3: 农历2001-11-19 子时 ===\n");
const c3 = astro.byLunar("2001-11-19", 0, 0, false, false);
process.stdout.write("四柱: " + c3.chineseDate + "\n");
process.stdout.write("阳历: " + c3.solarDate + " 农历: " + c3.lunarDate + "\n");
const mc3 = c3.palaces.find(p => p.name==='命宫');
process.stdout.write("命宫: " + mc3.heavenlyStem + mc3.earthlyBranch + "\n");
process.stdout.write("主星: " + JSON.stringify(mc3.majorStars.map(s => s.name+(s.brightness||"")+(s.mutagen||""))) + "\n");

// 对比三种方法是否一致
process.stdout.write("\n=== 结论 ===\n");
const match = (c1.chineseDate === c2.chineseDate && c2.chineseDate === c3.chineseDate);
process.stdout.write("三法四柱一致: " + (match ? "✅ 是" : "❌ 否") + "\n");

// 列出四化比较
const tables = [c1, c2, c3];
tables.forEach((c, i) => {
  process.stdout.write("\n法" + (i+1) + " 四化: ");
  c.palaces.forEach(p => {
    p.majorStars.forEach(s => { if(s.mutagen) process.stdout.write(s.name + s.mutagen + "→" + p.name + " "); });
    p.minorStars.forEach(s => { if(s.mutagen) process.stdout.write(s.name + s.mutagen + "→" + p.name + " "); });
  });
});
