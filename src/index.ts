import { parseArgs } from "@std/cli/parse-args";
import { prepare } from "./utils.ts";

main();

async function main() {
  const { day } = parseArgs<{ day: number }>(Deno.args);

  if (!day) {
    console.error("Day is required");
    Deno.exit(1);
  }

  if (!Number.isInteger(day) || day < 1 || day > 25) {
    console.error("Day must be an integer between 1 and 25");
    Deno.exit(1);
  }

  try {
    const input = await prepare(day);

    const solve = await import(
      `./solutions/${String(day).padStart(2, "0")}.ts`
    ).then((x) => x.default as (input: string, level?: 1 | 2) => number);

    console.log("Answer 1:", solve(input, 1));
    console.log("Answer 2:", solve(input, 2));
  } catch (e) {
    console.error((e as Error).message);
    Deno.exit(1);
  }
}
