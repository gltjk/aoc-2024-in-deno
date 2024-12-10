#! NO_COLOR=1 deno test src/tests/helpers/vector.test.ts

import { directions, Vector } from "helpers";
import { assertEquals } from "@std/assert";

Deno.test("Vector.from creates a new Vector from VectorLike", () => {
  const vectorLike = { x: 3, y: 4 };
  assertEquals(Vector.from(vectorLike), new Vector(3, 4));
});

Deno.test("Vector.toString returns a string representation", () => {
  assertEquals(new Vector(3, 4).toString(), "3,4");
});

Deno.test("Vector.equals checks for equality", () => {
  const vector1 = new Vector(3, 4);
  assertEquals(vector1.equals(new Vector(3, 4)), true);
  assertEquals(vector1.equals(new Vector(5, 6)), false);
});

Deno.test("Vector.add adds two vectors", () => {
  assertEquals(
    new Vector(3, 4).add(new Vector(1, 2)),
    new Vector(4, 6),
  );
});

Deno.test("Vector.substract subtracts two vectors", () => {
  assertEquals(
    new Vector(3, 4).substract(new Vector(1, 2)),
    new Vector(2, 2),
  );
});

Deno.test("Vector.scale scales a vector", () => {
  assertEquals(new Vector(3, 4).scale(2), new Vector(6, 8));
});

Deno.test("Vector.rotate rotates a vector by an angle", () => {
  assertEquals(
    new Vector(1, 0).rotate(Math.PI / 2),
    new Vector(0, 1),
  );
});

Deno.test("Direction constants are correct", () => {
  assertEquals(directions.S, new Vector(0, 1));
  assertEquals(directions.E, new Vector(1, 0));
  assertEquals(directions.W, new Vector(-1, 0));
  assertEquals(directions.N, new Vector(0, -1));
  assertEquals(directions.SE, new Vector(1, 1));
  assertEquals(directions.NE, new Vector(1, -1));
  assertEquals(directions.SW, new Vector(-1, 1));
  assertEquals(directions.NW, new Vector(-1, -1));
});

Deno.test("Vector.unique removes duplicate vectors using string representation", () => {
  const vectors = [
    new Vector(1, 1),
    new Vector(1, 1),
    new Vector(2, 2),
    { x: 1, y: 1 },
  ];

  const unique = Vector.unique(vectors).toArray();
  assertEquals(unique, [new Vector(1, 1), new Vector(2, 2)]);
});

Deno.test("Vector.unique works with empty iterable", () => {
  const unique = Vector.unique([]).toArray();
  assertEquals(unique, []);
});
