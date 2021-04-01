export const SIZE = 9;
export const BOX_SIZE = 3;

export function getRowSet(grid: number[][], row: number): number {
  let set = 0;
  for (let i = 0; i < SIZE; i++) {
    if (!grid[row][i] || grid[row][i] === 0) continue;
    const mask = 1 << (grid[row][i] - 1);
    if ((set & mask) !== 0) throw new Error(`invalid grid row ${row} contain multiple ${grid[row][i]}`);
    set = set | mask;
  }
  return set;
}

export function getColSet(grid: number[][], col: number): number {
  let set = 0;
  for (let i = 0; i < SIZE; i++) {
    if (!grid[i][col] || grid[i][col] === 0) continue;
    const mask = 1 << (grid[i][col] - 1);
    if ((set & mask) !== 0) throw new Error(`invalid grid col ${col} contain multiple ${grid[i][col]}`);
    set = set | mask;
  }
  return set;
}

export function getBoxSet(grid: number[][], box: number): number {
  let set = 0;
  const row = Math.floor(box / 3) * 3;
  const col = box % 3;
  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (!grid[row + i][col + j] || grid[row + i][col + j] == 0) continue;
      const mask = 1 << (grid[row + i][col + j] - 1);
      if ((set & mask) !== 0) {
        const value = grid[row + i][col + j];
        const message = `invalid grid box ${box} contain multiple ${value}`;
        throw new Error(message);
      }
      set = set | mask;
    }
  }
  return set;
}
