#! NO_COLOR=1 deno task test --day 10 --year 2024

import solve from "../../solutions/2024/202410.ts";
import { assertEquals } from "@std/assert";

const example = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

Deno.test("202410", () => {
  assertEquals(solve(example, 1), 36);
  assertEquals(solve(example, 2), 81);
});
