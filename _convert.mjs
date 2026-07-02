
import { Solar, Lunar } from "lunar-javascript";

// 农历1987年四月十四日
const lunar = Lunar.fromYmd(1987, 4, 14);
const solar = lunar.getSolar();
console.log(solar.toYmd());
