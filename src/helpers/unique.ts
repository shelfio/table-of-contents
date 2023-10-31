// Get a unique name and store the returned name in names for future
export function unique(names: Record<string, unknown>, name: string): string {
  let result = name;
  let count = 0;
  while (names[result]) {
    result = name + --count;
  }
  names[result] = true;

  return result;
}
