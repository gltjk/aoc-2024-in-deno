#! NO_COLOR=1 deno task test --day 14 --year 2024

import solve from "../../solutions/2024/202414.ts";
import { assertEquals } from "@std/assert";

const example = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

Deno.test("202414", () => {
  assertEquals(solve(example, 1, { x: 11, y: 7 }), 12);
  // assertEquals(solve(example, 2), 0);
});
