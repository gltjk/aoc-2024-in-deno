#! NO_COLOR=1 deno task solve --day 18 --year 2024

/**
 * Day 18: RAM Run
 * @see https://adventofcode.com/2024/day/18
 */

import { Vector } from "helpers";
import { Grid } from "helpers";

export default function solve(
  input: string,
  level: 1 | 2,
  bound = 70,
  first = 1024,
) {
  const bytes = input.split("\n").map((line) => {
    const [x, y] = line.split(",").map(Number);
    return new Vector(x, y);
  });

  const grid = new Grid(
    Array(bound + 1).fill(0).map(() => Array(bound + 1).fill(".")),
  );
  bytes.slice(0, first).forEach((pos) => grid.set(pos, "#"));

  const goal = new Vector(bound);

  if (level === 1) {
    return grid.dijkstra(
      new Vector(0),
      (pos) => pos.equals(goal),
      (cell) => cell === "#",
    ).toString();
  }

  for (let i = first; i < bytes.length; i++) {
    const currentPos = bytes[i];
    grid.set(currentPos, "#");
    const result = grid.dijkstra(
      new Vector(0),
      (pos) => pos.equals(goal),
      (cell) => cell === "#",
    );

    if (result === -1) return `${currentPos}`;

    return "Path never blocked";
  }
}
