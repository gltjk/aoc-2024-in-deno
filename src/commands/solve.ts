import { type Day, getPaths, prepare } from "../utils.ts";

export async function solve(date: Day) {
  const input = await prepare(date);

  const fn = await import(getPaths(date).solve.replace(/^\.\/src/, ".."))
    .then((x) => x.default as (input: string, level?: 1 | 2) => number);

  console.log("Answer 1:", fn(input, 1));
  console.log("Answer 2:", fn(input, 2));
}
