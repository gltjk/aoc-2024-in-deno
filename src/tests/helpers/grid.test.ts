import { Grid, Vector } from "helpers";
import { assertEquals } from "@std/assert";

Deno.test("Grid.from creates a grid from a string", () => {
  const input = "abc\ndef\nghi";
  const grid = Grid.from(input);
  const expectedArray = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];
  assertEquals(grid.array, expectedArray);
});

Deno.test("Grid.size returns correct dimensions", () => {
  const input = "abc\ndef\nghi";
  const grid = Grid.from(input);
  const size = grid.size;
  assertEquals(size, { x: 3, y: 3 });
});

Deno.test("Grid.get returns correct element or OutOfBound", () => {
  const input = "abc\ndef\nghi";
  const grid = Grid.from(input);
  assertEquals(grid.get({ x: 1, y: 1 }), "e");
  assertEquals(Grid.isOutOfBound(grid.get({ x: 3, y: 3 })), true);
});

Deno.test("Grid.has checks if a position is within bounds", () => {
  const input = "abc\ndef\nghi";
  const grid = Grid.from(input);
  assertEquals(grid.has({ x: 1, y: 1 }), true);
  assertEquals(grid.has({ x: 3, y: 3 }), false);
});

Deno.test("Grid.iter iterates over all elements", () => {
  const input = "ab\ncd";
  const grid = Grid.from(input);
  const elements = grid.iter().toArray();
  const expectedElements = [
    { loc: new Vector(0, 0), cell: "a" },
    { loc: new Vector(1, 0), cell: "b" },
    { loc: new Vector(0, 1), cell: "c" },
    { loc: new Vector(1, 1), cell: "d" },
  ];
  assertEquals(elements, expectedElements);
});
