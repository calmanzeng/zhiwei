
import { astro } from "iztro";
const chart = astro.bySolar("1996-11-17", 6, 0, false);
const palaces = chart.palaces.map(p => ({
  name: p.name, heavenlyStem: p.heavenlyStem, earthlyBranch: p.earthlyBranch,
  majorStars: (p.majorStars||[]).map(s => ({name:s.name,brightness:s.brightness,mutagen:s.mutagen||""})),
  minorStars: (p.minorStars||[]).map(s => ({name:s.name,mutagen:s.mutagen||""})),
  adjectiveStars: (p.adjectiveStars||[]).map(s => ({name:s.name})),
  changsheng12: p.changsheng12, boshi12: p.boshi12, jiangqian12: p.jiangqian12, suiqian12: p.suiqian12
}));
process.stdout.write(JSON.stringify({palaces}));
