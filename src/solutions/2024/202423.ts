#! NO_COLOR=1 deno task solve --day 23 --year 2024

/**
 * Day 23: LAN Party
 * @see https://adventofcode.com/2024/day/23
 */

import { iterCombinations, MapEx } from "helpers";

export default function solve(input: string, level: 1 | 2) {
  const connections = new MapEx<string, Set<string>>(new Set());
  for (const line of input.split("\n")) {
    const [a, b] = line.split("-");
    connections.getEx(a).add(b);
    connections.getEx(b).add(a);
  }
  const computers = new Set(connections.keys());

  if (level === 1) {
    let count = 0;
    for (const [a, b, c] of iterCombinations([...computers], 3)) {
      if ([a, b, c].every((x) => !x.match(/^t/))) continue;
      if (
        connections.getEx(a).has(b) &&
        connections.getEx(b).has(c) &&
        connections.getEx(c).has(a)
      ) {
        count++;
      }
    }
    return count.toString();
  }

  let maxClique: string[] = [];

  function bronKerbosch(R: Set<string>, P: Set<string>, X: Set<string>) {
    if (!P.size && !X.size) {
      if (R.size > maxClique.length) maxClique = [...R];
      return;
    }
    const pivot = P.union(X).values().next().value;
    const pivotNeighbors = pivot ? connections.getEx(pivot) : new Set<string>();
    for (const v of P.difference(pivotNeighbors)) {
      const neighbors = connections.getEx(v);
      bronKerbosch(
        new Set(R).add(v),
        P.intersection(neighbors),
        X.intersection(neighbors),
      );
      P.delete(v);
      X.add(v);
    }
  }

  bronKerbosch(new Set(), computers, new Set());

  return maxClique.sort().join(",");
}
