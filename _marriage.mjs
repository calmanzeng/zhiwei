
import { astro } from "iztro";
import { Lunar } from "lunar-javascript";
const lunar = Lunar.fromYmd(1987, 4, 14);
const solar = lunar.getSolar();
const chart = astro.bySolar(solar.toYmd(), 5, 1, false);
const output = {palaces: chart.palaces.map(p => ({
    name: p.name, heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
    isBodyPalace: p.isBodyPalace,
    majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen||""})),
    minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
    adjectiveStars: (p.adjectiveStars||[]).map(s => s.name),
    changsheng12: p.changsheng12, boshi12: p.boshi12,
    jiangqian12: p.jiangqian12, suiqian12: p.suiqian12,
    decadal: p.decadal ? {range: p.decadal.range} : null
}))};
process.stdout.write(JSON.stringify(output));
