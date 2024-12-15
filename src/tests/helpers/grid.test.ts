#! NO_COLOR=1 deno test src/tests/helpers/grid.test.ts

import { Grid, Vector } from "helpers";
import { assertEquals } from "@std/assert";

const input = "abc\ndef\nghi";
const grid = Grid.from(input);

Deno.test("Grid.from creates a grid from a string", () => {
  const expectedArray = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];
  assertEquals(grid.array, expectedArray);
});

Deno.test("Grid.size returns correct dimensions", () => {
  const size = grid.size;
  assertEquals(size, { x: 3, y: 3 });
});

Deno.test("Grid.get returns correct element or OutOfBound", () => {
  assertEquals(grid.get({ x: 1, y: 1 }), "e");
  assertEquals(Grid.isOutOfBound(grid.get({ x: 3, y: 3 })), true);
});

Deno.test("Grid.has checks if a position is within bounds", () => {
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

Deno.test("Grid.neighbors yields correct adjacent elements (4 directions)", () => {
  const neighbors = grid.neighbors({ x: 1, y: 1 }).toArray();
  const expected = [
    { loc: new Vector(1, 0), cell: "b" },
    { loc: new Vector(2, 1), cell: "f" },
    { loc: new Vector(1, 2), cell: "h" },
    { loc: new Vector(0, 1), cell: "d" },
  ];
  assertEquals(neighbors, expected);
});

Deno.test("Grid.neighbors yields correct elements with all=true (8 directions)", () => {
  const neighbors = grid.neighbors({ x: 1, y: 1 }, true).toArray();
  const expected = [
    { loc: new Vector(1, 0), cell: "b" },
    { loc: new Vector(2, 0), cell: "c" },
    { loc: new Vector(2, 1), cell: "f" },
    { loc: new Vector(2, 2), cell: "i" },
    { loc: new Vector(1, 2), cell: "h" },
    { loc: new Vector(0, 2), cell: "g" },
    { loc: new Vector(0, 1), cell: "d" },
    { loc: new Vector(0, 0), cell: "a" },
  ];
  assertEquals(neighbors, expected);
});

Deno.test("Grid.neighbors handles edge positions correctly", () => {
  const cornerNeighbors = grid.neighbors({ x: 0, y: 0 }).toArray();
  const expected = [
    { loc: new Vector(1, 0), cell: "b" },
    { loc: new Vector(0, 1), cell: "d" },
  ];
  assertEquals(cornerNeighbors, expected);
});

Deno.test("Grid.copy copies value from one position to another", () => {
  const input = "ab\ncd";
  const grid = Grid.from(input);

  // normal copy
  grid.copy({ x: 0, y: 0 }, { x: 1, y: 1 });
  assertEquals(grid.array, [["a", "b"], ["c", "a"]]);

  // out of bound copy
  grid.copy({ x: 2, y: 2 }, { x: 0, y: 0 });
  assertEquals(grid.array, [["a", "b"], ["c", "a"]]);
});

Deno.test("Grid.toString returns string representation of grid", () => {
  const input = "ab\ncd";
  const grid = Grid.from(input);

  assertEquals(grid.toString(), "ab\ncd");
});
