import axios from "axios";
import { config } from "dotenv";
import fs from "fs";
import { resolve } from "path";

config();

export const fetchData = async (year: number, day: number) => {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;

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

  const path = resolve(`src/data/${year}/${pad(day)}`);

  fs.mkdirSync(path, { recursive: true });

  fetchData(year, day).then((data) => {
    fs.writeFileSync(`${path}/day${pad(day)}.txt`, data, { flag: "wx" });
  });
};

const refreshDataFiles = (year = new Date().getFullYear()) => {
  const today = new Date().getDate();

  for (let day = 1; day < today; day++) {
    createDataFile(year, day);
  }
};

refreshDataFiles();
