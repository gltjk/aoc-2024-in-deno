import solve from "../../solutions/2024/202402.ts";
import { assertEquals } from "jsr:@std/assert";

const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

Deno.test("202402", () => {
  assertEquals(solve(example, 1), 2);
  assertEquals(solve(example, 2), 4);
});
