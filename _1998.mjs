
import { Lunar, Solar } from "lunar-javascript";

// 1998年农历五月十一
const lunar = Lunar.fromYmd(1998, 5, 11);
const solar = lunar.getSolar();
console.log("农历1998年五月十一");
console.log("→ 年干支:", lunar.getYearInGanZhi());
console.log("→ 公历:", solar.toYmd());
console.log("→ 日干支:", lunar.getDayInGanZhi());
console.log("");

// 13:24 = 未时 → hour index 7
console.log("时辰: 13:24 → 未时 → hourIndex=7");
console.log("性别: 女 → 0");
console.log("年干:", lunar.getYearInGanZhi()[0]); // 戊

// 四化: 戊 → 贪狼禄、太阴权、右弼科、天机忌
console.log("四化(戊年): 贪狼禄·太阴权·右弼科·天机忌");
process.stdout.write("\nDONE");
