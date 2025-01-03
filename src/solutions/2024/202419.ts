#! NO_COLOR=1 deno task solve --day 19 --year 2024

/**
 * Day 19: Linen Layout
 * @see https://adventofcode.com/2024/day/19
 */

import { cache } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const [stripePart, , ...designs] = input.split("\n");
  const stripes = stripePart.split(", ");
  const countFunc = cache((design: string) => {
    if (!design.length) return 1;
    let count = 0;
    for (const stripe of stripes) {
      if (!design.startsWith(stripe)) continue;
      const remainingCount = countFunc(design.slice(stripe.length));
      if (level === 1 && remainingCount) return 1;
      count += remainingCount;
    }
    return count;
  });
  return designs.reduce((count, design) => count + countFunc(design), 0);
}
