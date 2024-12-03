/**
 * Day 2: Red-Nosed Reports
 * @see https://adventofcode.com/2024/day/2
 */

export default function (input: string, level: 1 | 2) {
  const data = input.split("\n").map((x) => x.split(/\s+/).map(Number));
  if (level === 1) data.filter(isSafe).length;
  return data.filter((x) => isSafe(x) || removeAnElement(x).some(isSafe))
    .length;
}

function isSafe(arr: number[]) {
  const sign = Math.sign(arr[0] - arr[1]);
  if (!sign) return false;
  return arr.slice(0, -1).every((x, i) => {
    const delta = x - arr[i + 1];
    if (Math.sign(delta) !== sign) return false;
    return Math.abs(delta) <= 3;
  });
}

function* removeAnElement(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    const copy = [...arr];
    copy.splice(i, 1);
    yield copy;
  }
}
