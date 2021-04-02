import { GRID_SIZE } from './constant';
import { Grid } from './types/grid';

export function fillGridWithDefaultValue(grid: Grid, val: number = 0) {
  if (grid == null) throw new Error('grid is null or undefined');
  const clone: Grid = [];
  for (let row of grid) {
    const cloneRow = [];
    for (let cell of row) cloneRow.push(cell || val);
    clone.push(cloneRow);
  }
  return clone;
}

export function getBoxFromRolCol(row: number, col: number) {
  if (!Number.isFinite(row) || !Number.isFinite(col)) throw new Error('row or column null or undefined');
  if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) throw new Error('row or col out of bound');
  return 3 * Math.floor(row / 3) + Math.floor(col / 3);
}

export function makeGrid(rowCnt: number, colCnt: number, val: number = 0) {
  if (!Number.isFinite(rowCnt) || !Number.isFinite(colCnt))
    throw new Error('rowCnt or colCnt null or undefined or not number');
  const grid: Grid = [];
  for (let i = 0; i < rowCnt; i++) {
    const row = [];
    for (let j = 0; j < colCnt; j++) row.push(val);
    grid.push(row);
  }
  return grid;
}
