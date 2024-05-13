import { removeTimeZone } from "./src/utils/removeTimeZone";

const a = new Date("2001-04-26");

const b = removeTimeZone(a);

console.log(b);
