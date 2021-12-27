/* eslint-disable @typescript-eslint/no-unused-vars */
import { Day } from "../../lib/Day";
import { colorString, deepCopy, initArray, range } from "../../lib/utils";
import data from "./input/day11";
import testData from "./input/day11test";

console.clear();

type Map = number[][];

type Data = {
  map: Map;
  flashes: Map;
};

const parse = (data: string): Data => {
  const map = data
    .split("\n")
    .map((row) => row.split("").map((char) => Number(char)));

  const flashes = initArray(map.length, map[0].length);

  return {
    map,
    flashes,
  };
};

const visualize = ({ map, flashes }: Data) => {
  console.log(Array(map[0].length).fill("-").join(""));
  console.log(
    map
      .map((row, y) =>
        row
          .map((char, x) =>
            colorString(
              char.toString().padStart(2),
              flashes[y][x] === 1 ? 33 : map[y][x] >= 9 ? 32 : 34
            )
          )
          .join(" ")
      )
      .join("\n")
  );
};

const getNeighbors = (
  xcenter: number,
  ycenter: number,
  xmax: number,
  ymax: number
) => {
  const map = range(3, xcenter - 1)
    .map((x) => range(3, ycenter - 1).map((y) => [x, y]))
    .flat();
  return map.filter(([x, y]) => x >= 0 && x <= xmax && y >= 0 && y <= ymax);
};

const increment = (map: Map) => map.map((row) => row.map((cell) => cell + 1));

const countFlashes = (boom: Map) =>
  boom.reduce(
    (rowAcc, row) => rowAcc + row.reduce((acc, cell) => acc + cell, 0),
    0
  );

const makeFlash = (tx: number, ty: number, data: Data) => {
  const neighbors = getNeighbors(
    tx,
    ty,
    data.map[0].length - 1,
    data.map.length - 1
  );
  neighbors.forEach(([x, y]) => {
    if (data.flashes[y][x] === 0) {
      data.map[y][x] += 1;
    }
  });

  return data;
};

const makeFlashes = (data: Data) => {
  let prevFlashes = -1;
  let totalFlashes = 0;

  while (totalFlashes > prevFlashes) {
    prevFlashes = totalFlashes;

    data.map.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > 9) {
          data.flashes[y][x] = 1;
          data.map[y][x] = 0;
          ({ map: data.map, flashes: data.flashes } = makeFlash(x, y, data));
        }
      })
    );

    totalFlashes = countFlashes(data.flashes);
  }

  return totalFlashes;
};

const doStep = (data: Data) => {
  data.map = increment(data.map);
  data.flashes = data.flashes.map((row) => row.map(() => 0));
  return makeFlashes(data);
};

const part1 = (data: Data) => {
  data = deepCopy(data) as Data;
  const totalFlashes = range(100).reduce((acc) => acc + doStep(data), 0);
  console.log(totalFlashes);
  return totalFlashes;
};

const part2 = (data: Data) => {
  return 0;
};

const day: Day<Data, number> = {
  parts: [
    {
      // tests: [],
      tests: [{ data: parse(testData), runner: part1, result: 1656 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part1 }],
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
