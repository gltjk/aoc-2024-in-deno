#! NO_COLOR=1 deno task test --day 5 --year 2024

import solve from "../../solutions/2024/202405.ts";
import { assertEquals } from "@std/assert";

const example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

Deno.test("202405", () => {
  assertEquals(solve(example, 1), 143);
  assertEquals(solve(example, 2), 123);
});
