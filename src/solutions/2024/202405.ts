#! NO_COLOR=1 deno task solve --day 5 --year 2024

/**
 * Day 5: Print Queue
 * @see https://adventofcode.com/2024/day/5
 */

export default function solve(input: string, level: 1 | 2) {
  const [part1, part2] = input.split("\n\n");
  const rules = part1.split("\n").map((line) =>
    line.split("|").map(Number) as [number, number]
  );
  const updates = part2.split("\n").map((line) => line.split(",").map(Number));
  let sum = 0;
  for (const update of updates) {
    if (rules.every((rule) => isOk(update, rule))) {
      if (level === 1) sum += update[(update.length - 1) / 2];
    } else if (level === 2) {
      let isDone = false;
      while (!isDone) {
        isDone = true;
        for (const [a, b] of rules) {
          const posA = update.indexOf(a);
          const posB = update.indexOf(b);
          if (!isOk(update, [a, b])) {
            [update[posA], update[posB]] = [update[posB], update[posA]];
            isDone = false;
          }
        }
      }
      sum += update[(update.length - 1) / 2];
    }
  }
  return sum;
}

function isOk(update: number[], [a, b]: [number, number]) {
  const posA = update.indexOf(a);
  const posB = update.indexOf(b);
  return posA === -1 || posB === -1 || posA < posB;
}
