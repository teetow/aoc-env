import data from "aocdata/data/2022/day03";
import { Day } from "../../lib/Day";
import { test } from "../../lib/test";
import { split, sum } from "../../lib/utils";

const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const getCharPrio = (s: string) => {
  const code = s.charCodeAt(0);
  return code >= 97 ? code - 96 : code - 38;
};

test("A prio", getCharPrio("A"), 27);
test("b prio", getCharPrio("b"), 2);

const getCommonChars = (a: string, b: string) => {
  const tableA = new Set();
  const tableB = new Set();
  const common = new Set();

  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    // test a
    if (i < a.length) tableA.add(a[i]);
    if (tableB.has(a[i])) common.add(a[i]);

    // test b
    if (i < b.length) tableB.add(b[i]);
    if (tableA.has(b[i])) common.add(b[i]);
  }
  return [...common].join("");
};

test("B is common to ABC, aBc", getCommonChars("ABC", "aBc"), "B");

const part1 = (data: string) => {
  const common = data.split("\n").reduce((acc, sack) => {
    const [left, right] = split(sack, sack.length / 2);
    const common = getCommonChars(left, right);
    const score = getCharPrio(common);
    return acc + score;
  }, 0);
  return common;
};

const getCommon = (bags: string[]) => {
  return bags.reduce((acc, bag) => {
    return getCommonChars(acc, bag);
  });
};

test("B is common to ABC, aBc, BDI", getCommon(["ABC", "aBc", "BDI"]), "B");

const test2 = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
];
test("fulltest", getCommon(test2), "r");

test(
  "part2test2",
  getCommon([
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ]),
  "Z"
);

const part2 = (data: string) => {
  const groups = data
    .split(/((?:.+?\n){3,3})+?/g)
    .filter((s) => s)
    .map((s) => s.trim().split("\n"));

  const totalScores = groups.reduce((acc, teamBags) => {
    const common = getCharPrio(getCommon(teamBags));
    return acc + common;
  }, 0);

  return totalScores;
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: 157 }],
      solutions: [
        {
          data: data,
          runner: part1,
        },
      ],
    },
    {
      tests: [{ data: testData, runner: part2, result: 70 }],
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
