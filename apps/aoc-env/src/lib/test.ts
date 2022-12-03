export const test = (description: string, test: any, expected: any) =>
  console.assert(
    test === expected,
    `expected ${description} to be ${expected} (got ${test})`
  );
