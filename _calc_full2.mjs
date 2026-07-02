
import { astro } from "iztro";
const chart = astro.byLunar("1998-05-11", 7, 0, false, false);
// Get all stars with their positions including four transformations
function getStarPositions(palaces) {
    const result = {};
    for (const p of palaces) {
        for (const s of p.majorStars || []) {
            result[s.name] = { palace: p.name, type: "major", brightness: s.brightness, mutagen: s.mutagen || null };
        }
        for (const s of p.minorStars || []) {
            result[s.name] = { palace: p.name, type: "minor", mutagen: s.mutagen || null };
        }
    }
    return result;
}

const starPos = getStarPositions(chart.palaces);
const earthBranchNames = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

// Get 流年命宫 for each age
// 命宫在亥(earthBranch=亥, index=11)
function getFlowPalace(age, mingZhi) {
    const idx = (earthBranchNames.indexOf(mingZhi) + (age - 1)) % 12;
    return earthBranchNames[idx];
}

// 流年四化 for each 天干
const SIHUA = {
    "甲": ["廉贞","破军","武曲","太阳"],
    "乙": ["天机","天梁","紫微","太阴"],
    "丙": ["天同","天机","文昌","廉贞"],
    "丁": ["太阴","天同","天机","巨门"],
    "戊": ["贪狼","太阴","右弼","天机"],
    "己": ["武曲","贪狼","天梁","文曲"],
    "庚": ["太阳","武曲","太阴","天同"],
    "辛": ["巨门","太阳","文曲","文昌"],
    "壬": ["天梁","紫微","左辅","武曲"],
    "癸": ["破军","巨门","太阴","贪狼"]
};

// 天干地支 for year
const GAN = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const ZHI = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

function getYearGanZhi(year) {
    const ganIdx = (year - 4) % 10;
    const zhiIdx = (year - 4) % 12;
    return { gan: GAN[ganIdx], zhi: ZHI[zhiIdx] };
}

// For each year 2026-2035, calculate flow palace and four transformations
const results = {};
for (let year = 2026; year <= 2035; year++) {
    const {gan, zhi} = getYearGanZhi(year);
    const xusui = year - 1998 + 1; // 虚岁
    const flowZhi = getFlowPalace(xusui, "亥"); // 命宫在亥
    const sihua = SIHUA[gan];
    
    // Find which palaces the flow year four transformations land in
    const flowLuStar = sihua[0], flowQuanStar = sihua[1], flowKeStar = sihua[2], flowJiStar = sihua[3];
    
    results[year] = {
        ganZhi: gan + zhi,
        xusui: xusui,
        flowPalaceZhi: flowZhi,
        sihua: {
            lu: {star: flowLuStar, palace: starPos[flowLuStar]?.palace || "?"},
            quan: {star: flowQuanStar, palace: starPos[flowQuanStar]?.palace || "?"},
            ke: {star: flowKeStar, palace: starPos[flowKeStar]?.palace || "?"},
            ji: {star: flowJiStar, palace: starPos[flowJiStar]?.palace || "?"}
        }
    };
}

// Get chart info
console.log(JSON.stringify({
    solarDate: chart.solarDate,
    lunarDate: chart.lunarDate,
    time: chart.time,
    zodiac: chart.zodiac,
    heavenlyStem: chart.heavenlyStem,
    earthlyBranch: chart.earthlyBranch,
    yearDesign: chart.yearDesign,
    monthDesign: chart.monthDesign,
    dayDesign: chart.dayDesign,
    timeDesign: chart.timeDesign,
    starPositions: starPos,
    flowYears: results,
    palaces: chart.palaces.map(p => ({
        name: p.name,
        heavenlyStem: p.heavenlyStem,
        earthlyBranch: p.earthlyBranch,
        isBodyPalace: p.isBodyPalace,
        majorStars: (p.majorStars||[]).map(s => ({name:s.name, brightness:s.brightness, mutagen:s.mutagen||""})),
        minorStars: (p.minorStars||[]).map(s => ({name:s.name, mutagen:s.mutagen||""})),
        adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
        changsheng12: p.changsheng12,
        boshi12: p.boshi12,
        jiangqian12: p.jiangqian12,
        suiqian12: p.suiqian12,
        decadal: p.decadal ? {range: p.decadal.range} : null
    }))
}));
