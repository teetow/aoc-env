/* eslint-disable @typescript-eslint/no-unused-vars */
import { Day } from "../../lib/Day";
import { deepCopy, range } from "../../lib/utils";
import data from "./input/day04";
import testData from "./input/day04test";

type Cell = { number: number; marked: boolean };

type Board = Cell[][];

type Game = {
  numbers: number[];
  boards: Board[];
};

const parse = (data: string) => {
  const blocks = data.split(/\n\n/);
  const numbers = blocks
    .splice(0, 1)
    .join("")
    .trim()
    .split(",")
    .map((x) => Number(x));

  const boards = blocks.map((board) =>
    board.split("\n").map<Cell[]>((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((x) => ({ number: Number(x), marked: false }))
    )
  );

  return { numbers, boards };
};

const pivotBoard = (board: Board) => {
  return range(board[0].length).map((col) => board.map((row) => row[col]));
};

const countHits = (row: Cell[]) =>
  row.reduce<number>((acc, val) => acc + (val.marked ? 1 : 0), 0);

const hasBingo = (board: Board) => {
  const hasBingoRow = board.some((row) => {
    let rowHits = countHits(row);
    return rowHits === 5;
  });
  if (hasBingoRow) return hasBingoRow;

  const hasBingoColumn = pivotBoard(board).some((col) => {
    let colHits = countHits(col);
    return colHits === 5;
  });
  return hasBingoColumn;
};

const calcScore = (board: Board) => {
  const remainingCells = board.flat(2).filter((cell) => cell.marked === false);
  return remainingCells.reduce((acc, val) => acc + val.number, 0);
};

const updateBoard = (board: Board, num: number) => {
  board.forEach((row) => {
    const found = row.findIndex((c) => c.number === num);
    if (found > -1) {
      row[found].marked = true;
    }
  });
};

const part1 = (data: Game) => {
  const { numbers, boards } = deepCopy(data) as Game;
  let score = 0;
  numbers.some((num) => {
    boards.forEach((board) => updateBoard(board, num));

    return boards.some((board) => {
      if (hasBingo(board)) {
        score = calcScore(board) * num;
        return true;
      }
      return false;
    });
  });
  return score;
};

type WinRecord = {
  winningNum: number;
  board: Board;
};

const part2 = (data: Game) => {
  let boards = deepCopy(data.boards) as Board[];
  const numBoards = boards.length;
  const nums = deepCopy(data.numbers);
  const winners: WinRecord[] = [];

  while (winners.length < numBoards) {
    const currentNum = nums.splice(0, 1)[0];

    boards.forEach((board) => updateBoard(board, currentNum));

    boards.forEach((board) => {
      if (hasBingo(board)) {
        winners.push({ winningNum: currentNum, board: board });
      }
    });

    boards = boards.filter(
      (board) => winners.findIndex((record) => record.board === board) === -1
    );
  }
  const worstBoard = winners[winners.length - 1];
  return calcScore(worstBoard.board) * worstBoard.winningNum;
};

const day: Day<Game, number> = {
  parts: [
    {
      desc: "",
      tests: [{ data: parse(testData), runner: part1, result: 4512 }],
      solutions: [{ data: parse(data), runner: part1 }],
    },
    {
      desc: "",
      tests: [{ data: parse(testData), runner: part2, result: 1924 }],
      solutions: [{ data: parse(data), runner: part2 }],
    },
  ],
};

export default day;
