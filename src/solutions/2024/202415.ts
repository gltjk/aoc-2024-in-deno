#! NO_COLOR=1 deno task solve --day 15 --year 2024

/**
 * Day 15: Warehouse Woes
 * @see https://adventofcode.com/2024/day/15
 */

import { Grid, mapDir, type Vector } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const [gridPart, movePart] = input.split("\n\n");
  const grid = Grid.from(
    level === 1 ? gridPart : gridPart
      .replace(/#/g, "##")
      .replace(/O/g, "[]")
      .replace(/\./g, "..")
      .replace(/@/g, "@."),
  );
  const moves = movePart.replace(/\n/g, "").split("").map(mapDir);
  let robot = grid.iter().find((x) => x.cell === "@")!.loc;
  for (const dir of moves) {
    if (level === 1) {
      const { pushable, boxes } = tryPushLevel1(robot, dir, grid);
      if (!pushable) continue;
      for (const box of boxes) grid.copy(box, box.add(dir));
      grid.set(robot, ".");
      robot = robot.add(dir);
    }
  }

  const boxSymbol = level === 1 ? "O" : "[";
  return grid.iter()
    .filter((x) => x.cell === boxSymbol)
    .map(({ loc: { x, y } }) => x + y * 100)
    .reduce((a, b) => a + b, 0);
}

function tryPushLevel1(obj: Vector, dir: Vector, grid: Grid<string>): {
  pushable: boolean;
  boxes: Vector[];
} {
  const next = obj.add(dir);
  if (grid.get(next) === "#") return { pushable: false, boxes: [] };
  if (grid.get(next) === "O") {
    const { pushable, boxes } = tryPushLevel1(next, dir, grid);
    return { pushable, boxes: [...boxes, obj] };
  }
  return { pushable: true, boxes: [obj] };
}
