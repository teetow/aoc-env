import { Day } from "../../lib/Day";
import data from "./input/day06";
import testData from "./input/day06test";

const parse = (data: string): number[] => {
  return data.split(",").map((val) => Number(val) as number);
};

const getHistogram = (data: number[]) => {
  const histogram: number[] = Array(9).fill(0);
  data.forEach((fish) => {
    histogram[fish] = fish in histogram ? histogram[fish] + 1 : 1;
  });
  return histogram;
};

const simulate = (data: number[], maxDays = 80) => {
  const histogram = getHistogram(data);

  let day = 0;
  while (day < maxDays) {
    const births = Number([histogram.splice(0, 1)]);
    histogram[6] += births;
    histogram[8] = births;
    day++;
  }
  return histogram.reduce((prev, cur) => prev + cur);
};

const part1 = (data: number[]) => {
  return simulate(data);
};

const part2 = (data: number[]) => {
  return simulate(data, 256);
};

const day: Day<number[], number> = {
  parts: [
    {
      desc: "",
      tests: [{ data: parse(testData), runner: part1, result: 5934 }],
      solutions: [{ data: parse(data), runner: part1, result: 365131 }],
    },
    {
      desc: "",
      tests: [{ data: parse(testData), runner: part2, result: 26984457539 }],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
