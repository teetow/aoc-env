import { describe, expect, test } from "vitest";
import { Linereader } from "./linereader";

const testData = [
  "hello",
  "world",
  "",
  "tell me how",
  "ya doin'",
  "I'm doing fine",
];

describe("Linereader -- creating an instance", () => {
  test("Create new instance", () => {
    const r = new Linereader(testData);
    expect(r).instanceOf(Linereader);
  });
});

describe("Linereader -- basic", () => {
  const r = new Linereader(testData);

  test("Read one line", () => {
    expect(r.readLine()).toEqual("hello");
  });

  test("Read two lines", () => {
    expect(r.read(2)).toEqual(["world", ""]);
  });

  test("Read two lines consecutively", () => {
    expect([r.readLine(), r.readLine()]).toEqual(["tell me how", "ya doin'"]);
  });

  test("Read remainder", () => {
    expect(r.readAll()).toEqual(["I'm doing fine"]);
  });

  test("Read past eof", () => {
    const t = new Linereader(testData);
    expect(t.read(8)).toEqual(testData);
  });
});

describe("readIf", () => {
  const t = new Linereader(testData);

  test(`undefined when not found`, () => {
    expect(t.readLineIf("not found")).toBeUndefined();
  });

  test(`fail when reading the same line twice`, () => {
    expect(t.readLineIf("hello")).toEqual("hello");
    expect(t.readLineIf("hello")).toBeUndefined();
  });

  test(`fail when reading finding word, then empty line`, () => {
    expect(t.readLineIf("world")).toEqual("world");
    expect(t.readLineIf("")).toEqual("");
  });
});

describe("readUntil", () => {
  test("Read until", () => {
    const t = new Linereader(testData);
    expect(t.readUntil("world")).toEqual(["hello"]);
  });

  test("Read until, then read next two lines", () => {
    const t = new Linereader(testData);
    t.readUntil("world");
    expect(t.read(2)).toEqual(["world", ""]);
  });

  test("Read until, then read next two lines consecutively", () => {
    const t = new Linereader(testData);
    t.readUntil("world");
    expect([t.readLine(), t.readLine()]).toEqual(["world", ""]);
  });

  test("ReadUntil fail", () => {
    const t = new Linereader(testData);
    expect(t.readUntil("nothing")).toEqual(undefined);
  });

  test("ReadUntil fail, then hit", () => {
    const t = new Linereader(testData);
    t.readUntil("not found");
    expect(t.readUntil("world")).toEqual(["hello"]);
  });
});
