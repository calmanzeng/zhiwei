
import { astro } from "iztro";
const chart = astro.bySolar("1987-05-11", 5, 1, false);
const output = {palaces: chart.palaces.map(p => ({
    name: p.name, index: p.index,
    heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
    isBodyPalace: p.isBodyPalace,
    majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen})),
    minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
    adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
    decadal: p.decadal ? {range: p.decadal.range} : null
}))};
process.stdout.write(JSON.stringify(output));
