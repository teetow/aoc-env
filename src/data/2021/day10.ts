/* eslint-disable @typescript-eslint/no-unused-vars */
import { Day } from "../../lib/Day";
import { range } from "../../lib/utils";

import data from "./input/day10";
import testData from "./input/day10test";

type Data = string[];

const parse = (data: string) => {
  return data.split("\n");
};

const wrognScores: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const openers = ["(", "[", "{", "<"];
const closers = [")", "]", "}", ">"];

const last = (array: any[]) => array[array.length - 1];

const countScore = (chunk: string) => {
  const stack: string[] = [];
  let wrognScore = 0;

  chunk.split("").every((char) => {
    if (openers.indexOf(char) >= 0) {
      stack.push(char);
    } else if (char === closers[openers.indexOf(last(stack))]) {
      stack.pop();
    } else {
      wrognScore += wrognScores[char];
      return false;
    }
    return true;
  });
  return wrognScore;
};

const part1 = (data: Data) => {
  const scores = data.map(countScore);
  return scores.reduce((acc, val) => acc + val, 0);
};

const fold = (chunk: string) => chunk.replace(/\(\)|\[\]|\{\}|<>/, "");

const foldAll = (chunk: string) => {
  let len = 0;
  while (len !== chunk.length) {
    len = chunk.length;
    chunk = fold(chunk);
  }
  return chunk;
};

const getCompletionString = (chunk: string) => {
  return chunk
    .split("")
    .map((char) => closers[openers.indexOf(char)])
    .reverse()
    .join("");
};
const missingScores: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};
const countMissing = (chunk: string) => {
  return chunk
    .split("")
    .reduce((acc, char) => acc * 5 + missingScores[char], 0);
};

const part2 = (data: Data) => {
  const incompleteChunks = data.filter((x) => countScore(x) === 0);
  const missingChunks = incompleteChunks.map(foldAll).map(getCompletionString);
  const scores = missingChunks.map(countMissing);
  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

const day: Day<Data, number> = {
  comment: `Note that this solution has two implementations --
    a stack-based one for part 1, and an iterative folding algorithm for part 2.`,
  parts: [
    {
      desc: "What is the total syntax error score?",
      comment: `For part 1, I took a stack-based approach seeing as how
      it was a good fit. Any invalid character causes an early-out, returning the
       score of the expected character.
      `,
      // tests: [],
      tests: [{ data: parse(testData), runner: part1, result: 26397 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "What is the middle score?",
      comment: `For part 2, I realized that the approach I intially thought of
      for part 1 was a good fit. By iteratively eliminating all valid pairs, we end up
      with a neat list of incomplete chunks. Figure out what's needed to fix them,
      calculate their score, and we're done.`,
      // tests: [],
      tests: [{ data: parse(testData), runner: part2, result: 288957 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
