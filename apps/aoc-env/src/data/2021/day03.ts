/* eslint-disable @typescript-eslint/no-unused-vars */
import { Day } from "../../lib/Day";
import { range } from "../../lib/utils";
import data from "./input/day03";
import testData from "./input/day03test";

const parse = (data: string) => data.split(/\n/);

const str2bin = (value: string) => {
  return value
    .split("")
    .reduce<number>((prev, cur) => (prev << 1) | Number(cur), 0);
};

const bin2str = (value: number) => {
  let str = "";
  while (value > 0) {
    str = ((value & 1) === 1 ? "1" : "0") + str;
    value = value >> 1;
  }
  return str;
};

const getBitParity = (number: string[]) => {
  return number.filter((x) => x === "1").length >= number.length / 2
    ? "1"
    : "0";
};

const part1 = (data: string[]) => {
  const len = data[0].length;
  const pivot = range(len)
    .map<string[]>((column) => data.map<string>((number) => number[column]))
    .map((x) => getBitParity(x));
  const gamma = str2bin(pivot.join(""));
  const epsilon =
    str2bin(pivot.join("")) ^ str2bin(Array<string>(len).fill("1").join(""));

  return gamma * epsilon;
};

const hasBitSet = (data: string[], bitIndex: number, bitValue: string = "1") =>
  data[bitIndex] === bitValue;

const bitsAtOffset = (data: string[], bitIndex: number) =>
  data.map((x) => x[bitIndex]);

const findOxygenValue = (data: string[]) => {
  const filterBits = (x: string, bitOffset: number) =>
    hasBitSet(
      x.split(""),
      bitOffset,
      getBitParity(bitsAtOffset(data, bitOffset))
    );

  range(data[0].length).forEach((currentBit) => {
    if (data.length === 1) return;
    data = data.filter((x) => filterBits(x, currentBit));
  });
  return str2bin(data[0]);
};

const findScrubberValue = (data: string[]) => {
  const filterBits = (x: string, bitOffset: number) =>
    hasBitSet(
      x.split(""),
      bitOffset,
      str2bin(getBitParity(bitsAtOffset(data, bitOffset))) ? "0" : "1"
    );

  range(data[0].length).forEach((currentBit) => {
    if (data.length === 1) return;
    data = data.filter((x) => filterBits(x, currentBit));
  });
  return str2bin(data[0]);
};

const part2 = (data: string[]) => {
  const len = data[0].length;
  const oxygen = findOxygenValue(data);
  const scrubber = findScrubberValue(data);

  return oxygen * scrubber;
};

const day: Day<string[], number> = {
  parts: [
    {
      desc: "What is the power consumption of the submarine?",
      tests: [{ data: parse(testData), runner: part1, result: 198 }],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "",
      tests: [{ data: parse(testData), runner: part2, result: 230 }],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
