
import { astro } from "iztro";
import { Solar, Lunar } from "lunar-javascript";

const chart = astro.bySolar("1987-05-11", 5, 1, false);

// Build detailed analysis
const output = {
  birthInfo: {
    solarDate: "1987-05-11",
    lunarDate: "一九八七年四月十四",
    hourName: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"][5],
    gender: "男",
    yearGan: "丁",
    yearZhi: "卯"
  },
  chart: {
    soulPalace: chart.earthlyBranchOfSoulPalace,
    bodyPalace: chart.earthlyBranchOfBodyPalace,
    fiveElements: chart.fiveElementsClass,
    soul: chart.soul,
    body: chart.body
  },
  palaces: chart.palaces.map(p => ({
    name: p.name, index: p.index,
    heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
    isBodyPalace: p.isBodyPalace,
    majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen})),
    minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
    adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
    decadal: p.decadal ? {range: p.decadal.range} : null
  }))
};

// Collect all sihua
const sihuaMap = {};
for (const p of chart.palaces) {
  for (const sl of [p.majorStars, p.minorStars]) {
    for (const s of sl) {
      if (s.mutagen && s.mutagen !== "") {
        const huaName = {lu:"化禄",quan:"化权",ke:"化科",ji:"化忌"}[s.mutagen] || s.mutagen;
        sihuaMap[huaName] = {star: s.name, palace: p.name};
      }
    }
  }
}
output.chart.sihua = sihuaMap;

// Find patterns
const starToPalace = {};
for (const p of chart.palaces) {
  for (const s of p.majorStars||[]) {
    starToPalace[s.name] = p.name;
  }
}

output.starMap = starToPalace;
process.stdout.write(JSON.stringify(output, null, 2));
