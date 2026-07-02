
import { astro } from "iztro";
import iztro from "iztro";

// 法1：用户23:50在阳历2002-01-01，用晚子时(hour=12)
process.stdout.write("=== 法1: 阳历2002-01-01 晚子时(23:00~00:00) ===\n");
const c1 = astro.bySolar("2002-01-01", 12, 0, false);
process.stdout.write("四柱: " + c1.chineseDate + "\n");
process.stdout.write("阳历: " + c1.solarDate + "\n");
const mc1 = c1.palaces.find(p => p.name==='命宫');
process.stdout.write("命宫: " + mc1.heavenlyStem + mc1.earthlyBranch + "\n");
process.stdout.write("主星: " + mc1.majorStars.map(s => s.name+(s.brightness||"")+(s.mutagen||"")).join(", ") + "\n");

// 法2: 用阳历19日早子时(hour=0)
process.stdout.write("\n=== 法2: 阳历2002-01-02 早子时(00:00~01:00) ===\n");
const c2 = astro.bySolar("2002-01-02", 0, 0, false);
mc2_mc = c2.palaces.find(p => p.name==='命宫');
process.stdout.write("四柱: " + c2.chineseDate + "\n");
process.stdout.write("命宫: " + mc2_mc.heavenlyStem + mc2_mc.earthlyBranch + "\n");
process.stdout.write("主星: " + mc2_mc.majorStars.map(s => s.name+(s.brightness||"")+(s.mutagen||"")).join(", ") + "\n");

// 法3: 农历19日子时
process.stdout.write("\n=== 法3: 农历2001-11-19 子时 ===\n");
const c3 = astro.byLunar("2001-11-19", 0, 0, false, false);
mc3_mc = c3.palaces.find(p => p.name==='命宫');
process.stdout.write("四柱: " + c3.chineseDate + "\n");
process.stdout.write("命宫: " + mc3_mc.heavenlyStem + mc3_mc.earthlyBranch + "\n");
process.stdout.write("主星: " + mc3_mc.majorStars.map(s => s.name+(s.brightness||"")+(s.mutagen||"")).join(", ") + "\n");

// 三法四化对比
process.stdout.write("\n=== 四化对比 ===\n");
[c1,c2,c3].forEach((c, i) => {
  const sihua = [];
  c.palaces.forEach(p => {
    p.majorStars.forEach(s => { if(s.mutagen) sihua.push(s.name+s.mutagen+"->"+p.name); });
    p.minorStars.forEach(s => { if(s.mutagen) sihua.push(s.name+s.mutagen+"->"+p.name); });
  });
  process.stdout.write("法" + (i+1) + ": " + sihua.join(", ") + "\n");
});

process.stdout.write("\n✅ 结论：三法完全一致 = " + ((c1.chineseDate===c2.chineseDate&&c2.chineseDate===c3.chineseDate)?"是":"否") + "\n");
