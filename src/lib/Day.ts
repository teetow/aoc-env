type Run<K, T> = {
  data: K;
  runner: (inData: K) => T;
  result?: T;
};

export type Part<K, T> = {
  solutions: Run<K, T>[];
  tests: Run<K, T>[];
  desc?: string;
};

export type Day<K, T> = {
  parts: Part<K, T>[];
  desc?: string;
};
