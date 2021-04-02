import { expect } from 'chai';
import { verifyGrid } from '../src/solver';
import { Grid } from '../src/types/grid';

describe('verify sudoku', () => {
  it('accept valid size empty grid', () => {
    const grid = makeGrid(9, 9);
    expect(function () {
      verifyGrid(grid);
    }).not.throws();
  });

  it('reject invalid row size', () => {
    const grid = makeGrid(8, 9);
    expect(() => {
      verifyGrid(grid);
    }).throws('invalid grid size');
  });

  it('reject invalid col size', () => {
    expect(() => {
      const grid = makeGrid(9, 8);
      verifyGrid(grid);
    }).throws('invalid grid size');
  });

  it('reject null and undefine grid', () => {
    const undefineGrid: Grid = undefined;
    expect(() => verifyGrid(undefineGrid)).throws(/undefine/);
    const nullGrid: Grid = null;
    expect(() => verifyGrid(nullGrid)).throws(/null/);
  });

  it('reject row contains duplicate value', () => {
    const grid = makeGrid(9, 9);
    grid[5][0] = 1;
    grid[5][8] = 1;
    expect(() => verifyGrid(grid)).throws(/invalid .* row .*5.*1/);
  });

  it('reject column contains duplicate value', () => {
    const grid = makeGrid(9, 9);
    grid[1][8] = 9;
    grid[8][8] = 9;
    expect(() => verifyGrid(grid)).throws(/invalid.*col.*8.*9/);
  });

  it('reject box contains duplicate value', () => {
    const grid = makeGrid(9, 9);
    grid[8][0] = 5;
    grid[6][2] = 5;
    expect(() => verifyGrid(grid)).throws(/invalid.*box.*6.*5/);
  });
});

function makeGrid(rowCount: number, colCount: number) {
  const grid = new Array<Array<number>>(rowCount);
  for (let i = 0; i < rowCount; i++) {
    grid[i] = new Array<number>(colCount);
  }
  return grid;
}
