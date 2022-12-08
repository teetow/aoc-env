import { describe, expect, it } from "vitest";
import { pad2, split } from "./utils";

describe("pad", () => {
  it("works", () => {
    expect(pad2(2)).toEqual("02");
  });
  it("works", () => {
    expect(pad2(18)).toEqual("18");
  });
});

describe("split", () => {
  it("splits ABCDEF into ABC, DEF", () =>
    expect(split("ABCDEF", 3)).toEqual(["ABC", "DEF"]));
});
