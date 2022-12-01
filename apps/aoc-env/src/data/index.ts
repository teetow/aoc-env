import { Day } from "../lib/Day";
import * as year2021 from "./2021/index";
import * as year2022 from "./2022/";

const years: Record<number, Record<number | string, Day<any, any>>> = {
  2021: year2021,
  2022: year2022,
};

export default years;
