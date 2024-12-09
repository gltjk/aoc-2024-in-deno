import solve from "../../solutions/2024/202408.ts";
import { assertEquals } from "jsr:@std/assert";

const example = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

Deno.test("202408", () => {
  assertEquals(solve(example, 1), 14);
  assertEquals(solve(example, 2), 34);
});