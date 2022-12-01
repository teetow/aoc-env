/* eslint-disable @typescript-eslint/no-unused-vars */
import { Day } from "../../lib/Day";
import { intersect, merge, range, sub } from "../../lib/utils";
import data from "./input/day08";
import testData from "./input/day08test";

type Batch = {
  input: number[][];
  output: number[][];
};

const chars2nums = (pattern: string) => {
  return pattern.split("").map((char) => char.toUpperCase().charCodeAt(0) - 65);
};

const parse = (data: string) => {
  const rows = data.split("\n");
  const patterns = rows
    .map((row) => {
      const [input, output] = row.split(/ \| /);
      return {
        input: input.split(" ").map(chars2nums),
        output: output.split(" ").map(chars2nums),
      };
    })
    .filter((pair) => {
      return pair.input[0].length > 0 && pair.output[0].length > 0;
    });

  return patterns;
};

const part1 = (data: Batch[]) => {
  const numHits = data.reduce((acc, batch) => {
    const uniqueSegs = batch.output.filter((seg) =>
      [2, 3, 4, 7].includes(seg.length)
    );
    return acc + uniqueSegs.length;
  }, 0);
  return numHits;
};

const SegMasks: Record<number, number> = {
  0: 0b1110111,
  1: 0b0100100,
  2: 0b1011101,
  3: 0b1101101,
  4: 0b0101110,
  5: 0b1101011,
  6: 0b1111011,
  7: 0b0100101,
  8: 0b1111111,
  9: 0b1101111,
};

const renderDigit = (digit: number) => {
  const segs = SegMasks[digit];
  let str = Array(5)
    .fill("")
    .map(() => [...Array(3).fill("·")]);

  range(7).forEach((i) => {
    const seg = 1 << i;
    if ((segs & seg) === seg) {
      const cell = i * 2 + 1;
      const row = Math.floor(cell / 3);
      const col = cell % 3;
      str[row][col] = "#";
    }
  });
  const scaledStr = Array(7)
    .fill("")
    .map(() => [...Array(6).fill("")]);

  [0, 1, 1, 1, 1, 2].forEach((srcCol, dstCol) => {
    [0, 1, 1, 2, 3, 3, 4].forEach((srcRow, dstRow) => {
      scaledStr[dstRow][dstCol] = str[srcRow][srcCol];
    });
  });
  return scaledStr.map((row) => row.join("")).join("\n");
};

/*
 aaaa     ....     aaaa     aaaa     ....     aaaa     aaaa     aaaa     aaaa     aaaa
b    c   .    c   .    c   .    c   b    c   b    .   b    .   .    c   b    c   b    c
b    c   .    c   .    c   .    c   b    c   b    .   b    .   .    c   b    c   b    c
 ....     ....     dddd     dddd     dddd     dddd     dddd     ....     dddd     dddd
e    f   .    f   e    .   .    f   .    f   .    f   e    f   .    f   e    f   .    f
e    f   .    f   e    .   .    f   .    f   .    f   e    f   .    f   e    f   .    f
 gggg     ....     gggg     gggg     ....     gggg     gggg     ....     gggg     gggg
  6        2        5        5        4        5         6       3        7         6
*/

const decipher = (pattern: Batch) => {
  const src = [
    ...pattern.input,
    ...pattern.output.filter((x) => pattern.input.indexOf(x) > -1),
  ];

  const d = Array(10);

  d[1] = src.find((x) => x.length === 2);
  d[4] = src.find((x) => x.length === 4);
  d[7] = src.find((x) => x.length === 3);
  d[8] = src.find((x) => x.length === 7);

  const len6 = src.filter((x) => x.length === 6); // digits 0, 6, 9
  const _abfg = intersect(len6[0], len6[1], len6[2]);
  const _bg = sub(_abfg, d[7]);

  const len5 = src.filter((x) => x.length === 5); // digits 2, 3, 5
  const _adg = intersect(len5[0], len5[1], len5[2]);

  const _g = intersect(_adg, _bg);
  const _b = sub(_bg, _g);

  const _d = sub(d[4], d[1], _b);

  const _a = sub(d[7], d[1]);
  const _f = sub(_abfg, _a, _bg);
  const _c = sub(d[7], _a, _f);
  const _e = sub(d[8], _abfg, _adg, _c);

  return [_a, _b, _c, _d, _e, _f, _g].flat();
};

const applyCipher = (sequence: number[][], cipher: number[]) => {
  return sequence.map((segments) => {
    const segs = segments.map((seg) => cipher.indexOf(seg));
    const mask = segs.reduce((acc, val) => acc | (1 << val), 0);
    const digit = Object.values(SegMasks).indexOf(mask);
    return digit;
  });
};

const getOutputDigits = (batch: Batch, cipher: number[]) => {
  return Number(applyCipher(batch.output, cipher).join(""));
};

const part2 = (data: Batch[]) => {
  return data.reduce((acc, row) => {
    const digits = decipher(row);
    const decoded = getOutputDigits(row, digits);
    return acc + decoded;
  }, 0);
};

const day: Day<Batch[], number> = {
  parts: [
    {
      desc: "How many times do digits 1, 4, 7, or 8 appear?",
      // tests: [],
      tests: [{ data: parse(testData), runner: part1, result: 26 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "What do you get if you add up all of the output values?",
      // tests: [],
      tests: [{ data: parse(testData), runner: part2, result: 61229 }],
      // solutions: [],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
