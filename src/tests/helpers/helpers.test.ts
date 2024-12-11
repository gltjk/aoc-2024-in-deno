#! NO_COLOR=1 deno test src/tests/helpers/helpers.test.ts

import { iterCombinations, stringToNums } from "helpers";
import { assertEquals } from "@std/assert";

Deno.test("iterCombinations - normal cases", () => {
  const array = [1, 2, 3, 4];
  assertEquals(iterCombinations(array, 1).toArray(), [[1], [2], [3], [4]]);
  assertEquals(
    iterCombinations(array, 2).toArray(),
    [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]],
  );
});

Deno.test("iterCombinations - edge cases", () => {
  assertEquals(iterCombinations([], 2).toArray(), []);
  assertEquals(iterCombinations([1, 2, 3], 0).toArray(), []);
  assertEquals(iterCombinations([1, 2, 3], 5).toArray(), [[1, 2, 3]]);
});

Deno.test("stringToNums - various inputs", () => {
  assertEquals(stringToNums("42"), [42]);
  assertEquals(stringToNums("1 2 3"), [1, 2, 3]);
  assertEquals(stringToNums("10   20    30"), [10, 20, 30]);
  assertEquals(stringToNums("  1 2 3  "), [1, 2, 3]);
  assertEquals(stringToNums(""), []);
  assertEquals(stringToNums("   "), []);
});
