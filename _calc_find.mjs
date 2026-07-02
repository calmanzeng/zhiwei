
import { astro } from "iztro";
const chart = astro.bySolar("1996-11-17", 6, 0, false);
const palaces = chart.palaces.map(p => ({
  name: p.name,
  majorStars: (p.majorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
  minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
  adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name}))
}));
process.stdout.write(JSON.stringify({palaces}));
