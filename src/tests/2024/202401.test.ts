#! NO_COLOR=1 deno task test --day 1 --year 2024

import solve from "../../solutions/2024/202401.ts";
import { assertEquals } from "jsr:@std/assert";

const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test("202401", () => {
  assertEquals(solve(example, 1), 11);
  assertEquals(solve(example, 2), 31);
});
