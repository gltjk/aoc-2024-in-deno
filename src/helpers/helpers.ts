export function* iterCombinations<T>(
  array: T[],
  size = 1,
): Generator<T[], void, unknown> {
  if (size === 0) return;
  if (size === 1) {
    for (const item of array) yield [item];
    return;
  }
  if (size > array.length) size = array.length;
  for (let i = 0; i < array.length; i++) {
    for (
      const combination of iterCombinations(array.slice(i + 1), size - 1)
    ) {
      yield [array[i], ...combination];
    }
  }
}

export function stringToNums(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return [] as number[];
  return trimmed.split(/\s+/).map(Number);
}
