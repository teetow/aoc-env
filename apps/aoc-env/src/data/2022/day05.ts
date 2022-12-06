import data from "aocdata/data/2022/day05";
import { Linereader } from "../../lib/linereader";

const testData = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

type Command = {
  amount: number;
  src: number;
  dest: number;
};

class Stacker {
  columns: string[][];
  commands: Command[];

  constructor(columns: string[][], commands: Command[]) {
    this.columns = columns;
    this.commands = commands;
  }

  pop(column: number, amount: number) {
    let chars: string[] = [];
    for (let i = 0; i < amount; i++) {
      chars.push(this.columns[column].pop()!);
    }
    return chars;
  }

  push(column: number, chars: string[]) {
    this.columns[column].push(...chars);
  }

  move(src: number, dest: number, amount: number) {
    const chars = this.pop(src, amount);
    this.push(dest, chars);
  }

  moveMulti(src: number, dest: number, amount: number) {
    const srcCol = this.columns[src];
    const to = srcCol.length;
    const from = to - amount;
    const chars = srcCol.splice(from, to);
    this.push(dest, chars);
  }
}

const parseHeader = (headerLines: string[]) => {
  const stacks: string[][] = [];

  headerLines.forEach((line) => {
    for (let i = 0; i < line.length; i += 4) {
      const crate = line.substring(i, i + 3);
      if (crate.trim() === "") {
        continue;
      }

      if (!stacks[i / 4]) {
        stacks[i / 4] = [];
      }

      stacks[i / 4].push(crate.substring(1, 2));
    }
  });

  return stacks;
};

const moveParse = RegExp(
  /move (?<amount>\d+) from (?<src>\d+) to (?<dest>\d+)/
);

const parseData = (data: string) => {
  // read state
  const r = new Linereader(data.split("\n"));

  const headerLines = r.readUntilTrue((line) => /\d/.test(line)) as string[];
  const stacks = parseHeader(headerLines.reverse());

  //read instructions
  r.readUntilTrue((l) => l.includes("move"));
  const moves = r.readAll();

  const commands = moves
    .map((move) => {
      const matches = moveParse.exec(move);
      if (!matches) {
        return null;
      }
      const { amount, src, dest } = matches.groups as {
        amount: string;
        src: string;
        dest: string;
      };

      return {
        amount: Number(amount),
        src: Number(src) - 1,
        dest: Number(dest) - 1,
      } as Command;
    })
    .filter((m) => !!m?.amount) as Command[];

  const stacker = new Stacker(stacks, commands);

  return stacker;
};

const part1 = (data: string) => {
  const stacker = parseData(data);
  stacker.commands.forEach((cmd) =>
    stacker.move(cmd.src, cmd.dest, cmd.amount)
  );

  return stacker.columns.map((column) => column.pop()).join("");
};

const part2 = (data: string) => {
  const stacker = parseData(data);
  stacker.commands.forEach((cmd) =>
    stacker.moveMulti(cmd.src, cmd.dest, cmd.amount)
  );

  return stacker.columns.map((column) => column.pop()).join("");
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: "CMZ" }],
      solutions: [{ data: data, runner: part1 }],
    },
    {
      tests: [{ data: testData, runner: part2, result: "MCD" }],
      solutions: [{ data: data, runner: part2 }],
    },
  ],
};

export default day;
