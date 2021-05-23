import { fillGridWithDefaultValue } from './grid';
import { getMaxConstraint, makeGridParam, toggleParams } from './grid-param';
import { Grid } from './types/grid';
import { GridParam } from './types/grid-param';

export function verifyGrid(grid: Grid): GridParam {
  if (grid == null) throw new Error('grid is null or undefined');
  if (grid.length != 9 || grid[0].length != 9) throw new Error('invalid grid size');
  grid = fillGridWithDefaultValue(grid, 0);
  const param = makeGridParam(grid);
  return param;
}

export function solveSudoku(grid: Grid, params: GridParam): Grid | null {
  const { cell, options } = getMaxConstraint(grid, params);
  if (cell.row === -1) return grid;
  let solution = null;
  for (const option of options) {
    grid[cell.row][cell.col] = option;
    toggleParams(cell, option, params);
    if ((solution = solveSudoku(grid, params))) break;
    grid[cell.row][cell.col] = 0;
    toggleParams(cell, option, params);
  }
  return solution;
}
