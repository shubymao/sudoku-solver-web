import { getBoxSet, getColSet, getRowSet, SIZE } from './helper';

export default function solve(grid: Array<Array<number>>): Array<Array<number>> {
  if (grid == null) throw new Error('input is null or undefine');
  if (grid.length !== SIZE || grid[0].length !== SIZE) throw new Error('input size not valid');
  const rowSets = new Array<number>(SIZE);
  const colSets = new Array<number>(SIZE);
  const boxSets = new Array<number>(SIZE);
  for (let i = 0; i < SIZE; i++) {
    rowSets[i] = getRowSet(grid, i);
    colSets[i] = getColSet(grid, i);
    boxSets[i] = getBoxSet(grid, i);
  }
  return grid;
}
