
import { astro } from "iztro";
const chart = astro.bySolar("2006-09-24", 8, 0, false);
// Print all palace extra fields
for (const p of chart.palaces) {
  const name = p.name;
  console.log(`【${name}】长生:${p.changsheng12} 博士:${p.boshi12} 将前:${p.jiangqian12} 岁前:${p.suiqian12}`);
  // Also print all minor and adjective stars
  const minor = p.minorStars.map(s => s.name).join(",");
  const adj = p.adjectiveStars.map(s => s.name).join(",");
  if (minor) console.log(`  minor: ${minor}`);
  if (adj) console.log(`  adj:   ${adj}`);
  console.log("");
}
