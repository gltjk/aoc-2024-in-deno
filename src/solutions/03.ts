#! NO_COLOR=1 deno task solve --day 3

/**
 * Day 3: Mull It Over
 * @see https://adventofcode.com/2024/day/3
 */

export default function (input: string, level: 1 | 2) {
  const puzzle = input.split("\n").join("");
  if (level === 1) return mul(puzzle);
  return mul(puzzle.replace(/don't\(\).*?do\(\)/g, ""));
}

function mul(input: string) {
  return input.matchAll(/mul\((\d+),(\d+)\)/g)
    .reduce((acc, [_, a, b]) => acc + Number(a) * Number(b), 0);
}
