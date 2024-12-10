#! NO_COLOR=1 deno task test --day 9 --year 2024

import solve from "../../solutions/2024/202409.ts";
import { assertEquals } from "@std/assert";

const example = `2333133121414131402`;

Deno.test("202409", () => {
  assertEquals(solve(example, 1), 1928);
  assertEquals(solve(example, 2), 2858);
});
