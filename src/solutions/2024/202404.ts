#! NO_COLOR=1 deno task solve --day 4

/**
 * Day 4: Ceres Search
 * @see https://adventofcode.com/2024/day/4
 */

import { directions, Grid, Vector } from "helpers";

export default function solve(input: string, level: 1 | 2 = 1) {
  const grid = Grid.from(input);
  let count = 0;
  for (const { loc } of grid.iter()) {
    if (level === 1) {
      for (const dir of Object.values(directions)) {
        if (go(grid, loc, dir, 4) === "XMAS") count += 1;
      }
    } else {
      const forwardSlash = go(grid, loc.add(directions.NE), directions.SW, 3);
      const backslash = go(grid, loc.add(directions.NW), directions.SE, 3);
      if (forwardSlash !== "MAS" && forwardSlash !== "SAM") continue;
      if (backslash !== "MAS" && backslash !== "SAM") continue;
      count += 1;
    }
  }
  return count;
}

function go(grid: Grid<string>, from: Vector, dir: Vector, distance: number) {
  const path: string[] = [];
  let location = Vector.from(from);
  for (let i = 0; i < distance; i++) {
    const here = grid.get(location);
    if (Grid.isOutOfBound(here)) break;
    path.push(here);
    location = location.add(dir);
  }
  return path.join("");
}
