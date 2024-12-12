#! NO_COLOR=1 deno task solve --day 12 --year 2024

/**
 * Day 12: Garden Groups
 * @see https://adventofcode.com/2024/day/12
 */

import { Grid, MapEx, Vector } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const grid = Grid.from(input);
  const map = new MapEx<string, { area: number; perimeter: number }>({
    area: 0,
    perimeter: 0,
  });
  const nameMap = new MapEx<string, number>(0);

  const findSameNeighbors = (loc: Vector, cell: string) => {
    grid.set(loc, cell);
    let perimeterInc = 4;
    for (const neighbor of grid.neighbors(loc)) {
      if (neighbor.cell[0] !== cell[0]) continue;
      perimeterInc -= 1;
      if (neighbor.cell === cell) continue;
      findSameNeighbors(neighbor.loc, cell);
    }
    map.getEx(cell).area += 1;
    map.getEx(cell).perimeter += perimeterInc;
  };

  for (const { loc, cell } of grid.iter()) {
    if (cell.length > 1) continue;
    nameMap.update(cell, (v) => v + 1);
    findSameNeighbors(loc, `${cell}-${nameMap.get(cell)}`);
  }

  return map.values().reduce((acc, x) => acc + x.area * x.perimeter, 0);
}
