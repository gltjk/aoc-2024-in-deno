#! NO_COLOR=1 deno task solve --day 12 --year 2024

/**
 * Day 12: Garden Groups
 * @see https://adventofcode.com/2024/day/12
 */

import { dirs, Grid, MapEx, Vector } from "helpers";

type Edge = { from: Vector; to: Vector };

export default function solve(input: string, level: 1 | 2) {
  const grid = Grid.from(input);
  // TODO: update `MapEx` to omit second type parameter in favor of inferring it from the first argument of constructor
  const map = new MapEx<
    string,
    { area: number; perimeter: number; cells: Vector[] }
  >({ area: 0, perimeter: 0, cells: [] as Vector[] });
  const nameMap = new MapEx<string, number>(0);

  const findSameNeighbors = (loc: Vector, cell: string) => {
    grid.set(loc, cell);
    map.getEx(cell).cells.push(loc);
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
  if (level === 1) {
    return map.values().reduce((acc, x) => acc + x.area * x.perimeter, 0);
  }

  for (const [cell, info] of map.entries()) {
    const edgeMap = new Map<string, Edge>();
    for (const c of info.cells) {
      const [upEdge, leftEdge, rightEdge, downEdge] = Grid.edges(c);
      const [upCell, leftCell, rightCell, downCell] = [
        grid.get(c.add(dirs.N)),
        grid.get(c.add(dirs.W)),
        grid.get(c.add(dirs.E)),
        grid.get(c.add(dirs.S)),
      ];
      if (upCell !== cell) {
        edgeMap.set(`${upEdge.from}->${upEdge.to}`, upEdge);
      }
      if (leftCell !== cell) {
        edgeMap.set(`${leftEdge.from}->${leftEdge.to}`, leftEdge);
      }
      if (downCell !== cell) {
        edgeMap.set(`${downEdge.from}->${downEdge.to}`, downEdge);
      }
      if (rightCell !== cell) {
        edgeMap.set(`${rightEdge.from}->${rightEdge.to}`, rightEdge);
      }
    }

    // The size of `edgeMap` should be equal to `perimeter` in level 1,
    // And the length of `cells` should be equal to `area` in level 1
    // But I still keep the algorithm in level 1 for recording my thought process
    // console.log(edgeMap.size, info.perimeter);
    // console.log(info.cells.length, info.area);

    const { "1,0": horizontal, "0,1": vertical } = Object.groupBy(
      edgeMap.values().toArray(),
      (x) => x.to.substract(x.from).toString(),
    );

    horizontal?.sort((a, b) => (a.from.y - b.from.y) || (a.from.x - b.from.x));
    vertical?.sort((a, b) => (a.from.x - b.from.x) || (a.from.y - b.from.y));

    const sides: Edge[] = [];

    for (const [i, edge] of horizontal!.entries()) {
      if (
        i === 0 || !edge.from.equals(sides.at(-1)!.to) ||
        vertical?.find((y) => y.to.equals(edge.from))
      ) {
        sides.push({ ...edge });
        continue;
      }
      sides.at(-1)!.to = edge.to;
    }

    for (const [i, edge] of vertical!.entries()) {
      if (
        i === 0 || !edge.from.equals(sides.at(-1)!.to) ||
        horizontal?.find((y) => y.to.equals(edge.from))
      ) {
        sides.push({ ...edge });
        continue;
      }
      sides.at(-1)!.to = edge.to;
    }

    info.perimeter = sides.length;
  }

  return map.values().reduce((acc, x) => acc + x.area * x.perimeter, 0);
}
