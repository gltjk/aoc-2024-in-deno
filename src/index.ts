import { parseArgs } from "@std/cli/parse-args";
import { solve, test } from "./commands/index.ts";

main();

async function main() {
  const { year = 2024, day = 1, _: [cmd] } = parseArgs<
    { year: number; day: number }
  >(Deno.args);

  if (!Number.isInteger(year) || year < 2015 || year > 2024) {
    console.error("Year must be an integer between 2015 and 2024");
    Deno.exit(1);
  }

  if (!Number.isInteger(day) || day < 1 || day > 25) {
    console.error("Day must be an integer between 1 and 25");
    Deno.exit(1);
  }

  try {
    switch (cmd) {
      case "solve":
        await solve({ year, day });
        break;
      case "test":
        await test({ year, day });
        break;
      default:
        throw new Error(`Unknown command: ${cmd}`);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    Deno.exit(1);
  }
}
