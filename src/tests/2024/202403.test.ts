#! NO_COLOR=1 deno task test --day 3 --year 2024

import solve from "../../solutions/2024/202403.ts";
import { assertEquals } from "jsr:@std/assert";

const example1 =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const example2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

Deno.test("202403", () => {
  assertEquals(solve(example1, 1), 161);
  assertEquals(solve(example2, 2), 48);
});
