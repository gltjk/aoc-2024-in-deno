#! NO_COLOR=1 deno task solve --day 17 --year 2024

/**
 * Day 17: Chronospatial Computer
 * @see https://adventofcode.com/2024/day/17
 */

export default function solve(input: string, level: 1 | 2) {
  let [[a], [b], [c], program] = input.match(/[\d,]+/g)!.map((x) =>
    x.split(",").map(Number)
  );
  if (level === 1) return run(a, b, c, program).toArray().join(",");
  a = 1;
  let i = 0;
  while (true) {
    for (const output of run(a, b, c, program)) {
      if (output !== program[i]) {
        a++;
        i = 0;
        break;
      }
      i++;
    }
    if (i === program.length) return String(a);
  }
}

function* run(a: number, b: number, c: number, program: number[]) {
  let i = 0;
  const getCombo = (operand: number) =>
    operand < 4 ? operand : [a, b, c][operand - 4];

  while (i < program.length) {
    const [opcode, operand] = program.slice(i, i + 2);
    const combo = getCombo(operand);
    switch (opcode) {
      case 0: // adv
        a = Math.floor(a / 2 ** combo);
        break;
      case 1: // bxl
        b = b ^ operand;
        break;
      case 2: // bst
        b = combo % 8;
        break;
      case 3: // jnz
        if (a) i = operand - 2;
        break;
      case 4: // bxc
        b = b ^ c;
        break;
      case 5: // out
        // output.push(combo % 8);
        yield combo % 8;
        break;
      case 6: // bdv
        b = Math.floor(a / 2 ** combo);
        break;
      case 7: // cdv
        c = Math.floor(a / 2 ** combo);
        break;
    }
    i += 2;
  }
}
