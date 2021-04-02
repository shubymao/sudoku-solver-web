import { cloneDeep, times } from 'lodash';
import { BOX_SIZE, DEFAULT_CONSTRINT, DEFAULT_GRID_PARAM, GRID_SIZE } from './constant';
import { Cell } from './types/cell';
import { Constraint } from './types/constraint';
import { Grid } from './types/grid';
import { GridParam } from './types/grid-param';
import { getBit } from './util';

export function makeGridParam(grid: Grid) {
  const param: GridParam = cloneDeep(DEFAULT_GRID_PARAM);
  param.boxSets = times(GRID_SIZE, (i) => getBoxSet(grid, i));
  param.rowSets = times(GRID_SIZE, (i) => getRowSet(grid, i));
  param.colSets = times(GRID_SIZE, (i) => getColSet(grid, i));
  return param;
}

export function getRowSet(grid: Grid, row: number): number {
  let set = 0;
  for (let i = 0; i < GRID_SIZE; i++) {
    if (grid[row][i] === 0) continue;
    const mask = 1 << (grid[row][i] - 1);
    if ((set & mask) !== 0) throw new Error(`invalid grid row ${row} contain multiple ${grid[row][i]}`);
    set = set | mask;
  }
  return set;
}

export function getColSet(grid: Grid, col: number): number {
  let set = 0;
  for (let i = 0; i < GRID_SIZE; i++) {
    if (grid[i][col] === 0) continue;
    const mask = 1 << (grid[i][col] - 1);
    if ((set & mask) !== 0) throw new Error(`invalid grid col ${col} contain multiple ${grid[i][col]}`);
    set = set | mask;
  }
  return set;
}

export function getBoxSet(grid: Grid, box: number): number {
  let set = 0;
  const row = Math.floor(box / 3) * 3;
  const col = (box % 3) * 3;
  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (grid[row + i][col + j] === 0) continue;
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

export function getMaxConstraint(grid: Grid, { boxSets, rowSets, colSets }: GridParam): Constraint {
  let constraint: Constraint = { ...DEFAULT_CONSTRINT };
  let maxRestriction = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] !== 0) continue;
      let box = 3 * Math.floor(row / 3) + Math.floor(col / 3);
      let restriction = boxSets[box] | rowSets[row] | colSets[col];
      if (restriction > maxRestriction) {
        maxRestriction = restriction;
        constraint.cell = { row, col, box };
      }
    }
  }
  constraint.options = getOptions(maxRestriction);
  return constraint;
}

export function toggleParams(cell: Cell, val: number, params: GridParam) {
  const { rowSets, colSets, boxSets } = params;
  rowSets[cell.row] ^= 1 << (val - 1);
  colSets[cell.col] ^= 1 << (val - 1);
  boxSets[cell.box] ^= 1 << (val - 1);
}

export function getOptions(restriction: number): number[] {
  let options = [];
  for (let num = 1; num <= GRID_SIZE; num++) {
    if (getBit(restriction, num - 1) === 0) options.push(num);
  }
  return options;
}
