#! NO_COLOR=1 deno task test --day 19 --year 2024

import solve from "../../solutions/2024/202419.ts";
import { assertEquals } from "@std/assert";

const example = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

Deno.test("202419", () => {
  assertEquals(solve(example, 1), 6);
  assertEquals(solve(example, 2), 16);
});
