export function getBit(num: number, index: number): number {
  if (num == null || index == null) throw new Error('num or index undefined');
  return num & (1 << index);
}
