
import { astro } from "iztro";

// 农历18日子时
const c18 = astro.byLunar("2001-11-18", 0, 0, false, false);
// 农历19日子时  
const c19 = astro.byLunar("2001-11-19", 0, 0, false, false);

function dump(chart, label) {
  process.stdout.write("\n====== " + label + " ======\n");
  process.stdout.write("阳历: " + (chart.solarDate||"") + "\n");
  process.stdout.write("农历: " + (chart.lunarDate||"") + "\n");
  process.stdout.write("四柱: " + (chart.chineseDate||"") + "\n");
  process.stdout.write("生肖: " + (chart.zodiac||"") + "\n");
  
  chart.palaces.forEach(p => {
    const majors = p.majorStars.map(s => s.name + "(" + (s.brightness||"") + (s.mutagen||"") + ")").join(", ");
    const minors = p.minorStars.map(s => s.name + (s.mutagen||"")).join(", ");
    const adjs = p.adjectiveStars.map(s => s.name).join(", ");
    const fields = [];
    if(p.changsheng12) fields.push("长生:"+p.changsheng12);
    if(p.boshi12) fields.push("博士:"+p.boshi12);
    if(p.jiangqian12) fields.push("将前:"+p.jiangqian12);
    if(p.suiqian12) fields.push("岁前:"+p.suiqian12);
    
    process.stdout.write(p.name + "(" + p.heavenlyStem + p.earthlyBranch + "): ");
    process.stdout.write("主[" + (majors||"空") + "] | ");
    process.stdout.write("辅[" + (minors||"-") + "] | ");
    process.stdout.write("杂[" + (adjs||"-") + "] | ");
    process.stdout.write(fields.join(" "));
    if(p.decadal && p.decadal.range) process.stdout.write(" | 大限" + p.decadal.range[0] + "-" + p.decadal.range[1] + "岁");
    process.stdout.write("\n");
  });
}

dump(c18, "农历2001-11-18 子时（晚子时：23:00~00:00）");
dump(c19, "农历2001-11-19 子时（早子时：00:00~01:00）");
