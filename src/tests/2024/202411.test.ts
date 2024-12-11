#! NO_COLOR=1 deno task test --day 11 --year 2024

import solve from "../../solutions/2024/202411.ts";
import { assertEquals } from "@std/assert";

const example = `125 17`;

Deno.test("202411", () => {
  assertEquals(solve(example, 1), 55312);
  //
  // assertEquals(solve(example, 2), 0);
});
