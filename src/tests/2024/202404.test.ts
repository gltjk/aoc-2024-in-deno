#! NO_COLOR=1 deno task test --day 4 --year 2024

import solve from "../../solutions/2024/202404.ts";
import { assertEquals } from "jsr:@std/assert";

const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test("202404", () => {
  assertEquals(solve(example, 1), 18);
  assertEquals(solve(example, 2), 9);
});
