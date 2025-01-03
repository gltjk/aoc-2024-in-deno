import { directions, dirs, Vector, type VectorLike } from "./vector.ts";

const OutOfBound = Symbol("OutOfBound");

export class Grid<T> {
  constructor(public readonly array: T[][]) {}

  static from<U>(input: string): Grid<string>;
  static from<U>(input: { x: number; y: number; cell: U }): Grid<U>;
  static from<U>(
    input: string | { x: number; y: number; cell: U },
  ): Grid<string | U> {
    if (typeof input === "string") {
      return new Grid(input.split("\n").map((line) => line.split("")));
    }
    const { x, y, cell } = input;
    return new Grid(Array(y).fill(0).map(() => Array(x).fill(cell)));
  }

  static isOutOfBound<T>(value: T | symbol): value is symbol {
    return value === OutOfBound;
  }

  get size() {
    return { x: this.array[0].length, y: this.array.length };
  }

  toString() {
    return this.array.map((line) => line.join("")).join("\n");
  }

  copy(from: VectorLike, to: VectorLike) {
    const value = this.get(from);
    if (Grid.isOutOfBound(value)) return;
    this.set(to, value);
  }

  get({ x, y }: VectorLike) {
    if (!this.has({ x, y })) return OutOfBound;
    return this.array[y][x];
  }

  set({ x, y }: VectorLike, value: T) {
    if (!this.has({ x, y })) return;
    this.array[y][x] = value;
  }

  *iter() {
    for (const [y, line] of this.array.entries()) {
      for (const [x, cell] of line.entries()) {
        yield { loc: new Vector(x, y), cell } as Cell<T>;
      }
    }
  }

  has({ x, y }: VectorLike) {
    return x >= 0 && x < this.size.x && y >= 0 && y < this.size.y;
  }

  static edges(v: VectorLike): Edge[] {
    const p0 = Vector.from(v);
    const p = [p0, p0.add(dirs.E), p0.add(dirs.S), p0.add(directions.SE)];
    return [
      { from: p[0], to: p[1] },
      { from: p[0], to: p[2] },
      { from: p[1], to: p[3] },
      { from: p[2], to: p[3] },
    ];
  }

  *neighbors(v: VectorLike, all = false) {
    for (const dir of Object.values(all ? directions : dirs)) {
      const loc = Vector.from(v).add(dir);
      const cell = this.get(loc);
      if (!Grid.isOutOfBound(cell)) yield { loc, cell };
    }
  }

  dijkstra(
    start: Vector,
    isGoal: (loc: Vector) => boolean,
    isBlocked: (value: T) => boolean,
  ): number {
    const visited = Grid.from({ ...this.size, cell: false });
    const queue: { loc: Vector; distance: number }[] = [
      { loc: start, distance: 0 },
    ];
    while (queue.length) {
      const { loc, distance } = queue.shift()!;
      if (isGoal(loc)) return distance;
      if (visited.get(loc)) continue;
      visited.set(loc, true);
      for (const { loc: neighbor, cell } of this.neighbors(loc)) {
        if (isBlocked(cell) || visited.get(neighbor)) continue;
        queue.push({ loc: neighbor, distance: distance + 1 });
      }
    }
    return -1;
  }
}

export type Edge = { from: Vector; to: Vector };
export type Cell<T> = { loc: Vector; cell: T };
