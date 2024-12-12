#! NO_COLOR=1 deno task test --day 12 --year 2024

import solve from "../../solutions/2024/202412.ts";
import { assertEquals } from "@std/assert";

const example = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

Deno.test("202412", () => {
  assertEquals(solve(example, 1), 1930);
  // assertEquals(solve(example, 2), 1206);
});
