#! NO_COLOR=1 deno task solve --day 11 --year 2024

/**
 * Day 11: Plutonian Pebbles
 * @see https://adventofcode.com/2024/day/11
 */

import { stringToNums } from "helpers";

function addCount(countMap: Map<number, number>, stone: number, count: number) {
  countMap.set(stone, (countMap.get(stone) || 0) + count);
}

export default function solve(input: string, level: 1 | 2) {
  const blink = level === 1 ? 25 : 75;

  let countMap = new Map<number, number>();

  for (const stone of stringToNums(input)) {
    addCount(countMap, stone, 1);
  }

  for (let i = 0; i < blink; i++) {
    const newCountMap = new Map<number, number>();

    for (const [stone, count] of countMap.entries()) {
      if (stone === 0) {
        addCount(newCountMap, 1, count);
        continue;
      }
      const len = stone.toString().length;
      if (len % 2 === 0) {
        addCount(newCountMap, +stone.toString().slice(0, len / 2), count);
        addCount(newCountMap, +stone.toString().slice(len / 2), count);
      } else {
        addCount(newCountMap, stone * 2024, count);
      }
    }

    countMap = newCountMap;
  }

  return countMap.values().reduce((a, b) => a + b, 0);
}
