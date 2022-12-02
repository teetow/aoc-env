import data from "aocdata/data/2022/day01";
import { Day } from "../../lib/Day";

const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

// const countCals = (cals: number[]) => cals.reduce((acc, val) => acc + val);

// const parseElf = (elf: string) =>
//   countCals(elf.split("\n").map((s) => Number(s)));

// const part1 = (data: string) => {
//   const elves = data.split("\n\n");
//   return elves.map(parseElf).sort((a, b) => b - a)[0];
// };

// const part2 = (data: string) => {
//   const elves = data.split("\n\n");
//   return elves
//     .map(parseElf)
//     .sort((a, b) => b - a)
//     .slice(0, 3)
//     .reduce((acc, val) => acc + val);
// };

const getGroups = (lines: string[]) =>
  lines.map((line) => line.split("\n").map(Number));

const sum = (numbers: number[]) =>
  numbers.reduce((sum, number) => sum + number);

const sort = (numbers: number[]) => numbers.sort((a, b) => b - a);

const part1 = (data: string) => {
  const groups = data.split("\n\n");
  const groupsOfNumbers = getGroups(groups);
  const sortedTotals = sort(groupsOfNumbers.map(sum));

  return sortedTotals[0];
};

const part2 = (data: string) => {
  const groups = data.split("\n\n");
  const groupsOfNumbers = getGroups(groups);
  const sortedTotals = sort(groupsOfNumbers.map(sum));

  return sum(sortedTotals.slice(0, 3));
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: 24000 }],
      solutions: [
        {
          data: data,
          runner: part1,
        },
      ],
    },
    {
      tests: [{ data: testData, runner: part2, result: 45000 }],
      solutions: [
        {
          data: data,
          runner: part2,
        },
      ],
    },
  ],
} as Day<string, number>;

export default day;
