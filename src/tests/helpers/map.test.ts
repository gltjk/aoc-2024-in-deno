#! NO_COLOR=1 deno test src/tests/helpers/map.test.ts

import { MapEx } from "helpers";
import { assertEquals } from "@std/assert";

Deno.test("MapEx - basic operations", () => {
  const map = new MapEx<string, number>(0);

  // Test get with default value
  assertEquals(map.get("nonexistent"), undefined);

  // Test update on non-existent key
  map.update("a", (v) => v + 1);
  assertEquals(map.get("a"), 1);

  // Test update on existing key
  map.update("a", (v) => v + 2);
  assertEquals(map.get("a"), 3);
});

Deno.test("MapEx - constructor with initial values", () => {
  const map = new MapEx<string, number>(0, [["x", 5]]);
  assertEquals(map.get("x"), 5);

  map.update("x", (v) => v * 2);
  assertEquals(map.get("x"), 10);
});
