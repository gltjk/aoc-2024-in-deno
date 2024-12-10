import { ensureDirSync, existsSync } from "@std/fs";

export type Day = { year: number; day: number };

const AOC_SESSION = Deno.env.get("AOC_SESSION") ?? "";
const BASE_URL = "https://adventofcode.com";

export function getPaths({ year, day }: Day) {
  const id = `${year}${String(day).padStart(2, "0")}`;
  const solve = `./src/solutions/${year}/${id}.ts`;
  const input = `./inputs/${year}/${id}.txt`;
  const test = `./src/tests/${year}/${id}.test.ts`;
  return { solve, input, test };
}

function getUrl({ year, day }: Day) {
  return `${BASE_URL}/${year}/day/${day}`;
}

export async function prepare(date: Day) {
  ensureDirSync(`./inputs/${date.year}`);
  ensureDirSync(`./src/solutions/${date.year}`);
  ensureDirSync(`./src/tests/${date.year}`);
  const { solve, input, test } = getPaths(date);
  if (!(existsSync(solve))) await prepareSolve(date, solve);
  if (!(existsSync(input))) await prepareInput(date, input);
  if (!(existsSync(test))) await prepareTest(date, test);
  return Deno.readTextFile(input);
}

async function prepareInput(date: Day, path: string) {
  if (!AOC_SESSION) throw new Error("AOC_SESSION is not set");
  const input = await fetch(`${getUrl(date)}/input`, {
    headers: { Cookie: `session=${AOC_SESSION}` },
  }).then((x) => x.text());
  return Deno.writeTextFile(path, input.replace(/\n$/, ""));
}

async function prepareSolve(date: Day, path: string) {
  const res = await fetch(getUrl(date));
  if (!res.ok) {
    throw new Error(`Failed to fetch the question for day ${date.day}`);
  }
  const title = ((await res.text())
    .match(/<h2>(.*)<\/h2>/)?.[1] ?? "")
    .replace(/^--- | ---$/g, "");
  return Deno.writeTextFile(path, genSolveTemplate(date, title));
}

function prepareTest(date: Day, path: string) {
  return Deno.writeTextFile(path, genTestTemplate(date));
}

function genSolveTemplate({ year, day }: Day, title: string) {
  return `#! NO_COLOR=1 deno task solve --day ${day} --year ${year}

/**
 * ${title}
 * @see ${getUrl({ year, day })}
 */

export default function solve(input: string, level: 1 | 2) {
  
}
`;
}

function genTestTemplate({ year, day }: Day) {
  const id = `${year}${String(day).padStart(2, "0")}`;
  return `#! NO_COLOR=1 deno task test --day ${day} --year ${year}

import solve from "../../solutions/${year}/${id}.ts";
import { assertEquals } from "@std/assert";

const example = \`\`;

Deno.test("${id}", () => {
  assertEquals(solve(example, 1), 0);
  assertEquals(solve(example, 2), 0);
});
`;
}
