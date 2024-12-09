#! NO_COLOR=1 deno task test --day 7 --year 2024

import solve from "../../solutions/2024/202407.ts";
import { assertEquals } from "jsr:@std/assert";

const example = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

Deno.test("202407", () => {
  assertEquals(solve(example, 1), 3749);
  assertEquals(solve(example, 2), 11387);
});
