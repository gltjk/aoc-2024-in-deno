#! NO_COLOR=1 deno task solve --day 8 --year 2024

/**
 * Day 8: Resonant Collinearity
 * @see https://adventofcode.com/2024/day/8
 */

import { Grid, iterCombinations, Vector } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const grid = Grid.from(input);
  const antennas: Record<string, Vector[]> = {};
  const antinodes = new Set<string>();
  for (const { loc, cell } of grid.iter()) {
    if (cell === ".") continue;
    antennas[cell] ??= [];
    antennas[cell].push(loc);
  }
  for (const antenna of Object.values(antennas)) {
    for (const [a, b] of iterCombinations(antenna, 2)) {
      const delta = b.substract(a);
      if (level === 1) {
        const c = a.substract(delta);
        const d = b.add(delta);
        if (grid.has(c)) antinodes.add(`${c}`);
        if (grid.has(d)) antinodes.add(`${d}`);
      } else {
        for (let c = a; grid.has(c); c = c.substract(delta)) {
          antinodes.add(`${c}`);
        }
        for (let c = b; grid.has(c); c = c.add(delta)) {
          antinodes.add(`${c}`);
        }
      }
    }
  }
  return antinodes.size;
}
