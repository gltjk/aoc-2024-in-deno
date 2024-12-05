import { parseArgs } from "@std/cli/parse-args";
import { prepare } from "./utils.ts";

main();

async function main() {
  const { year = 2024, day = 1 } = parseArgs<{ year: number; day: number }>(
    Deno.args,
  );

  if (!Number.isInteger(year) || year < 2015 || year > 2024) {
    console.error("Year must be an integer between 2015 and 2024");
    Deno.exit(1);
  }

  if (!Number.isInteger(day) || day < 1 || day > 25) {
    console.error("Day must be an integer between 1 and 25");
    Deno.exit(1);
  }

  try {
    const input = await prepare(year, day);

    const solve = await import(
      `./solutions/${year}/${year}${String(day).padStart(2, "0")}.ts`
    ).then((x) => x.default as (input: string, level?: 1 | 2) => number);

    console.log("Answer 1:", solve(input, 1));
    console.log("Answer 2:", solve(input, 2));
  } catch (e) {
    console.error((e as Error).message);
    Deno.exit(1);
  }
}
