import { Day } from "../../lib/Day";
import day01 from "./day01";
import day02 from "./day02";
import day03 from "./day03";
import day04 from "./day04";
import day05 from "./day05";

const days: Record<number, Day<any, any>> = {
  1: day01,
  2: day02,
  3: day03,
  4: day04,
  5: day05,
};
export default days;
