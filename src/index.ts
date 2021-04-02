import { solveSudoku, verifyGrid } from './solver';
import { Grid } from './types/grid';

export default function solve(grid: Grid): Grid {
  const params = verifyGrid(grid);
  const solution = solveSudoku(grid, params);
  return solution;
}
