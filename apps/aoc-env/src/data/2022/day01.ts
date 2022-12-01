import { Day } from "../../lib/Day";
import data from "aocdata/data/2022/01/day01";

const part1 = (data: string) => 3;

const day1 = {
  dataConv: (data) => 3,

  parts: [
    {
      tests: [{ data: "3", runner: part1, result: 3 }],
    },
  ],
} as Day<string, number>;

export default day1;
