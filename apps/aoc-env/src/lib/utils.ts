import { test } from "./test";

export const pad2 = (n: number) => n.toString().padStart(2, "0");

export const range = (n: number, start: number = 0) => [
  ...Array.from(Array(n).keys()).map((k) => k + start),
];

export const step = (from: number, to: number) => {
  if (from === to) return [from];

  const arr = Array.from(Array(Math.abs(to - from) + 1).keys()).map(
    (key) => key + Math.min(from, to)
  );

  return to > from ? arr : arr.reverse();
};

export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(Math.min(n, max), min);

const HOUR = 1000 * 60 * 60;
const MINUTE = 1000 * 60;

export const timestamp = (time: number) => {
  let ts = time;
  const h = Math.floor(ts / HOUR);
  ts -= h;
  const m = Math.floor(ts / MINUTE);
  ts -= m;
  const s = Math.floor(ts / 1000);
  ts -= s;
  return { h, m, s, ms: ts };
};

export const formatTime = (time: number) => {
  const ts = timestamp(time);
  if (time >= HOUR) {
    return `${ts.h}h ${ts.m}m ${ts.s}.${ts.ms}s`;
  }
  if (time >= MINUTE) {
    return `${ts.m}m ${ts.s}.${ts.ms}s`;
  }
  if (time >= 1000) {
    return `${ts.s}.${ts.ms}s`;
  }
  return `${ts.ms}ms`;
};

export const median = (nums: number[]) => {
  return nums.sort((a, b) => a - b)[Math.floor(nums.length / 2)];
};

export const average = (nums: number[]) => {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
};

export const factorial = (number: number) =>
  range(number, 1).reduce((acc, val) => acc + val, 0);

export const sum = (numbers: number[]) => numbers.reduce((a, v) => a + v);

export const sub = (src: number[], ...subtractions: number[][]) =>
  subtractions.reduce((acc, val) => {
    return acc.filter((x) => !val.includes(x));
  }, src);

export const exclude = (...exclusions: number[][]) =>
  range(exclusions.length).reduceRight((acc, i) => {
    return exclusions[i].filter((x) => !acc.includes(x));
  }, [] as number[]);

export const intersect = (...intersections: number[][]) =>
  range(intersections.length).reduce(
    (acc, i) => intersections[i].filter((x) => acc.includes(x)),
    intersections[0]
  );

export const merge = (...arrays: number[][]) =>
  arrays.reduce((acc, arr) => [...acc, ...sub(arr, acc)], [] as number[]);

export const splitArray = (array: any[], pos: number) => [
  array.slice(0, pos),
  array.slice(pos),
];

const isString = (thing: string | unknown): thing is string =>
  typeof thing === "string";

export function split(list: Array<unknown>, pos: number): unknown[][];
export function split(list: string, pos: number): string[];
export function split(list: any, pos: number) {
  if (isString(list)) {
    return splitArray(list.split(""), pos).map((s) => s.join(""));
  }
  return splitArray(list, pos);
}

test("ABCDEF splits into ABC, DEF", split("ABCDEF".split(""), 2), [
  "ABC",
  "DEF",
]);

export const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

export const initArray: any = (...dimensions: number[]) => {
  const dim = dimensions.splice(0, 1)[0];
  if (dimensions.length > 0) {
    return Array(dim)
      .fill(0)
      .map((row) => initArray(...dimensions));
  }
  return Array(dim).fill(0);
};

export const colorString = (s: string | number, c = 33) => {
  return `\u001b[${c}m${s}\u001b[${34}m`;
};
