import { Day } from "../../lib/Day";
import { range } from "../../lib/utils";
import data from "./input/day02";
import testData from "./input/day02test";

type Dirs = "forward" | "up" | "down";

const moves: Record<Dirs, number[]> = {
  forward: [1, 0, 0],
  up: [0, -1, -1],
  down: [0, 1, 1],
};

type Move = {
  dir: keyof typeof moves;
  dist: number;
};

const matrixAdd = ([...rest]: number[][]) => {
  return rest.reduce((prev, cur) =>
    range(cur.length).map((i) => cur[i] + prev[i])
  );
};

const matrixMult = ([...rest]: number[][]) => {
  return rest.reduce((prev, cur) =>
    range(cur.length).map((i) => cur[i] * prev[i])
  );
};

const parse = (data: string) =>
  data.split(/\n/).map<Move>((x) => {
    const [dir, dist] = x.trim().split(" ");
    return { dir, dist: Number(dist) } as Move;
  });

const part1 = (data: Move[]) => {
  const coords = data.reduce<number[]>(
    (prev, cur) => {
      const move = matrixMult([moves[cur.dir], [cur.dist, cur.dist]]);
      return matrixAdd([prev, move]);
    },
    [0, 0]
  );
  return coords[0] * coords[1];
};

const part2 = (data: Move[]) => {
  const coords = data.reduce<number[]>(
    (prev, cur) => {
      let [xpos, ypos, aim] = prev;

      if (cur.dir === "forward") {
        xpos += cur.dist;
        ypos += cur.dist * aim;
      } else {
        aim += cur.dir === "down" ? cur.dist : -cur.dist;
      }

      return [xpos, ypos, aim];
    },
    [0, 0, 0]
  );
  return coords[0] * coords[1];
};

const day: Day<Move[], number> = {
  parts: [
    {
      desc: "What do you get if you multiply your final horizontal position by your final depth?",
      tests: [{ data: parse(testData), runner: part1, result: 150 }],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "What do you get if you multiply your final horizontal position by your final depth?",
      tests: [{ data: parse(testData), runner: part2, result: 900 }],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
