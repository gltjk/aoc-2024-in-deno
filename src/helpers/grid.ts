import { directions, dirs, Vector, type VectorLike } from "./vector.ts";

const OutOfBound = Symbol("OutOfBound");

export class Grid<T> {
  constructor(public readonly array: T[][]) {}

  static from(input: string) {
    return new Grid(input.split("\n").map((line) => line.split("")));
  }

  static isOutOfBound<T>(value: T | symbol): value is symbol {
    return value === OutOfBound;
  }

  get size() {
    return { x: this.array[0].length, y: this.array.length };
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
        yield { loc: new Vector(x, y), cell };
      }
    }
  }

  has({ x, y }: VectorLike) {
    return x >= 0 && x < this.size.x && y >= 0 && y < this.size.y;
  }

  *neighbors(v: VectorLike, all = false) {
    for (const dir of Object.values(all ? directions : dirs)) {
      const loc = Vector.from(v).add(dir);
      const cell = this.get(loc);
      if (!Grid.isOutOfBound(cell)) yield { loc, cell };
    }
  }
}
