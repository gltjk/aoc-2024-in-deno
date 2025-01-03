#! NO_COLOR=1 deno task test --day 17 --year 2024

import solve from "../../solutions/2024/202417.ts";
import { assertEquals } from "@std/assert";

const example1 = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const example2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

Deno.test("202417", () => {
  assertEquals(solve(example1, 1), "4,6,3,5,6,3,5,2,1,0");
  assertEquals(solve(example2, 2), "117440");
});
