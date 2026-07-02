
import { Lunar } from "lunar-javascript";

// 农历2001年11月18日
const l18 = Lunar.fromYmd(2001, 11, 18);
const s18 = l18.getSolar().toYmd();

// 农历2001年11月19日
const l19 = Lunar.fromYmd(2001, 11, 19);
const s19 = l19.getSolar().toYmd();

process.stdout.write(JSON.stringify({s18, s19}));
