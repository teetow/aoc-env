export const range = (n: number, start: number = 0) => [
  ...Array.from(Array(n).keys()).map((k) => k + start),
];

export const step = (from: number, to: number) => {
  if (from === to) return [from];

  const arr = Array.from(Array(Math.abs(to - from) + 1).keys()).map(
    (key) => key + Math.min(from, to)
  );

  return to > from ? arr : arr.reverse();
};

export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(Math.min(n, max), min);

const HOUR = 1000 * 60 * 60;
const MINUTE = 1000 * 60;

export const timestamp = (time: number) => {
  let ts = time;
  const h = Math.floor(ts / HOUR);
  ts -= h;
  const m = Math.floor(ts / MINUTE);
  ts -= m;
  const s = Math.floor(ts / 1000);
  ts -= s;
  return { h, m, s, ms: ts };
};

export const formatTime = (time: number) => {
  const ts = timestamp(time);
  if (time >= HOUR) {
    return `${ts.h}h ${ts.m}m ${ts.s}.${ts.ms}s`;
  }
  if (time >= MINUTE) {
    return `${ts.m}m ${ts.s}.${ts.ms}s`;
  }
  if (time >= 1000) {
    return `${ts.s}.${ts.ms}s`;
  }
  return `${ts.ms}ms`;
};
