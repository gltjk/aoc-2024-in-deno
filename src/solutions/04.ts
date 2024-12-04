#! NO_COLOR=1 deno task solve --day 4

/**
 * Day 4: Ceres Search
 * @see https://adventofcode.com/2024/day/4
 */

const directions: [number, number][] = [
  [1, 0], // east
  [0, 1], // south
  [-1, 0], // west
  [0, -1], // north
  [1, 1], // southeast
  [1, -1], // northeast
  [-1, 1], // southwest
  [-1, -1], // northwest
];

export default function (input: string, level: 1 | 2 = 1) {
  const rows = input.split("\n").map((x) => x.split(""));
  let count = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (level === 1) {
        for (const dir of directions) {
          if (go(rows, [j, i], dir, 4) === "XMAS") count += 1;
        }
      } else {
        const forwardSlash = go(rows, [j + 1, i - 1], [-1, 1], 3);
        const backslash = go(rows, [j - 1, i - 1], [1, 1], 3);
        if (forwardSlash !== "MAS" && forwardSlash !== "SAM") continue;
        if (backslash !== "MAS" && backslash !== "SAM") continue;
        count += 1;
      }
    }
  }
  return count;
}

function go(
  rows: string[][],
  from: [number, number],
  dir: [number, number],
  distance: number,
) {
  const path = [];
  const location = { ...from };
  for (let i = 0; i < distance; i++) {
    const here = rows?.[location[1]]?.[location[0]];
    if (!here) break;
    path.push(here);
    location[0] += dir[0];
    location[1] += dir[1];
  }
  return path.join("");
}
