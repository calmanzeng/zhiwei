
import { astro } from "iztro";
const chart = astro.bySolar("1987-05-11", 5, 1, false);
process.stdout.write(JSON.stringify(chart.palaces.map(p => ({
  name: p.name,
  heavenlyStem: p.heavenlyStem,
  earthlyBranch: p.earthlyBranch,
  isBodyPalace: p.isBodyPalace,
  majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen})),
  minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
  adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
  decadal: p.decadal
}))));
