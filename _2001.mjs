
import { Solar, Lunar } from "lunar-javascript";
import { astro } from "iztro";
const solar = Solar.fromYmd(2001, 11, 20);
const lunar = solar.getLunar();
const chart = astro.bySolar("2001-11-20", 11, 0, false);
const output = {
  yearGan: lunar.getYearGan(), yearZhi: lunar.getYearZhi(),
  lunarInfo: lunar.toString(),
  soulPalace: chart.earthlyBranchOfSoulPalace,
  bodyPalace: chart.earthlyBranchOfBodyPalace,
  fiveElements: chart.fiveElementsClass, soul: chart.soul, body: chart.body,
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
