/* eslint-disable @typescript-eslint/no-unused-vars */
import { Day } from "../../lib/Day";
import { colorString, deepCopy, initArray, range } from "../../lib/utils";

import data from "./input/day11";
import testData from "./input/day11test";

console.clear();

type Map = number[][];

type Data = {
  map: Map;
  boom: number[][];
};

const parse = (data: string): Data => {
  const map = data
    .split("\n")
    .map((row) => row.split("").map((char) => Number(char)));

  const boom = initArray(map.length, map[0].length);

  return {
    map,
    boom,
  };
};

const doStep = ({ map, boom }: Data) => {
  map = deepCopy(map);
  boom = deepCopy(boom);
  return {
    map: map.map((row, y) =>
      row.map((cell, x) => {
        if (boom[y][x] === 1) {
          return cell;
        }
        if (cell === 9) {
          boom[y][x] = 1;
          return 0;
        }
        return cell + 1;
      })
    ),
    boom,
  };
};

const visualize = ({ map, boom }: Data) => {
  console.log(Array(map[0].length).fill("-").join(""));
  console.log(
    map
      .map((row, y) =>
        row
          .map((char, x) => colorString(char, boom[y][x] === 1 ? 33 : 34))
          .join("")
      )
      .join("\n")
  );
};

const part1 = (data: Data) => {
  data = deepCopy(data);
  let totalFlashes = 0;
  range(3).forEach((i) => {
    visualize(data);
    data.boom = initArray(data.map.length, data.map[0].length);
    data = doStep(data);
    totalFlashes += data.boom.reduce(
      (acc, row) => acc + row.filter((x) => x === 1).length,
      0
    );
  });
  return totalFlashes;
};

const part2 = (data: Data) => {
  return 0;
};

const day: Day<Data, number> = {
  parts: [
    {
      // tests: [],
      solutions: [],
      tests: [{ data: parse(testData), runner: part1, result: 1656 }],
      // solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      tests: [],
      solutions: [],
      // tests: [{ data: parse(testData), runner: part2, result: 288957 }],
      // solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
