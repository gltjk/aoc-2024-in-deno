#! NO_COLOR=1 deno task test --day 22 --year 2024

import solve from "../../solutions/2024/202422.ts";
import { assertEquals } from "@std/assert";

const example1 = `1
10
100
2024`;
const example2 = `1
2
3
2024`;

Deno.test("202422", () => {
  assertEquals(solve(example1, 1), 37327623);
  assertEquals(solve(example2, 2), 23);
});
