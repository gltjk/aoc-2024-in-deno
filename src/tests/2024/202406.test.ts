#! NO_COLOR=1 deno task test --day 6 --year 2024

import solve from "../../solutions/2024/202406.ts";
import { assertEquals } from "jsr:@std/assert";

const example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

Deno.test("202406", () => {
  assertEquals(solve(example, 1), 41);
  assertEquals(solve(example, 2), 6);
});
