import data from "aocdata/data/2022/day04";
import { Day } from "../../lib/Day";
import { test } from "../../lib/test";

const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

class Range {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  encloses = (other: Range) => {
    return this.start <= other.start && this.end >= other.end;
  };

  overlaps = (other: Range) => {
    return this.start <= other.end && this.end >= other.start;
  };
}

test("1,9 encloses 4,5", new Range(1, 9).encloses(new Range(4, 5)), true);
test(
  "1,2 does not enclose 1,3",
  new Range(1, 2).encloses(new Range(1, 3)),
  false
);

const parseData = (data: string) => {
  return data.split("\n").map((elfPair) =>
    elfPair
      .split(",")
      .map((elf) => elf.split("-").map(Number))
      .map(([start, end]) => new Range(start, end))
  );
};

const part1 = (data: string) => {
  const pairs = parseData(data);
  return pairs.filter(
    ([ralf, kjell]) => ralf.encloses(kjell) || kjell.encloses(ralf)
  ).length;
};

const part2 = (data: string) => {
  const pairs = parseData(data);
  return pairs.filter(([jeff, bob]) => jeff.overlaps(bob)).length;
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: 2 }],
      solutions: [
        {
          data: data,
          runner: part1,
        },
      ],
    },
    {
      tests: [{ data: testData, runner: part2, result: 4 }],
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
