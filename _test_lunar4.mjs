
import { astro } from "iztro";

// byLunar takes a single date string
try {
  const c = astro.byLunar("2001-11-18", 0, 0, false, false);
  process.stdout.write("byLunar('2001-11-18') solar=" + c.solarDate + " lunar=" + c.lunarDate + " cd=" + c.chineseDate + "\n");
  
  // Output 命宫 + 四化
  const mc = c.palaces.find(p => p.name === '命宫');
  process.stdout.write("命宫: " + mc.heavenlyStem + mc.earthlyBranch + "\n");
  process.stdout.write("主星: " + JSON.stringify(mc.majorStars.map(s => ({n:s.name,b:s.brightness,m:s.mutagen||""}))) + "\n");
  process.stdout.write("四化:\n");
  c.palaces.forEach(p => {
    p.majorStars.forEach(s => { if(s.mutagen) process.stdout.write("  " + s.name + s.mutagen + "->" + p.name + "\n"); });
    p.minorStars.forEach(s => { if(s.mutagen) process.stdout.write("  " + s.name + s.mutagen + "->" + p.name + "\n"); });
  });
} catch(e) {
  process.stdout.write("byLunar('2001-11-18') ERROR: " + e.message + "\n");
  process.stdout.write("STACK: " + e.stack?.substring(0,300) + "\n");
}
