
import { astro } from "iztro";
const chart = astro.bySolar("1998-10-27", 11, 1, false);
for (const p of chart.palaces) {
  for (const s of [...(p.majorStars||[]), ...(p.minorStars||[])]) {
    if (s.mutagen) console.log(p.name + "." + s.name + " -> " + s.mutagen);
  }
}
