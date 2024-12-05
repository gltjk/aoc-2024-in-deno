import { ensureDirSync, existsSync } from "@std/fs";

const AOC_SESSION = Deno.env.get("AOC_SESSION") ?? "";
const BASE_URL = "https://adventofcode.com";

export async function prepare(year: number, day: number) {
  ensureDirSync(`./inputs/${year}`);
  ensureDirSync(`./src/solutions/${year}`);
  const fileName = `${year}${String(day).padStart(2, "0")}`;
  const solvePath = `./src/solutions/${year}/${fileName}.ts`;
  const inputPath = `./inputs/${year}/${fileName}.txt`;
  if (!(existsSync(solvePath))) await prepareSolve(year, day, solvePath);
  if (!(existsSync(inputPath))) await prepareInput(year, day, inputPath);
  return Deno.readTextFile(inputPath);
}

async function prepareInput(year: number, day: number, path: string) {
  if (!AOC_SESSION) throw new Error("AOC_SESSION is not set");
  const input = await fetch(`${BASE_URL}/${year}/day/${day}/input`, {
    headers: { Cookie: `session=${AOC_SESSION}` },
  }).then((x) => x.text());
  return Deno.writeTextFile(path, input.replace(/\n$/, ""));
}

async function prepareSolve(year: number, day: number, path: string) {
  const url = `${BASE_URL}/${year}/day/${day}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch the question for day ${day}`);
  const title = ((await res.text())
    .match(/<h2>(.*)<\/h2>/)?.[1] ?? "")
    .replace(/^--- | ---$/g, "");
  return Deno.writeTextFile(path, genSolveTemplate(title, url, year, day));
}

function genSolveTemplate(
  title: string,
  url: string,
  year: number,
  day: number,
) {
  return `#! NO_COLOR=1 deno task solve --day ${day} --year ${year}

/**
 * ${title}
 * @see ${url}
 */

export default function solve(input: string, level: 1 | 2) {
}
`;
}
