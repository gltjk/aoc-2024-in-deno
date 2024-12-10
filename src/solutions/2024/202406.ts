#! NO_COLOR=1 deno task solve --day 6 --year 2024

/**
 * Day 6: Guard Gallivant
 * @see https://adventofcode.com/2024/day/6
 */
import { DOWN, Grid, LEFT, RIGHT, UP } from "helpers";

const dirMap = { "^": UP, ">": RIGHT, "v": DOWN, "<": LEFT } as const;
type Dir = keyof typeof dirMap;

export default function solve(input: string, level: 1 | 2) {
  const grid = Grid.from(input);
  const obstacles = new Set(
    grid.iter().filter((x) => x.cell === "#").map(({ loc }) => `${loc}`),
  );
  const { loc, cell } = grid.iter().find((x) => dirMap[x.cell as Dir])!;
  const theGuard = { loc, dir: dirMap[cell as Dir] };

  function patrol(guard: typeof theGuard, extraObstacle?: string) {
    const guardToString = () =>
      level === 1 ? `${guard.loc}` : `${guard.loc},${guard.dir}`;
    const history = new Set([guardToString()]);
    while (true) {
      // turn right until no obstacle ahead
      let ahead = guard.loc.add(guard.dir);
      while (obstacles.has(`${ahead}`) || extraObstacle === `${ahead}`) {
        guard.dir = guard.dir.rotate(Math.PI / 2);
        ahead = guard.loc.add(guard.dir);
      }
      // move forward
      guard.loc = guard.loc.add(guard.dir);
      // check if out of bounds
      if (!grid.has(guard.loc)) break;
      // check if loop
      const newPos = guardToString();
      if (level === 2 && history.has(newPos)) return { loop: true };
      history.add(newPos);
    }
    return { visited: history.size };
  }

  if (level === 1) return patrol(theGuard).visited!;

  let loopCount = 0;
  for (const { loc } of grid.iter()) {
    if (obstacles.has(`${loc}`)) continue;
    if (theGuard.loc.equals(loc)) continue;
    const { loop } = patrol({ ...theGuard }, `${loc}`);
    if (loop) loopCount++;
  }
  return loopCount;
}
