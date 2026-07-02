
import { astro } from "iztro";
const chart = astro.bySolar("2004-11-14", 7, 1, false);
const meta = {
  zodiac: chart.zodiac || null,
  soul: chart.soul || null,
  body: chart.body || null,
  earthlyBranchOfSoulPalace: chart.earthlyBranchOfSoulPalace || null,
  earthlyBranchOfBodyPalace: chart.earthlyBranchOfBodyPalace || null,
  fiveElementsClass: chart.fiveElementsClass || null,
  sign: chart.sign || null,
  chineseDate: chart.chineseDate || null,
  time: chart.time || null,
  timeRange: chart.timeRange || null,
  lunarDate: chart.lunarDate || null
};
const palaces = chart.palaces.map(p => ({
  name: p.name, heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
  isBodyPalace: p.isBodyPalace,
  majorStars: (p.majorStars||[]).map(s => ({name:s.name, brightness:s.brightness||"", mutagen:s.mutagen||""})),
  minorStars: (p.minorStars||[]).map(s => ({name:s.name, mutagen:s.mutagen||""})),
  adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
  changsheng12: p.changsheng12, boshi12: p.boshi12,
  jiangqian12: p.jiangqian12, suiqian12: p.suiqian12,
  decadal: p.decadal ? {range: p.decadal.range} : null
}));
process.stdout.write(JSON.stringify({meta, palaces}));
