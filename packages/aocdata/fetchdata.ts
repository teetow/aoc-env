import axios from "axios";
import { config } from "dotenv";
import fs from "fs";
import { resolve } from "path";

config();

export const fetchData = async (year: number, day: number) => {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  if (!process.env["aoc_session"]) {
    throw "can't login to Advent of Code. missing aoc_session in environment variables.";
  }

  return await axios
    .get(url, {
      headers: {
        Cookie: `session=${process.env["aoc_session"]}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const createDataFile = (year: number, day: number) => {
  const pad = (n: number | string) => n.toString().padStart(2, "0");

  const path = resolve(`data/${year}/${pad(day)}`);
  const fname = `${path}/day${pad(day)}.ts`;

  if (!fs.existsSync(fname)) {
    fs.mkdirSync(path, { recursive: true });
    fetchData(year, day).then((data) => {
      fs.writeFileSync(fname, `const data = \`${data}\`;\nexport default data;\n`, { flag: "wx" });
    });
  } else {
    console.log(`${fname} exists. skipping fetch...`);
  }
};

const refreshDataFiles = (year = new Date().getFullYear()) => {
  const today = new Date().getDate();

  for (let day = 1; day <= today; day++) {
    createDataFile(year, day);
  }
};

refreshDataFiles();
