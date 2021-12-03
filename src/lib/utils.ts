export const range = (n: number, start: number = 0) => [
  ...Array.from(Array(n).keys()).map((k) => k + start),
];

export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(Math.min(n, max), min);
