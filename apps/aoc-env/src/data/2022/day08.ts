import data from "aocdata/data/2022/day08";
import { p } from "vitest/dist/index-81973d31";
import { sum } from "../../lib/utils";

const testData = `30373
25512
65332
33549
35390`;

type Point = [number, number];

type Tree = {
  val: number;
  visible?: boolean;
};

class Map {
  cells: Tree[][];

  constructor(cells: string[][]) {
    this.cells = cells.map((row) => row.map((col) => ({ val: Number(col) })));
  }

  get xmax() {
    return this.cells[0].length - 1;
  }

  get ymax() {
    return this.cells.length - 1;
  }

  get numVisible() {
    return sum(
      this.cells.map((row) => row.filter((cell) => cell.visible).length)
    );
  }
  peek(p: Point) {
    return this.cells[p[1]][p[0]];
  }

  setVisible(p: Point, visible: boolean) {
    this.cells[p[1]][p[0]].visible = visible;
  }

  displayVals() {
    const m = this.cells.map((row) => row.map((cell) => cell.val).join(""));
    return m.join("\n");
  }

  displayVisible() {
    const m = this.cells.map((row) =>
      row.map((cell) => (cell.visible ? "O" : "∙")).join("")
    );
    return m.join("\n");
  }

  trace(start: Point, delta: Point) {
    const endX = delta[0] < 0 ? 0 : this.cells[0].length;
    const endY = delta[1] < 0 ? 0 : this.cells.length;
    let runCount = 0;

    const atEnd = (p: Point) => {
      const atEndX = endX === 0 ? p[0] <= endX : p[0] >= endX;
      const atEndY = endY === 0 ? p[1] <= endY : p[1] >= endY;

      return atEndX || atEndY || runCount > 100;
    };

    let localMax = -1;

    for (let p = start; !atEnd(p); p = [p[0] + delta[0], p[1] + delta[1]]) {
      const cell = this.peek(p);

      if (cell.val > localMax) {
        localMax = cell.val;
        this.setVisible(p, true);
      }
    }
  }
}

const dataConv = (string: string) => {
  return string
    .split("\n")
    .filter((s) => s)
    .map((s) => s.split(""));
};

const part1 = (data: string) => {
  const map = new Map(dataConv(data));

  for (let x = 0; x <= map.xmax; x++) {
    map.trace([x, 0], [0, 1]);
    map.trace([x, map.ymax], [0, -1]);
  }
  for (let y = 0; y <= map.ymax; y++) {
    map.trace([0, y], [1, 0]);
    map.trace([map.xmax, y], [-1, 0]);
  }

  return map.numVisible;
};

const part2 = (data: string) => {
  return 0;
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: 21 }],
      solutions: [{ data: data, runner: part1 }],
    },
    {
      tests: [{ data: testData, runner: part2, result: 21 }],
      // solutions: [{ data: data, runner: part2 }],
    },
  ],
};

export default day;
