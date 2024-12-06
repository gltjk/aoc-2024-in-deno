#! NO_COLOR=1 deno task solve --day 6 --year 2024

/**
 * Day 6: Guard Gallivant
 * @see https://adventofcode.com/2024/day/6
 */

const dirs = ["^", ">", "v", "<"] as const;
type Dir = (typeof dirs)[number];

export default function solve(input: string, level: 1 | 2) {
  const grid = input.split("\n").map((line) => line.split(""));
  const bound = { x: grid[0].length, y: grid.length };
  const obstacles = iterGrid(grid, (cell) => cell === "#").toArray();
  const guardCell = iterGrid(grid, (x) => dirs.includes(x as Dir)).next().value;
  if (!guardCell) throw new Error("Guard not found");
  const guard = { ...guardCell, dir: guardCell.cell as Dir };

  if (level === 1) return patrol(guard, obstacles, bound, level).visited;

  // TODO: level 2 takes too long, need to optimize
  let loopCount = 0;
  for (const { x, y } of iterGrid(grid)) {
    if (obstacles.some((o) => o.x === x && o.y === y)) continue;
    if (guard.x === x && guard.y === y) continue;
    const { loop } = patrol(
      { ...guard },
      [...obstacles, { x, y }],
      bound,
      level,
    );
    if (loop) loopCount++;
  }
  return loopCount;
}

function* iterGrid(
  grid: string[][],
  condition: (cell: string) => boolean = () => true,
) {
  for (const [y, line] of grid.entries()) {
    for (const [x, cell] of line.entries()) {
      if (condition(cell)) yield { x, y, cell };
    }
  }
}

function patrol(
  guard: { x: number; y: number; dir: Dir },
  obstacles: { x: number; y: number }[],
  bound: { x: number; y: number },
  level: 1 | 2,
) {
  const guardToString = () =>
    level === 1
      ? `${guard.x},${guard.y}`
      : `${guard.x},${guard.y},${guard.dir}`;
  const history = new Set<string>([guardToString()]);
  while (true) {
    // turn right until no obstacle ahead
    while (hasObstacleAhead(guard, obstacles)) {
      guard.dir = dirs[(dirs.indexOf(guard.dir) + 1) % 4];
    }
    // move forward
    if (guard.dir === "^") guard.y--;
    else if (guard.dir === "v") guard.y++;
    else if (guard.dir === "<") guard.x--;
    else guard.x++;
    // check if out of bounds
    if (
      guard.x < 0 || guard.x >= bound.x || guard.y < 0 || guard.y >= bound.y
    ) {
      break;
    }
    // check if loop
    const newPos = guardToString();
    if (level === 2 && history.has(newPos)) {
      return { loop: true, visited: history.size };
    }
    history.add(newPos);
  }
  return { loop: false, visited: history.size };
}

function hasObstacleAhead(
  { x, y, dir }: { x: number; y: number; dir: Dir },
  obstacles: { x: number; y: number }[],
) {
  return obstacles.some((o) =>
    ({
      "^": o.x === x && o.y === y - 1,
      ">": o.y === y && o.x === x + 1,
      "v": o.x === x && o.y === y + 1,
      "<": o.y === y && o.x === x - 1,
    })[dir]
  );
}
