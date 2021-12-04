import { Day } from "../../lib/Day";
import { range } from "../../lib/utils";
import data from "./input/day02";
import testData from "./input/day02test";

type Dirs = "forward" | "up" | "down";

const moves: Record<Dirs, number[]> = {
  forward: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

type Move = {
  dir: keyof typeof moves;
  dist: number;
};

const matrixAdd = (one: number[], other: number[]) => {
  return [one[0] + other[0], one[1] + other[1]];
};
const matrixMult = (one: number[], other: number[]) => {
  return [one[0] * other[0], one[1] * other[1]];
};

const parse = (data: string) =>
  data.split(/\n/).map<Move>((x) => {
    const [dir, dist] = x.trim().split(" ");
    return { dir, dist: Number(dist) } as Move;
  });

const part1 = (data: Move[]) => {
  const coords = data.reduce<number[]>(
    (prev, cur) => {
      const move = matrixMult(moves[cur.dir], [cur.dist, cur.dist]);
      return matrixAdd(prev, move);
    },
    [0, 0]
  );
  return coords[0] * coords[1];
};

const part2 = (data: Move[]) => {
  // const cohorts = range(data.length - 2).map((i) => {
  //   return data[i] + data[i + 1] + data[i + 2];
  // });
  // return part1(cohorts);
  return 0;
};

const day: Day<Move[], number> = {
  parts: [
    {
      desc: "count the number of times a depth measurement increases from the previous measurement.",
      tests: [{ data: parse(testData), runner: part1, result: 150 }],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "count the number of times a depth measurement increases from the previous measurement.",
      tests: [{ data: parse(testData), runner: part2, result: 900 }],
      solutions: [
        // { data: parse(data), runner: part1 },
      ],
    },
  ],
};

export default day;
