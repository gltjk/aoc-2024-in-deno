#! NO_COLOR=1 deno task solve --day 22 --year 2024

/**
 * Day 22: Monkey Market
 * @see https://adventofcode.com/2024/day/22
 */

import { MapEx } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const initials = input.split("\n").map(Number);
  if (level === 1) {
    return initials.reduce(
      (acc, x) => acc + getSecret(x).drop(2000).next().value!,
      0,
    );
  }

  const sumSeqs = new MapEx<string, number>(0);
  for (const initial of initials) {
    const seqs = getMostBananas(
      getSecret(initial).map((x) => x % 10).take(2001).toArray(),
    );
    for (const [key, value] of seqs) {
      sumSeqs.set(key, sumSeqs.getEx(key) + value);
    }
  }
  return sumSeqs.values().reduce((acc, x) => Math.max(acc, x), 0);
}

function getMostBananas(arr: number[]) {
  const seqs = new Map<string, number>();
  const deltas = arr.slice(1).map((x, i) => x - arr[i]);
  for (let i = 0; i <= deltas.length - 4; i++) {
    const sequence = deltas.slice(i, i + 4).join(",");
    if (seqs.has(sequence)) continue;
    seqs.set(sequence, arr[i + 4]);
  }
  return seqs;
}

function* getSecret(secret: number) {
  while (true) {
    yield secret;
    secret = pruneMix(secret * 64, secret);
    secret = pruneMix(secret / 32, secret);
    secret = pruneMix(secret * 2048, secret);
  }
}

function pruneMix(value: number, secret: number) {
  const ret = (value ^ secret) % 16777216;
  return ret < 0 ? ret + 16777216 : ret;
}
