import { Day } from "../../lib/Day";
import data from "./input/day01";
import testData from "./input/day01test";

const parse = (data: string) =>
  data.split(/[^\d+]/).map((x) => Number(x.trim()));

const part1 = (data: number[]) => {
  return data.reduce((prev, cur, i, arr) => {
    return cur > arr[i - 1] ? prev + 1 : prev;
  }, 0);
};

const day01: Day<number[], number> = {
  parts: [
    {
      desc: "count the number of times a depth measurement increases from the previous measurement.",
      tests: [{ data: parse(testData), runner: part1, result: 7 }],
      solutions: [{ data: parse(data), runner: part1 }],
    },
  ],
};

export default day01;
