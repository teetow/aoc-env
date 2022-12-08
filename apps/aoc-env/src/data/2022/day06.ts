import data from "aocdata/data/2022/day06";

const testData = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
];

const findMarker = (data: string, len = 4) => {
  let found = false;
  let ofs = 0;
  let chars: string[] = [];

  while (!found && ofs < data.length) {
    chars.push(data[ofs++]);
    const unique = new Set(Array.from(chars));

    if (unique.size === len) {
      found = true;
    }

    chars = chars.slice((len - 1) * -1);
  }

  return ofs;
};

const part1 = (data: string) => {
  return findMarker(data, 4);
};

const part2 = (data: string) => {
  return findMarker(data, 14);
};

const day = {
  parts: [
    {
      tests: [
        { data: testData[0], runner: part1, result: 7 },
        { data: testData[1], runner: part1, result: 5 },
        { data: testData[2], runner: part1, result: 6 },
        { data: testData[3], runner: part1, result: 10 },
        { data: testData[4], runner: part1, result: 11 },
      ],
      solutions: [{ data: data, runner: part1 }],
    },
    {
      tests: [
        { data: testData[0], runner: part2, result: 19 },
        { data: testData[1], runner: part2, result: 23 },
        { data: testData[2], runner: part2, result: 23 },
        { data: testData[3], runner: part2, result: 29 },
        { data: testData[4], runner: part2, result: 26 },
      ],
      solutions: [{ data: data, runner: part2 }],
    },
  ],
};

export default day;
