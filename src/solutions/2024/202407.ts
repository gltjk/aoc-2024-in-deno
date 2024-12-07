#! NO_COLOR=1 deno task solve --day 7 --year 2024

/**
 * Day 7: Bridge Repair
 * @see https://adventofcode.com/2024/day/7
 */

export default function solve(input: string, level: 1 | 2) {
  const calibrations = input.split("\n").map((x) => {
    const [left, right] = x.split(": ");
    return { result: +left, parts: right.split(" ").map(Number) };
  });
  let sum = 0;
  for (const { result, parts } of calibrations) {
    if (!isCalibrationTrue(result, parts, level)) continue;
    sum += result;
  }
  return sum;
}

function isCalibrationTrue(result: number, parts: number[], level: 1 | 2) {
  for (const operators of permuteBase(parts.length - 1, level + 1)) {
    const value = operators.reduce((acc, op, i) =>
      [
        () => acc + parts[i + 1],
        () => acc * parts[i + 1],
        () => +`${acc}${parts[i + 1]}`,
      ][+op](), parts[0]);
    if (value === result) return true;
  }
  return false;
}

function* permuteBase(length: number, base: number) {
  for (let i = 0; i < base ** length; i++) {
    yield i.toString(base).padStart(length, "0").split("");
  }
}
