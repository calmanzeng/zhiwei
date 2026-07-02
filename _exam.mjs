
import { astro } from "iztro";
const chart = astro.bySolar("2008-06-26", 8, 0, false);

// Get full detail for key exam-related palaces
const output = {
  palaces: chart.palaces.map(p => ({
    name: p.name, heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
    isBodyPalace: p.isBodyPalace,
    majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen||""})),
    minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
    adjectiveStars: (p.adjectiveStars||[]).map(s => s.name),
    changsheng12: p.changsheng12, boshi12: p.boshi12,
    jiangqian12: p.jiangqian12, suiqian12: p.suiqian12,
  }))
};
process.stdout.write(JSON.stringify(output));
