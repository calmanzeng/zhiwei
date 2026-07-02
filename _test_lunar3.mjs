
import { astro } from "iztro";

// Try byLunar with various string formats
try {
  const c = astro.byLunar("2001", "11", "18", 0, 0, false, false);
  process.stdout.write("A byLunar('2001','11','18') solar=" + c.solarDate + "\n");
} catch(e) {
  process.stdout.write("A ERROR: " + e.message + "\n");
}

try {
  const c = astro.byLunar("2001", 11, 18, 0, 0, false, false);
  process.stdout.write("B byLunar('2001',11,18) solar=" + c.solarDate + "\n");
} catch(e) {
  process.stdout.write("B ERROR: " + e.message + "\n");
}

// Check what signature byLunar expects
process.stdout.write("astro.byLunar = " + astro.byLunar.toString().substring(0,200) + "\n");
