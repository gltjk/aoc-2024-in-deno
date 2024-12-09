import { type Day, getPaths, prepare } from "../utils.ts";
import { fromFileUrl, resolve } from "@std/path";

export async function test(date: Day) {
  await prepare(date);
  const absoluteTestPath = resolve(
    fromFileUrl(Deno.mainModule),
    getPaths(date).test.replace(/^\.\/src/, ".."),
  );
  const command = new Deno.Command(Deno.execPath(), {
    args: ["test", absoluteTestPath],
  });
  const { stdout, stderr } = await command.output();
  console.log(new TextDecoder().decode(stdout).trim());
  if (stderr.length) console.error(new TextDecoder().decode(stderr).trim());
}
