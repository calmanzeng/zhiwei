
import { astro } from "iztro";

// 农历直排: 2005-11-06 未时(7) 女(1)
const chart = astro.byLunar("2005-11-06", 7, 1, false, false);

// 基础元数据
const meta = {
  zodiac: chart.zodiac,
  soul: chart.soul,
  body: chart.body,
  earthlyBranchOfSoulPalace: chart.earthlyBranchOfSoulPalace,
  earthlyBranchOfBodyPalace: chart.earthlyBranchOfBodyPalace,
  fiveElementsClass: chart.fiveElementsClass,
  sign: chart.sign,
  time: chart.time,
  timeRange: chart.timeRange,
  lunarDate: chart.lunarDate
};

// 12宫完整数据（含全部7层）
const palaces = chart.palaces.map(p => ({
  name: p.name,
  heavenlyStem: p.heavenlyStem,
  earthlyBranch: p.earthlyBranch,
  isBodyPalace: p.isBodyPalace,
  majorStars: (p.majorStars||[]).map(s => ({
    name: s.name,
    brightness: s.brightness,
    mutagen: s.mutagen || ""
  })),
  minorStars: (p.minorStars||[]).map(s => ({
    name: s.name,
    mutagen: s.mutagen || ""
  })),
  adjectiveStars: (p.adjectiveStars||[]).map(s => ({name: s.name})),
  changsheng12: p.changsheng12,
  boshi12: p.boshi12,
  jiangqian12: p.jiangqian12,
  suiqian12: p.suiqian12,
  decadal: p.decadal ? {
    range: p.decadal.range,
    heavenlyStem: p.decadal.heavenlyStem,
    earthlyBranch: p.decadal.earthlyBranch
  } : null
}));

process.stdout.write(JSON.stringify({meta, palaces}));
