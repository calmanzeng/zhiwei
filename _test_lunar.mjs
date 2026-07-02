
import { astro } from "iztro";

try {
  const c = astro.byLunar(2001, 11, 18, 0, 0, false, false);
  process.stdout.write("byLunar(2001,11,18,...) solar=" + c.solarDate + " lunar=" + c.lunarDate + "\n");
} catch(e) {
  process.stdout.write("byLunar(2001,11,18,...) ERROR: " + e.message + "\n");
}

try {
  const c2 = astro.byLunar(2001, 11, 19, 0, 0, false, false);
  process.stdout.write("byLunar(2001,11,19,...) solar=" + c2.solarDate + " lunar=" + c2.lunarDate + "\n");
} catch(e) {
  process.stdout.write("byLunar(2001,11,19,...) ERROR: " + e.message + "\n");
}
