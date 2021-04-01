import { SIZE, GridParam, BOX_SIZE, Grid } from './constant';

export function verifyGrid(grid: Grid): GridParam {
  if (grid == null) throw new Error('grid is null or undefined');
  if (grid.length != 9 || grid[0].length != 9) throw new Error('invalid grid size');
  const param = makeGridParam();
  for (let i = 0; i < SIZE; i++) {
    param.boxSets[i] = getBoxSet(grid, i);
    param.colSets[i] = getColSet(grid, i);
    param.rowSets[i] = getRowSet(grid, i);
  }
  return param;
}

export function solveSudoku(grid: Grid, params: GridParam): Grid {
  return null;
}

function makeGridParam() {
  const param: GridParam = {
    rowSets: new Array<number>(SIZE),
    colSets: new Array<number>(SIZE),
    boxSets: new Array<number>(SIZE),
  };
  return param;
}

export function getRowSet(grid: Grid, row: number): number {
  let set = 0;
  for (let i = 0; i < SIZE; i++) {
    if (!grid[row][i] || grid[row][i] === 0) continue;
    const mask = 1 << (grid[row][i] - 1);
    if ((set & mask) !== 0) throw new Error(`invalid grid row ${row} contain multiple ${grid[row][i]}`);
    set = set | mask;
  }
  return set;
}

export function getColSet(grid: Grid, col: number): number {
  let set = 0;
  for (let i = 0; i < SIZE; i++) {
    if (!grid[i][col] || grid[i][col] === 0) continue;
    const mask = 1 << (grid[i][col] - 1);
    if ((set & mask) !== 0) throw new Error(`invalid grid col ${col} contain multiple ${grid[i][col]}`);
    set = set | mask;
  }
  return set;
}

export function getBoxSet(grid: Grid, box: number): number {
  let set = 0;
  const row = Math.floor(box / 3) * 3;
  const col = box % 3;
  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (!grid[row + i][col + j]) continue;
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
