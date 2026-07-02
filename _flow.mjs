
import { astro } from "iztro";

const chart = astro.bySolar("2002-01-01", 12, 0, false);

// 输出全部数据
const out = {
  chineseDate: chart.chineseDate,
  palaces: chart.palaces.map(p => ({
    name: p.name,
    heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
    isBodyPalace: p.isBodyPalace || false,
    majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness||"",mutagen:s.mutagen||""})),
    minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
    adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
    changsheng12: p.changsheng12||"",
    boshi12: p.boshi12||"",
    jiangqian12: p.jiangqian12||"",
    suiqian12: p.suiqian12||"",
    decadal: p.decadal ? {range: p.decadal.range} : null
  }))
};

import { writeFileSync } from "fs";
writeFileSync("C:/Users/Administrator/.hermes/scripts/_flow_data.json", JSON.stringify(out), "utf-8");
console.log("DONE");
