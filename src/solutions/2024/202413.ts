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

  let sum = 0;
  for (const { a, b, prize } of machines) {
    const { gcd: gcdY } = extendedGCD(a.y, b.y);
    if (prize.y % gcdY) continue;

    let min = Infinity;

    for (const pos of getPos(a.x, b.x, prize.x)) {
      if (a.y * pos.x + b.y * pos.y !== prize.y) continue;
      min = Math.min(min, pos.x * 3 + pos.y);
      break;
    }
    if (min !== Infinity) sum += min;
  }
  return sum;
}

function extendedGCD(
  a: number,
  b: number,
): { gcd: number; x: number; y: number } {
  if (!a) return { gcd: b, x: 0, y: 1 };
  const { gcd, x, y } = extendedGCD(b % a, a);
  return { gcd, x: y - Math.floor(b / a) * x, y: x };
}

function* getPos(a: number, b: number, target: number) {
  const { gcd, x, y } = extendedGCD(a, b);
  if (target % gcd) return;
  const k = target / gcd;
  const [x0, y0] = [x * k, y * k];
  const [dx, dy] = [b / gcd, -a / gcd];
  for (let n = Math.ceil(-x0 / dx); n <= Math.floor(-y0 / dy); n++) {
    const [xn, yn] = [x0 + n * dx, y0 + n * dy];
    if (xn <= 0 || yn <= 0) continue;
    yield { x: xn, y: yn };
  }
}
