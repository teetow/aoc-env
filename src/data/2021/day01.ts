import data from "./input/day01";
import testData from "./input/day01test";

const parse = (data: string) =>
  data.split(/[^\d+]/).map((x) => Number(x.trim()));

const part1 = (data: number[]) => {
  return data.reduce((prev, cur) => (cur > prev ? 1 : 0));
};

const day01 = {
  parts: [
    {
      solution: [{ data: parse(data) }],
      tests: [{ data: parse(testData), runner: part1, result: 7 }],
    },
  ],
};

export default day01;
