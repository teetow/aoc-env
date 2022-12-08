import data from "aocdata/data/2022/day02";
import { Day } from "../../lib/Day";

const testData = `A Y
B X
C Z`;

type Shape = "rock" | "paper" | "scissors";

const ShapeScores = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const MoveSolver: { [key in Shape]: { [key in Shape]?: boolean } } = {
  rock: { scissors: true, paper: false },
  paper: { rock: true, scissors: false },
  scissors: { rock: false, paper: true },
};

const TheirShapes: Record<string, Shape> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const MyShapes: Record<string, Shape> = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const part1 = (data: string) => {
  const rounds = data.split("\n");

  return rounds.reduce((score, round) => {
    const [theirs, mine] = round.split(" ");
    const myMove = MyShapes[mine];
    const theirMove = TheirShapes[theirs];

    const roundScore =
    myMove !== theirMove ? Number(MoveSolver[myMove][theirMove]) * 6 : 3;

    return score + roundScore + ShapeScores[myMove];
  }, 0);
};

const findOutcome = (theirMoves: { [key in Shape]?: boolean }, win: boolean) =>
  Object.entries(theirMoves).find(([move, outcome]) => outcome === win)![0];

const part2 = (data: string) => {
  const rounds = data.split("\n");
  return rounds.reduce((score, round) => {
    const [theirs, outcome] = round.split(" ");
    const theirMove = TheirShapes[theirs];

    if (outcome === "Y") {
      // force a draw
      return score + ShapeScores[theirMove] + 3;
    }

    const theirMoveCounters = MoveSolver[theirMove];

    if (outcome === "X") {
      // pick losing shape
      const losingMove = findOutcome(theirMoveCounters, true);
      return score + ShapeScores[losingMove as Shape];
    }

    if (outcome === "Z") {
      // win
      const winningMove = Object.entries(theirMoveCounters).find(
        ([move, outcome]) => outcome === false
      )![0];

      const s = 6 + ShapeScores[winningMove as Shape];

      return score + s;
    }

    return score;
  }, 0);
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: 15 }],
      solutions: [
        {
          data: data,
          runner: part1,
        },
      ],
    },
    {
      tests: [{ data: testData, runner: part2, result: 12 }],
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
