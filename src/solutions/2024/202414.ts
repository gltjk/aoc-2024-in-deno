#! NO_COLOR=1 deno task solve --day 14 --year 2024

/**
 * Day 14: Restroom Redoubt
 * @see https://adventofcode.com/2024/day/14
 */

import { Vector } from "helpers";

type Robot = { p: Vector; v: Vector };

export default function solve(
  input: string,
  level: 1 | 2,
  bound = { x: 101, y: 103 },
) {
  const robots = input.split("\n").map((x) => {
    const [px, py, vx, vy] = x.match(/-?\d+/g)!.map(Number);
    return { p: new Vector(px, py), v: new Vector(vx, vy) };
  });

  if (level === 1) {
    for (let t = 0; t < 100; t++) moveRobots(robots, bound);
    const halfBound = { x: (bound.x - 1) / 2, y: (bound.y - 1) / 2 };
    const quadrants: Record<string, number> = { NE: 0, SE: 0, SW: 0, NW: 0 };
    for (const { p } of robots) {
      const q1 = p.y < halfBound.y ? "N" : p.y > halfBound.y ? "S" : "";
      const q2 = p.x < halfBound.x ? "W" : p.x > halfBound.x ? "E" : "";
      const quadrant = `${q1}${q2}`;
      if (quadrant.length > 1) quadrants[quadrant]++;
    }
    return quadrants.NE * quadrants.SE * quadrants.SW * quadrants.NW;
  }

  let t = 0;
  while (!isXmasTree(robots)) {
    moveRobots(robots, bound);
    t++;
  }
  return t;
}

function moveRobots(robots: Robot[], bound: { x: number; y: number }) {
  for (const robot of robots) {
    robot.p = robot.p.add(robot.v);
    while (robot.p.x < 0) robot.p.x += bound.x;
    while (robot.p.x >= bound.x) robot.p.x -= bound.x;
    while (robot.p.y < 0) robot.p.y += bound.y;
    while (robot.p.y >= bound.y) robot.p.y -= bound.y;
  }
}

function isXmasTree(robots: Robot[]) {
  const set = new Set(robots.map((x) => x.p.toString()));
  return set.size === robots.length;
}
