#! NO_COLOR=1 deno task test --day 12 --year 2024

import solve from "../../solutions/2024/202412.ts";
import { assertEquals } from "@std/assert";

const example1 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

const example2 = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

Deno.test("202412", () => {
  assertEquals(solve(example1, 1), 1930);
  assertEquals(solve(example1, 2), 1206);
  assertEquals(solve(example2, 2), 368);
});
