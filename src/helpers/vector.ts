#! deno
export type VectorLike = { x: number; y: number };

export class Vector {
  constructor(public x: number, public y: number) {}

  static from(vector: VectorLike) {
    return new Vector(vector.x, vector.y);
  }

  toString() {
    return `${this.x},${this.y}`;
  }

  equals({ x, y }: VectorLike) {
    return this.x === x && this.y === y;
  }

  add({ x, y }: VectorLike) {
    return new Vector(this.x + x, this.y + y);
  }

  substract({ x, y }: VectorLike) {
    return this.add({ x: -x, y: -y });
  }

  scale(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  rotate(angle: number) {
    return new Vector(
      this.x * cos(angle) - this.y * sin(angle),
      this.x * sin(angle) + this.y * cos(angle),
    );
  }
}

function cos(angle: number) {
  const res = Math.cos(angle);
  return Math.abs(res) < Number.EPSILON ? 0 : res;
}

function sin(angle: number) {
  const res = Math.sin(angle);
  return Math.abs(res) < Number.EPSILON ? 0 : res;
}

export const SOUTH = new Vector(0, 1);
export const EAST = new Vector(1, 0);
export const WEST = new Vector(-1, 0);
export const NORTH = new Vector(0, -1);
export const SOUTHEAST = new Vector(1, 1);
export const NORTHEAST = new Vector(1, -1);
export const SOUTHWEST = new Vector(-1, 1);
export const NORTHWEST = new Vector(-1, -1);
export const UP = NORTH;
export const DOWN = SOUTH;
export const LEFT = WEST;
export const RIGHT = EAST;

export const directions = {
  E: EAST,
  S: SOUTH,
  W: WEST,
  N: NORTH,
  SE: SOUTHEAST,
  NE: NORTHEAST,
  SW: SOUTHWEST,
  NW: NORTHWEST,
};

// console.log(UP.rotate(Math.PI / 2).equals(RIGHT)); //.rotate(Math.PI / 2));
