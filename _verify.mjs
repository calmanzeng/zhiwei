
import { astro } from "iztro";

function dumpPalaces(chart, label) {
  const info = {
    label: label,
    solarDate: chart.solarDate,
    lunarDate: chart.lunarDate,
    chineseDate: chart.chineseDate,
    palaces: {}
  };
  chart.palaces.forEach(p => {
    info.palaces[p.name] = {
      heavenlyStem: p.heavenlyStem,
      earthlyBranch: p.earthlyBranch,
      majorStars: p.majorStars.map(s => s.name + (s.brightness||"") + (s.mutagen||"")),
      minorStars: p.minorStars.map(s => s.name + (s.mutagen||"")),
      adjectiveStars: p.adjectiveStars.map(s => s.name)
    };
  });
  return info;
}

// Method 1: bySolar → 2002-01-01 子时 (lunar 18th)
const c1 = astro.bySolar("2002-01-01", 0, 0, false);
// Method 2: bySolar → 2002-01-02 子时 (lunar 19th)
const c2 = astro.bySolar("2002-01-02", 0, 0, false);
// Method 3: byLunar → 2001-11-18 子时
const c3 = astro.byLunar(2001, 11, 18, 0, 0, false, false);
// Method 4: byLunar → 2001-11-19 子时
const c4 = astro.byLunar(2001, 11, 19, 0, 0, false, false);

const out = {
  bySolar_18th: dumpPalaces(c1, "bySolar 2002-01-01 子时"),
  bySolar_19th: dumpPalaces(c2, "bySolar 2002-01-02 子时"),
  byLunar_18th: dumpPalaces(c3, "byLunar 2001-11-18 子时"),
  byLunar_19th: dumpPalaces(c4, "byLunar 2001-11-19 子时")
};

process.stdout.write(JSON.stringify(out, null, 2));
