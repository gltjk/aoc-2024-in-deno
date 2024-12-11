#! NO_COLOR=1 deno task solve --day 11 --year 2024

/**
 * Day 11: Plutonian Pebbles
 * @see https://adventofcode.com/2024/day/11
 */

import { MapEx, stringToNums } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const blink = level === 1 ? 25 : 75;

  let countMap = new MapEx(0, stringToNums(input).map((x) => [x, 1]));

  for (let i = 0; i < blink; i++) {
    const newCountMap = new MapEx<number, number>(0);

    for (const [stone, count] of countMap.entries()) {
      if (!stone) {
        newCountMap.update(1, (x) => x + count);
        continue;
      }

      const str = stone.toString();

      if (str.length % 2) {
        newCountMap.update(stone * 2024, (x) => x + count);
        continue;
      }

      const half = str.length / 2;
      newCountMap.update(+str.slice(0, half), (x) => x + count);
      newCountMap.update(+str.slice(half), (x) => x + count);
    }

    countMap = newCountMap;
  }

  return countMap.values().reduce((a, b) => a + b, 0);
}
