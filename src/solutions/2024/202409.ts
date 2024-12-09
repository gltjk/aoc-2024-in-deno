#! NO_COLOR=1 deno task solve --day 9 --year 2024

/**
 * Day 9: Disk Fragmenter
 * @see https://adventofcode.com/2024/day/9
 */

export default function solve(input: string, level: 1 | 2) {
  const disk: { id: number; size: number }[] = [];
  let isFile = true, id = 0;
  for (const char of input) {
    disk.push({ id: isFile ? id : -1, size: +char });
    if (isFile) id++;
    isFile = !isFile;
  }
  const fullDisk = level === 1 ? level1(disk) : level2(disk);
  return fullDisk.reduce((acc, v, i) => acc + v * i, 0);
}

function level1(disk: { id: number; size: number }[]) {
  const fullDisk: number[] = disk.flatMap((x) => Array(x.size).fill(x.id));
  while (fullDisk.includes(-1)) {
    const index = fullDisk.indexOf(-1);
    fullDisk[index] = fullDisk.pop()!;
  }
  return fullDisk;
}

function level2(disk: { id: number; size: number }[]) {
  for (let id = disk[disk.length - 1].id; id > 0; id--) {
    const fileIndex = disk.findLastIndex((x) => x.id === id)!;
    const { size } = disk[fileIndex];
    const spaceIndex = disk.findIndex((x) => x.id === -1 && x.size >= size);
    if (spaceIndex === -1 || spaceIndex > fileIndex) continue;
    disk = disk
      .with(fileIndex, { id: -1, size })
      .toSpliced(spaceIndex, 1, { id, size }, {
        id: -1,
        size: disk[spaceIndex].size - size,
      });
  }
  return disk.flatMap((x) => Array(x.size).fill(x.id < 0 ? 0 : x.id));
}
