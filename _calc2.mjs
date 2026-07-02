
import { astro } from "iztro";

const chart = astro.byLunar("2005-11-06", 7, 1, false, false);

// 收集所有四化
let sihua = [];
for (const p of chart.palaces) {
  for (const s of p.majorStars) {
    if (s.mutagen) {
      sihua.push({star: s.name, hua: s.mutagen, palace: p.name, brightness: s.brightness});
    }
  }
  for (const s of p.majorStars) {
    if (s.mutagen) {
      // get the mutagen
    }
  }
}

// 也看辅星四化
for (const p of chart.palaces) {
  for (const s of p.minorStars) {
    if (s.mutagen) {
      sihua.push({star: s.name, hua: s.mutagen, palace: p.name, brightness: "", isMinor: true});
    }
  }
}

// 各宫借星
let borrowInfo = [];
for (const p of chart.palaces) {
  if ((p.majorStars||[]).length === 0) {
    // 空宫，找对宫
    const oppZhi = {"子":"午","丑":"未","寅":"申","卯":"酉","辰":"戌","巳":"亥","午":"子","未":"丑","申":"寅","酉":"卯","戌":"辰","亥":"巳"};
    const opp = oppZhi[p.earthlyBranch];
    const oppPalace = chart.palaces.find(op => op.earthlyBranch === opp);
    if (oppPalace && oppPalace.majorStars.length > 0) {
      borrowInfo.push({
        palace: p.name,
        borrowFrom: oppPalace.name,
        stars: oppPalace.majorStars.map(s => `${s.name}(${s.brightness})`),
        adj: oppPalace.adjectiveStars.map(s => s.name)
      });
    } else {
      borrowInfo.push({palace: p.name, borrowFrom: "无", stars: ["无星可借"]});
    }
  }
}

process.stdout.write(JSON.stringify({
  sihua,
  borrowInfo,
  solarTerms: chart.solarTerms || null,
  yearGanZhi: null,
  monthGanZhi: null,
  dayGanZhi: null,
  hourGanZhi: null,
  age: null
}));
