
import { astro } from "iztro";
import { Solar, Lunar } from "lunar-javascript";

const solar = Solar.fromYmd(2026, 9, 27);
const lunar = solar.getLunar();
console.log("阳历2026-09-27 -> 农历:", lunar.toString());
console.log("年干:", lunar.getYearGan(), "年支:", lunar.getYearZhi());

const chart = astro.bySolar("2026-09-27", 5, 0, false);
const output = {
  lunarYear: lunar.getYear(), lunarMonth: Math.abs(lunar.getMonth()), lunarDay: lunar.getDay(),
  yearGan: lunar.getYearGan(), yearZhi: lunar.getYearZhi(),
  soulPalace: chart.earthlyBranchOfSoulPalace,
  bodyPalace: chart.earthlyBranchOfBodyPalace,
  fiveElements: chart.fiveElementsClass,
  soul: chart.soul, body: chart.body,
  palaces: chart.palaces.map(p => ({
    name: p.name, heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
    isBodyPalace: p.isBodyPalace,
    majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen||""})),
    minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
    adjectiveStars: (p.adjectiveStars||[]).map(s => s.name),
    changsheng12: p.changsheng12, boshi12: p.boshi12,
    jiangqian12: p.jiangqian12, suiqian12: p.suiqian12,
    decadal: p.decadal ? {range: p.decadal.range} : null
  }))
};
process.stdout.write(JSON.stringify(output));
