import { ensureDirSync, existsSync } from "@std/fs";

const AOC_SESSION = Deno.env.get("AOC_SESSION") ?? "";
const BASE_URL = "https://adventofcode.com/2024/day";

export async function prepare(day: number) {
  ensureDirSync("./inputs");
  ensureDirSync("./src/solutions");
  const solvePath = `./src/solutions/${String(day).padStart(2, "0")}.ts`;
  const inputPath = `./inputs/${String(day).padStart(2, "0")}.txt`;
  if (!(existsSync(solvePath))) await prepareSolve(day, solvePath);
  if (!(existsSync(inputPath))) await prepareInput(day, inputPath);
  return Deno.readTextFile(inputPath);
}

async function prepareInput(day: number, path: string) {
  if (!AOC_SESSION) throw new Error("AOC_SESSION is not set");
  const input = await fetch(`${BASE_URL}/${day}/input`, {
    headers: { Cookie: `session=${AOC_SESSION}` },
  }).then((x) => x.text());
  return Deno.writeTextFile(path, input.replace(/\n$/, ""));
}

async function prepareSolve(day: number, path: string) {
  const url = `${BASE_URL}/${day}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch the question for day ${day}`);
  const title = ((await res.text())
    .match(/<h2>(.*)<\/h2>/)?.[1] ?? "")
    .replace(/^--- | ---$/g, "");
  return Deno.writeTextFile(path, genSolveTemplate(title, url, day));
}

function genSolveTemplate(title: string, url: string, day: number) {
  return `#! NO_COLOR=1 deno task solve --day ${day}

/**
 * ${title}
 * @see ${url}
 */

export default function (input: string, level: 1 | 2 = 1) {
}
`;
}
