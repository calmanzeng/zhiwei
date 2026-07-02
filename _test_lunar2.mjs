
import { astro } from "iztro";

try {
  const c = astro.byLunar("2001-11-18", 0, 0, false, false);
  process.stdout.write("byLunar('2001-11-18',...) solar=" + c.solarDate + "\n");
} catch(e) {
  process.stdout.write("byLunar('2001-11-18',...) ERROR: " + e.message + "\n");
}

try {
  const c2 = astro.byLunar("2001-11-19", 0, 0, false, false);
  process.stdout.write("byLunar('2001-11-19',...) solar=" + c2.solarDate + "\n");
} catch(e) {
  process.stdout.write("byLunar('2001-11-19',...) ERROR: " + e.message + "\n");
}

// Check iztro version
import pkg from "iztro/package.json";
process.stdout.write("iztro version: " + pkg.version + "\n");
