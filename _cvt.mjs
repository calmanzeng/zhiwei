
import { Lunar } from "lunar-javascript";

// Try as lunar date
const lunar = Lunar.fromYmd(2008, 5, 23);
const solar = lunar.getSolar();
console.log("农历2008-05-23 → 阳历:", solar.toYmd());

// Also try adding one day to check
const lunar2 = Lunar.fromYmd(2008, 5, 24);
const solar2 = lunar2.getSolar();
console.log("农历2008-05-24 → 阳历:", solar2.toYmd());
