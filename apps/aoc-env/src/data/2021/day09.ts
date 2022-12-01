import { Day } from "../../lib/Day";
import { colorString, range } from "../../lib/utils";
import data from "./input/day09";
import testData from "./input/day09test";

type Data = number[][];

class Pt {
  x: number;
  y: number;
  val: number;

  constructor(x: number, y: number, val: number) {
    this.x = x;
    this.y = y;
    this.val = val;
  }
  isSamePos = (other: Pt) => this.x === other.x && this.y === other.y;
  isEqual = (other: Pt) => this.isSamePos(other) && this.val === other.val;
}

const parse = (data: string) => {
  return data.split("\n").map((row) => row.split("").map((s) => Number(s)));
};

const getNeighbors = (data: Data, pos: Pt) => {
  const [w, h] = [data[0].length - 1, data.length - 1];

  const coords = [
    new Pt(pos.x - 1, pos.y, -1),
    new Pt(pos.x + 1, pos.y, -1),
    new Pt(pos.x, pos.y - 1, -1),
    new Pt(pos.x, pos.y + 1, -1),
  ]
    .filter((pt) => pt.x >= 0 && pt.x <= w && pt.y >= 0 && pt.y <= h)
    .map((pt) => new Pt(pt.x, pt.y, data[pt.y][pt.x]));

  return coords;
};

const isLowPoint = (data: Data, pos: Pt) => {
  const val = data[pos.y][pos.x];
  const neighbors = getNeighbors(data, pos);
  return neighbors.every((pt) => pt.val > val);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const visualize = (data: Data, lowpoints: Pt[]) => {
  data.forEach((row, y) => {
    console.log(
      row
        .map((char, x) =>
          lowpoints.find((cell) => cell.isSamePos(new Pt(x, y, -1))) !==
          undefined
            ? colorString(char, 33)
            : colorString(char, 34)
        )
        .join("")
    );
  });
};

function findLowPoints(data: Data) {
  const [w, h] = [data[0].length, data.length];

  const lowPoints = range(h).reduce<Pt[]>((acc, row) => {
    const low_x = range(w)
      .map((col) => new Pt(col, row, data[row][col]))
      .filter((pt) => isLowPoint(data, pt));

    return [...acc, ...low_x];
  }, []);
  return lowPoints;
}

const part1 = (data: Data) => {
  const lowPoints = findLowPoints(data);

  // visualize(data, lowPoints);
  return lowPoints.reduce((acc, pt) => acc + (pt.val + 1), 0);
};

const dedupe = (array: Pt[]) => {
  const output: Pt[] = [];
  array.forEach((item) => {
    if (!output.find((other) => item.isEqual(other))) {
      output.push(item);
    }
  });

  return output;
};

const getHighNeighbors = (data: Data, pos: Pt): Pt[] => {
  const n = getNeighbors(data, pos);
  const highNeighbors = n.filter((pt) => pt.val !== 9 && pt.val > pos.val);

  return dedupe(
    [...highNeighbors, ...highNeighbors.map((pt) => getHighNeighbors(data, pt))]
      .flat()
      .filter((x) => !x.isEqual(pos))
  ) as Pt[];
};

const part2 = (data: Data) => {
  const lowPoints = findLowPoints(data);
  const basins = lowPoints.map((lowPoint) => {
    return [lowPoint, ...getHighNeighbors(data, lowPoint)];
  });
  return basins
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .reduce((acc, basin) => acc * basin.length, 1);
};

const day: Day<Data, number> = {
  parts: [
    {
      desc: "What is the sum of the risk levels of all low points on your heightmap?",
      // tests: [],
      tests: [{ data: parse(testData), runner: part1, result: 15 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "What do you get if you multiply together the sizes of the three largest basins?",
      // tests: [],
      tests: [{ data: parse(testData), runner: part2, result: 1134 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
