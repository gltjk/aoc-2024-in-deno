#! NO_COLOR=1 deno task solve --day 1

/**
 * Day 1: Historian Hysteria
 * @see https://adventofcode.com/2024/day/1
 */

export default function solve(input: string, level: 1 | 2) {
  const left: number[] = [];
  const right: number[] = [];
  for (const row of input.split("\n")) {
    const [l, r] = row.split(/\s+/);
    left.push(Number(l));
    right.push(Number(r));
  }
  if (level === 1) return level1(left, right);
  return level2(left, right);
}

function level1(left: number[], right: number[]) {
  left = left.toSorted((x, y) => x - y);
  right = right.toSorted((x, y) => x - y);
  return left.reduce((acc, x, i) => acc + Math.abs(x - right[i]), 0);
}

function level2(left: number[], right: number[]) {
  const rightCount: Record<number, number> = {};
  for (const r of right) {
    rightCount[r] = (rightCount[r] ?? 0) + 1;
  }
  return left.reduce((acc, x) => acc + x * (rightCount[x] ?? 0), 0);
}
