
import { astro } from "iztro";
const chart = astro.bySolar("2006-09-24", 8, 0, false);
// Check minorStars for mutagen too
for (const p of chart.palaces) {
  for (const s of p.minorStars) {
    if (s.mutagen) {
      console.log(p.name + ".minor." + s.name + " -> " + s.mutagen);
    }
  }
}
// Also try adjectiveStars
for (const p of chart.palaces) {
  for (const s of p.adjectiveStars) {
    if (s.mutagen) {
      console.log(p.name + ".adj." + s.name + " -> " + s.mutagen);
    }
  }
}
