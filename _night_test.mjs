
import { astro } from "iztro";

// 关键测试：晚子时的处理
// 如果出生在 2002-01-01 23:50（这是己巳日的晚子时）
// iztro 的 bySolar 用 2002-01-01 子时 -> 会当 00:00-01:00 还是 23:00-01:00？

// 测试1: bySolar 2002-01-01 子时
const c1 = astro.bySolar("2002-01-01", 0, 0, false);
process.stdout.write("Test1: bySolar(2002-01-01, 子时, 女)\n");
process.stdout.write("  四柱: " + c1.chineseDate + "\n");  
process.stdout.write("  阳历: " + c1.solarDate + " 农历: " + c1.lunarDate + "\n");
const mc1 = c1.palaces.find(p => p.name==='命宫');
process.stdout.write("  命宫: " + mc1.heavenlyStem + mc1.earthlyBranch + "\n");
process.stdout.write("  命主星: " + JSON.stringify(mc1.majorStars.map(s => s.name+s.mutagen)) + "\n\n");

// 测试2: bySolar 2002-01-02 子时  
const c2 = astro.bySolar("2002-01-02", 0, 0, false);
process.stdout.write("Test2: bySolar(2002-01-02, 子时, 女)\n");
process.stdout.write("  四柱: " + c2.chineseDate + "\n");
process.stdout.write("  阳历: " + c2.solarDate + " 农历: " + c2.lunarDate + "\n");
const mc2 = c2.palaces.find(p => p.name==='命宫');
process.stdout.write("  命宫: " + mc2.heavenlyStem + mc2.earthlyBranch + "\n");
process.stdout.write("  命主星: " + JSON.stringify(mc2.majorStars.map(s => s.name+s.mutagen)) + "\n\n");

// 测试3: check if iztro has a "lateHour" parameter
process.stdout.write("astro.bySolar.toString():\n" + astro.bySolar.toString().substring(0,500) + "\n\n");

// 看 iztro 如何处理夜子时
// 检查是否存在晚子时参数
try {
  // 有些 iztro 版本支持 timeIndex = 12 代表晚子时
  const c3 = astro.bySolar("2002-01-01", 12, 0, false);
  process.stdout.write("Test3: bySolar(2002-01-01, hour=12=晚子时, 女)\n");
  process.stdout.write("  四柱: " + c3.chineseDate + "\n");
  process.stdout.write("  阳历: " + c3.solarDate + " 农历: " + c3.lunarDate + "\n");
} catch(e) {
  process.stdout.write("Test3: bySolar with hour=12 ERROR: " + e.message + "\n");
  try {
    // 试试 timeIndex = -1
    const c4 = astro.bySolar("2002-01-01", -1, 0, false);
    process.stdout.write("Test4: bySolar(2002-01-01, hour=-1=晚子时, 女)\n");
    process.stdout.write("  四柱: " + c4.chineseDate + "\n");
  } catch(e2) {
    process.stdout.write("Test4: ERROR: " + e2.message + "\n");
  }
}

// 查看 iztro 版本
import { readFileSync } from "fs";
const pkg = JSON.parse(readFileSync("node_modules/iztro/package.json", "utf-8"));
process.stdout.write("\niztro版本: " + pkg.version + "\n");
