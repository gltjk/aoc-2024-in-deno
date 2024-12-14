#! NO_COLOR=1 deno task solve --day 13 --year 2024

/**
 * Day 13: Claw Contraption
 * @see https://adventofcode.com/2024/day/13
 */

export default function solve(input: string, level: 1 | 2) {
  const machines = input.split("\n\n").map((x) => {
    let [ax, ay, bx, by, px, py] = x.match(/\d+/g)!.map(Number);
    if (level == 2) {
      px += 1e13;
      py += 1e13;
    }
    return {
      a: { x: ax, y: ay },
      b: { x: bx, y: by },
      prize: { x: px, y: py },
    };
  });

  return machines.reduce((sum, { a, b, prize }) => {
    const det = a.x * b.y - a.y * b.x;
    if (!det) return sum;
    const x = (prize.x * b.y - prize.y * b.x) / det;
    const y = (a.x * prize.y - a.y * prize.x) / det;
    if (x % 1 || y % 1 || x < 0 || y < 0) return sum;
    return sum + 3 * x + y;
  }, 0);
}
