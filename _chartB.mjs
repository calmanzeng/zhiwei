
import { astro } from "iztro";
import fs from "fs";

function chartToJson(chart) {
  const info = {
    solarDate: chart.solarDate,
    lunarDate: chart.lunarDate,
    chineseDate: chart.chineseDate,
    zodiac: chart.zodiac,
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

const chartB = astro.bySolar("2002-01-02", 0, 0, false);
fs.writeFileSync("C:/Users/Administrator/.hermes/scripts/_chart_b.json", JSON.stringify(chartToJson(chartB), null, 2), "utf-8");
console.log("OK");
