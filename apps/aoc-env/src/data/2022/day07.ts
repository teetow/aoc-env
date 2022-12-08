import data from "aocdata/data/2022/day07";
import { Linereader } from "../../lib/linereader";
import { sum } from "../../lib/utils";

/*
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
*/

const testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

type File = { name: string; size: number };

class Dir {
  name: string;
  files: File[];
  dirs: Dir[];

  constructor(path: string) {
    this.name = path;
    this.files = [];
    this.dirs = [];
  }

  get size(): number {
    const fileSizes = this.files.reduce((acc, file) => acc + file.size, 0);

    const size =
      fileSizes +
      (this.dirs.length > 0 ? sum(this.dirs.map((dir) => dir.size)) : 0);

    return size;
  }

  recurse(delegate: (dir: Dir) => void) {
    this.dirs.forEach((d) => {
      delegate(d); //mother%$^

      d.recurse(delegate);
    });
  }

  // [programs, blender, settings]
  addPath(path: string[]) {
    let currentDir: Dir = this;

    path.forEach((dirName) => {
      let candidate = currentDir.dirs.find((d) => d.name === dirName);

      if (candidate === undefined) {
        candidate = new Dir(dirName);
        currentDir.dirs.push(candidate);
        currentDir = candidate;
      }
    });
  }

  seek(path: string[]) {
    let currentDir: Dir = this;

    path.forEach((dirName) => {
      let candidate = currentDir.dirs.find((d) => d.name === dirName);
      if (candidate) {
        currentDir = candidate;
      } else return undefined;
    });
    return currentDir;
  }
}

const part1 = (data: string) => {
  let path = [];
  const root = new Dir("/");

  const r = new Linereader(data.split("\n"));

  while (!r.eof) {
    const [a, b, rest] = r.readLine().split(" ");

    if (a === "$") {
      const cmd = b;

      if (cmd.startsWith("cd")) {
        // is cd
        if (rest === "/") {
          path = [];
        } else if (rest === "..") {
          path.pop();
        } else {
          path.push(rest);
        }
      } else if (cmd.startsWith("ls")) {
        // is ls
        const entries =
          (r.readUntilTrue((l) => l.includes("$")) as string[]) || r.readAll();
        const dir = root.seek(path);

        entries.forEach((entry) => {
          const [arg1, arg2] = entry.split(" ");
          if (arg1.startsWith("dir")) {
            // is a dir
            dir.dirs.push(new Dir(arg2));
          } else {
            // is a file
            dir.files.push({ name: arg2, size: Number(arg1) });
          }
        });
      }
    }
  }
  let allDirs: { name: string; size: number }[] = [];

  root.recurse((dir) => {
    if (dir.size < 100000) {
      allDirs.push({ name: dir.name, size: dir.size });
    } else {
    }
  });

  return sum(allDirs.map((dir) => dir.size));
};

const part2 = (data: string) => {
  return 0;
};

const day = {
  parts: [
    {
      tests: [{ data: testData, runner: part1, result: 95437 }],
      solutions: [{ data: data, runner: part1 }],
    },
    {
      // tests: [{ data: testData, runner: part2, result: 19 }],
      // solutions: [{ data: data, runner: part2 }],
    },
  ],
};

export default day;
