import { Grid } from './constant';
import { solveSudoku, verifyGrid } from './solver';

export default function solve(grid: Grid): Grid {
  const params = verifyGrid(grid);
  const solution = solveSudoku(grid, params);
  return solution;
}
