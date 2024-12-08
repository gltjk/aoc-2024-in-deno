#! NO_COLOR=1 deno task solve --day 8 --year 2024

/**
 * Day 8: Resonant Collinearity
 * @see https://adventofcode.com/2024/day/8
 */

export default function solve(input: string, level: 1 | 2) {
  const grid = input.split("\n").map((line) => line.split(""));
  const bound = { x: grid[0].length, y: grid.length };
  const antennas: Record<string, { x: number; y: number }[]> = {};
  const cells = new Set<string>();
  for (const { x, y, cell } of iterGrid(grid)) {
    if (cell === ".") continue;
    antennas[cell] = antennas[cell] || [];
    antennas[cell].push({ x, y });
  }
  for (const antenna of Object.values(antennas)) {
    for (const [a, b] of iterCombinations(antenna)) {
      const delta = vectorSub(b, a);
      if (level === 1) {
        const c = vectorSub(a, delta);
        const d = vectorAdd(b, delta);
        if (withinBound(c, bound)) cells.add(`${c.x},${c.y}`);
        if (withinBound(d, bound)) cells.add(`${d.x},${d.y}`);
      } else {
        for (
          let cell = a;
          withinBound(cell, bound);
          cell = vectorSub(cell, delta)
        ) {
          cells.add(`${cell.x},${cell.y}`);
        }
        for (
          let cell = b;
          withinBound(cell, bound);
          cell = vectorAdd(cell, delta)
        ) {
          cells.add(`${cell.x},${cell.y}`);
        }
      }
    }
  }
  return cells.size;
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

function* iterCombinations<T>(array: T[]) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      yield [array[i], array[j]];
    }
  }
}

function withinBound(
  point: { x: number; y: number },
  bound: { x: number; y: number },
) {
  return point.x >= 0 && point.x < bound.x && point.y >= 0 && point.y < bound.y;
}

function vectorAdd(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: a.x + b.x, y: a.y + b.y };
}

function vectorSub(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: a.x - b.x, y: a.y - b.y };
}
