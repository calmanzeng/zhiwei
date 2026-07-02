
import { astro } from "iztro";

function chartToJson(chart) {
  const info = {
    solarDate: chart.solarDate,
    lunarDate: chart.lunarDate,
    chineseDate: chart.chineseDate,
    zodiac: chart.zodiac,
    currentDecadal: chart.currentDecadal ? {range: chart.currentDecadal.range} : null,
    palaces: chart.palaces.map(p => ({
      name: p.name,
      heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
      isBodyPalace: p.isBodyPalace,
      majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen||""})),
      minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
      adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
      changsheng12: p.changsheng12,
      boshi12: p.boshi12,
      jiangqian12: p.jiangqian12,
      suiqian12: p.suiqian12,
      decadal: p.decadal ? {range: p.decadal.range, heavenlyStem: p.decadal.heavenlyStem, earthlyBranch: p.decadal.earthlyBranch} : null
    }))
  };
  return info;
}

// 场景A：2002-01-01 子时 女
const chartA = astro.bySolar("2002-01-01", 0, 0, false);
// 场景B：2002-01-02 子时 女
const chartB = astro.bySolar("2002-01-02", 0, 0, false);

process.stdout.write(JSON.stringify({A: chartToJson(chartA), B: chartToJson(chartB)}));
