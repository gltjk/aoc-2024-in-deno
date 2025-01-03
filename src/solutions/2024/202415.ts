#! NO_COLOR=1 deno task solve --day 15 --year 2024

/**
 * Day 15: Warehouse Woes
 * @see https://adventofcode.com/2024/day/15
 */

import { Grid, LEFT, mapDir, RIGHT, type Vector } from "helpers";

type Box = [Vector, Vector];

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
      const { ok, boxes } = tryPushLevel1(robot, dir, grid);
      if (!ok) continue;
      for (const box of boxes) grid.copy(box, box.add(dir));
      grid.set(robot, ".");
      robot = robot.add(dir);
    } else {
      const { ok, boxes } = tryPushLevel2(robot, dir, grid);
      if (!ok) continue;

      if (!boxes.length) {
        grid.copy(robot, robot.add(dir));
        grid.set(robot, ".");
        robot = robot.add(dir);
        continue;
      }
      for (const box of boxes) {
        if (dir.x < 0) {
          grid.copy(box[0], box[0].add(dir));
          grid.copy(box[1], box[1].add(dir));
        } else if (dir.x > 0) {
          grid.copy(box[1], box[1].add(dir));
          grid.copy(box[0], box[0].add(dir));
        } else {
          grid.copy(box[0], box[0].add(dir));
          grid.copy(box[1], box[1].add(dir));
          grid.set(box[0], ".");
          grid.set(box[1], ".");
        }
      }
      grid.copy(robot, robot.add(dir));
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
  ok: boolean;
  boxes: Vector[];
} {
  const next = obj.add(dir);
  if (grid.get(next) === "#") return { ok: false, boxes: [] };
  if (grid.get(next) === ".") return { ok: true, boxes: [obj] };
  const { ok, boxes } = tryPushLevel1(next, dir, grid);
  return { ok, boxes: [...boxes, obj] };
}

function tryPushLevel2(obj: Vector, dir: Vector, grid: Grid<string>): {
  ok: boolean;
  boxes: Box[];
} {
  const next = obj.add(dir);
  if (grid.get(next) === "#") return { ok: false, boxes: [] };
  if (grid.get(next) === ".") return { ok: true, boxes: [] };
  const other = grid.get(next) === "[" ? next.add(RIGHT) : next.add(LEFT);
  const box: Box = grid.get(next) === "[" ? [next, other] : [other, next];
  if (dir.x) {
    // LEFT or RIGHT
    return tryPushLevel2BoxLeftRight(box, dir, grid);
  } else {
    // UP or DOWN
    return tryPushLevel2BoxUpDown(box, dir, grid);
  }
}

function tryPushLevel2BoxLeftRight(obj: Box, dir: Vector, grid: Grid<string>): {
  ok: boolean;
  boxes: Box[];
} {
  const next = obj[dir.x > 0 ? 1 : 0].add(dir);
  if (grid.get(next) === "#") return { ok: false, boxes: [] };
  if (grid.get(next) === ".") return { ok: true, boxes: [obj] };
  const { ok, boxes } = tryPushLevel2BoxLeftRight(
    [obj[0].add(dir).add(dir), obj[1].add(dir).add(dir)],
    dir,
    grid,
  );
  return { ok, boxes: [...boxes, obj] };
}

function tryPushLevel2BoxUpDown(obj: Box, dir: Vector, grid: Grid<string>): {
  ok: boolean;
  boxes: Box[];
} {
  const next = obj.map((x) => x.add(dir)) as Box;
  const nextSymbols = next.map((x) => grid.get(x)).join("");
  if (nextSymbols.includes("#")) return { ok: false, boxes: [] };
  if (nextSymbols === "..") return { ok: true, boxes: [obj] };
  const wrap = ({ ok, boxes }: { ok: boolean; boxes: Box[] }) => {
    if (!ok) return { ok, boxes: [] };
    return {
      ok,
      boxes: [...boxes, obj]
        .sort((a, b) => (b[0].y - a[0].y) * Math.sign(dir.y)),
    };
  };
  // ok ? { ok, boxes: sortBoxes([...boxes, obj]) } : { ok, boxes: [] };
  if (nextSymbols === "[]") {
    return wrap(tryPushLevel2BoxUpDown(next, dir, grid));
  }
  const nextL = next.map((x) => x.add(LEFT)) as Box;
  const nextR = next.map((x) => x.add(RIGHT)) as Box;
  if (nextSymbols === "].") {
    return wrap(tryPushLevel2BoxUpDown(nextL, dir, grid));
  }
  if (nextSymbols === ".[") {
    return wrap(tryPushLevel2BoxUpDown(nextR, dir, grid));
  }

  const { ok: okL, boxes: boxesL } = tryPushLevel2BoxUpDown(nextL, dir, grid);
  const { ok: okR, boxes: boxesR } = tryPushLevel2BoxUpDown(nextR, dir, grid);
  return wrap({ ok: okL && okR, boxes: [...boxesL, ...boxesR] });
}
