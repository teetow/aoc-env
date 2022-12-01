/* eslint-disable @typescript-eslint/no-unused-vars */
import { Day } from "../../lib/Day";
import { range } from "../../lib/utils";
import data from "./input/day05";
import testData from "./input/day05test";
import { step } from "../../lib/utils";
import { logMsg } from "../../ui/Debugger";

type Point = { x: number; y: number };

type Move = {
  from: Point;
  to: Point;
};

type Map = Record<string, number>;

const parse = (data: string) => {
  return data.split("\n").map((row) => {
    const [from, to] = row.split(/ -> /);

    const [fromX, fromY] = from.split(",").map((x) => Number(x));
    const [toX, toY] = to.split(",").map((x) => Number(x));

    return { from: { x: fromX, y: fromY }, to: { x: toX, y: toY } } as Move;
  });
};

const render = (map: Map) => {
  let xLow: number = Number.MAX_SAFE_INTEGER;
  let xHi: number = Number.MIN_SAFE_INTEGER;
  let yLow: number = Number.MAX_SAFE_INTEGER;
  let yHi: number = Number.MIN_SAFE_INTEGER;

  Object.keys(map).forEach((key) => {
    const [x, y] = key.split("-").map((val) => Number(val));
    if (x < xLow) xLow = x;
    if (x > xHi) xHi = x;
    if (y < yLow) yLow = y;
    if (y > yHi) yHi = y;
  });

  let outMap = new Array(yHi - yLow + 1)
    .fill([])
    .map((row) => new Array(xHi - xLow + 1).fill(" "));

  for (let y = yLow; y <= yHi; y++) {
    for (let x = xLow; x <= xHi; x++) {
      const hash = `${x}-${y}`;
      if (hash in map) {
        outMap[y - yLow][x - xLow] = map[hash] > 1 ? map[hash] : "∙";
      }
    }
  }
  logMsg(outMap.map((row) => row.join("  ")).join("\n"));
};

const safeDelta = (one: number, other: number) => {
  return one === other ? 0 : (other - one) / Math.abs(other - one);
};

const plot = (move: Move, map: Map) => {
  const len =
    Math.max(
      Math.abs(move.to.x - move.from.x),
      Math.abs(move.to.y - move.from.y)
    ) + 1;
  const xStep = safeDelta(move.from.x, move.to.x);
  const yStep = safeDelta(move.from.y, move.to.y);

  const coords = range(len).map<Point>((step) => {
    return {
      x: move.from.x + step * xStep,
      y: move.from.y + step * yStep,
    };
  });

  coords.forEach((pt) => {
    const hash = `${pt.x}-${pt.y}`;
    map[hash] = hash in map ? map[hash] + 1 : 1;
  });

  return map;
};

const plotMoves = (data: Move[]) => {
  return data.reduce<Map>((map, move) => {
    return plot(move, map);
  }, {} as Record<string, number>);
};

const part1 = (data: Move[]) => {
  const straights = data.filter(
    (move) => move.from.x === move.to.x || move.from.y === move.to.y
  );
  const map = plotMoves(straights);
  const numOverlaps = Object.values(map).filter((x) => x >= 2).length;
  return numOverlaps;
};

const part2 = (data: Move[]) => {
  const paths = data.filter((move) => {
    return (
      move.from.x === move.to.x ||
      move.from.y === move.to.y ||
      step(move.from.x, move.to.x).length ===
        step(move.from.y, move.to.y).length
    );
  });
  const map = plotMoves(paths);
  const numOverlaps = Object.values(map).filter((x) => x >= 2).length;
  return numOverlaps;
};

const day: Day<Move[], number> = {
  parts: [
    {
      desc: "",
      // tests: [],
      tests: [{ data: parse(testData), runner: part1, result: 5 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part1, result: 7142 }],
    },
    {
      desc: "",
      // tests: [],
      tests: [{ data: parse(testData), runner: part2, result: 12 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
