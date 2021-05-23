import { solveSudoku, verifyGrid } from './solver';
import { Grid } from './types/grid';

/**
 * The main entry point of the solver library
 * @param grid
 * @returns solution or null if no solution exists
 */
export function solve(grid: Grid): Grid | null {
  const params = verifyGrid(grid);
  const solution = solveSudoku(grid, params);
  return solution;
}
