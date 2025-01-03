#! NO_COLOR=1 deno task test --day 18 --year 2024

import solve from "../../solutions/2024/202418.ts";
import { assertEquals } from "@std/assert";

const example = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

Deno.test("202418", () => {
  assertEquals(solve(example, 1, 6, 12), "22");
  assertEquals(solve(example, 2, 6, 12), "6,1");
});
