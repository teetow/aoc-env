import { Day } from "../../lib/Day";
import { average, factorial, median, range } from "../../lib/utils";
import data from "./input/day07";
import testData from "./input/day07test";

const parse = (data: string): number[] => {
  return data.split(",").map((val) => Number(val) as number);
};

const calcDist = (data: number[], target: number) => {
  return data.reduce((acc, val) => {
    const shift = Math.abs(val - target);
    return acc + shift;
  }, 0);
};

const part1 = (data: number[]) => {
  return calcDist(data, median(data));
};

const calcDistFactorial = (data: number[], target: number) => {
  return data.reduce((acc, val) => {
    const shift = factorial(Math.abs(val - target));
    return acc + shift;
  }, 0);
};

const part2 = (data: number[]) => {
  const bestFuel = range(3, -1)
    .map((num) => {
      const avg = Math.round(average(data)) + num;
      return calcDistFactorial(data, avg);
    })
    .sort((a, b) => a - b)[0];

  return bestFuel;
};

const day: Day<number[], number> = {
  parts: [
    {
      desc: "",
      tests: [{ data: parse(testData), runner: part1, result: 37 }],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "",
      tests: [{ data: parse(testData), runner: part2, result: 168 }],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
