#! NO_COLOR=1 deno task solve --day 10 --year 2024

/**
 * Day 10: Hoof It
 * @see https://adventofcode.com/2024/day/10
 */

import { Grid, Vector } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const grid = Grid.from(input);
  let sum = 0;
  for (const { cell, loc } of grid.iter()) {
    if (cell !== "0") continue;
    let trails = [[loc]];
    for (let step = 1; step < 10; step++) {
      trails = trails.flatMap((trail) =>
        Vector.unique(
          grid.neighbors(trail.at(-1)!)
            .filter((x) => +x.cell === step)
            .map((x) => x.loc),
        )
          .map((loc) => [...trail, loc])
          .toArray()
      );
    }
    if (level === 1) {
      sum += Vector.unique(trails.map((x) => x.at(-1)!)).toArray().length;
    } else {
      sum += trails.length;
    }
  }
  return sum;
}
