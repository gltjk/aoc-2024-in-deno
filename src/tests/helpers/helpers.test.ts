#! NO_COLOR=1 deno test src/tests/helpers/helpers.test.ts

import { iterCombinations } from "helpers";
import { assertEquals } from "@std/assert";

Deno.test("iterCombinations - empty array", () => {
  const array: number[] = [];
  const result = iterCombinations(array, 2).toArray();
  assertEquals(result, []);
});

Deno.test("iterCombinations - size is 0", () => {
  const array = [1, 2, 3];
  const result = iterCombinations(array, 0).toArray();
  assertEquals(result, []);
});

Deno.test("iterCombinations - size is 1", () => {
  const array = [1, 2, 3];
  const result = iterCombinations(array, 1).toArray();
  assertEquals(result, [[1], [2], [3]]);
});

Deno.test("iterCombinations - size is 2", () => {
  const array = [1, 2, 3, 4];
  const result = iterCombinations(array, 2).toArray();
  assertEquals(
    result,
    [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]],
  );
});

Deno.test("iterCombinations - size is equal to array length", () => {
  const array = [1, 2, 3];
  const result = iterCombinations(array, 3).toArray();
  assertEquals(result, [[1, 2, 3]]);
});

Deno.test("iterCombinations - size is greater than array length", () => {
  const array = [1, 2, 3];
  const result = iterCombinations(array, 5).toArray();
  assertEquals(result, [[1, 2, 3]]);
});
