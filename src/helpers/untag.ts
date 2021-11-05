export function untag(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}
