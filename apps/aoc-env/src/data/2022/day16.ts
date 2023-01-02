import data from "aocdata/data/2022/day16";

const testData = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

const dataConv = (string: string) => {
  return string.split("\n").filter((s) => s);
  // .map((s) => s.split(""));
};

const part1 = (raw: string) => {
  const data = new Map(dataConv(raw));

  return -1;
};

const part2 = (data: string) => {
  return 0;
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: 1651 }],
      solutions: [{ data: data, runner: part1 }],
    },
    {
      // tests: [{ data: testData, runner: part2, result: 21 }],
      // solutions: [{ data: data, runner: part2 }],
    },
  ],
};

export default day;
