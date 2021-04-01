export const SIZE = 9;
export const BOX_SIZE = 3;

export type Grid = Array<Array<number>>;

export interface GridParam {
  rowSets: number[];
  colSets: number[];
  boxSets: number[];
}
