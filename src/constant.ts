import { Cell } from './types/cell';
import { Constraint } from './types/constraint';
import { GridParam } from './types/grid-param';

export const GRID_SIZE = 9;
export const BOX_SIZE = 3;

export const DEFAULT_GRID_PARAM: GridParam = {
  rowSets: [],
  colSets: [],
  boxSets: [],
};

export const DEFAULT_CELL: Cell = { row: -1, col: -1, box: -1 };

export const DEFAULT_CONSTRINT: Constraint = {
  cell: { ...DEFAULT_CELL },
  options: [],
};
