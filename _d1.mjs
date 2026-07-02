
import { Lunar } from "lunar-javascript";
const lunar = Lunar.fromYmd(1998, 9, 8);
const solar = lunar.getSolar();
console.log(solar.toYmd());
