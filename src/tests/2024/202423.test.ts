#! NO_COLOR=1 deno task test --day 23 --year 2024

import solve from "../../solutions/2024/202423.ts";
import { assertEquals } from "@std/assert";

const example = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

Deno.test("202423", () => {
  assertEquals(solve(example, 1), "7");
  assertEquals(solve(example, 2), "co,de,ka,ta");
});
