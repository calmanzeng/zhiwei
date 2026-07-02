import { astro } from "iztro";
import { Solar } from "lunar-javascript";

// Parse command line: node calc.mjs "1994-10-15" 6 0 false
const args = process.argv.slice(2);
const solarDate = args[0] || "1994-10-15";
const hourBranch = parseInt(args[1] || "6");  // 0=子, 6=午
const gender = args[2] === "1" ? 1 : 0;       // 0=女, 1=男
const isLeapMonth = args[3] === "true";        // default false

// Verify the solar date
const solar = Solar.fromYmd(
  parseInt(solarDate.split("-")[0]),
  parseInt(solarDate.split("-")[1]),
  parseInt(solarDate.split("-")[2])
);
const lunar = solar.getLunar();

// Generate chart
const chart = astro.bySolar(solarDate, hourBranch, gender, isLeapMonth);

// Extract sihua from all stars
const sihuaMap = {};
for (const p of chart.palaces) {
  for (const starList of [p.majorStars, p.minorStars]) {
    for (const s of starList) {
      if (s.mutagen && s.mutagen !== "") {
        sihuaMap[s.mutagen] = { star: s.name, palace: p.name };
      }
    }
  }
}

// Build output
const output = {
  birthInfo: {
    solarDate,
    lunarDate: lunar.toString(),
    yearGan: lunar.getYearGan(),
    yearZhi: lunar.getYearZhi(),
    hourBranch,
    hourName: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"][hourBranch],
    gender: gender === 1 ? "男" : "女"
  },
  chart: {
    earthlyBranchOfSoulPalace: chart.earthlyBranchOfSoulPalace,
    earthlyBranchOfBodyPalace: chart.earthlyBranchOfBodyPalace,
    fiveElementsClass: chart.fiveElementsClass,
    soul: chart.soul,
    body: chart.body,
    sihua: sihuaMap
  },
  palaces: chart.palaces.map(p => ({
    name: p.name,
    index: p.index,
    heavenlyStem: p.heavenlyStem,
    earthlyBranch: p.earthlyBranch,
    isBodyPalace: p.isBodyPalace,
    decadal: p.decadal ? { range: p.decadal.range } : null,
    majorStars: (p.majorStars || []).map(s => ({
      name: s.name, brightness: s.brightness, mutagen: s.mutagen
    })),
    minorStars: (p.minorStars || []).map(s => ({
      name: s.name, mutagen: s.mutagen
    })),
    adjectiveStars: (p.adjectiveStars || []).map(s => ({
      name: s.name
    }))
  })),
  copyright: chart.copyright
};

// Output JSON to stdout
process.stdout.write(JSON.stringify(output));
