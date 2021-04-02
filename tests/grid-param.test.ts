import { expect } from 'chai';
import { BOX_SIZE } from '../src/constant';
import { makeGrid } from '../src/grid';
import {
  getBoxSet,
  getColSet,
  getMaxConstraint,
  getOptions,
  getRowSet,
  makeGridParam,
  toggleParams,
} from '../src/grid-param';

describe('grid parameter test', () => {
  it('get row set returns all the set bit within the row', () => {
    const grid = makeGrid(9, 9);
    grid[8] = grid[8].map((v, i) => i + 1);
    let set = getRowSet(grid, 8);
    expect(set).to.equal((1 << 9) - 1, 'not all bit were set');
  });

  it('get col set returns all the set bit within the row', () => {
    const grid = makeGrid(9, 9);
    grid.forEach((v, i) => (v[6] = i + 1));
    let set = getColSet(grid, 6);
    expect(set).to.equal((1 << 9) - 1, 'not all bit were set');
  });

  it('get box set returns all the set bit within the box', () => {
    const grid = makeGrid(9, 9);
    for (let i = 0; i < BOX_SIZE; i++) {
      for (let j = 0; j < BOX_SIZE; j++) {
        grid[3 + i][3 + j] = i * 3 + j + 1;
      }
    }
    let set = getBoxSet(grid, 4);
    expect(set).to.equal((1 << 9) - 1, 'not all bit were set');
  });

  it('get option returns all availible option from a set of restriction', () => {
    let restriction = 341; //101,010,101
    let options = getOptions(restriction);
    expect(options.length == 4);
    expect(options).to.include.members([2, 4, 6, 8]);
  });

  it('toggle param correctly set the bit in all grid param', () => {
    let param = makeGridParam(makeGrid(9, 9));
    let cell = { row: 8, col: 6, box: 8 };
    toggleParams(cell, 7, param);
    //the 7 th bit should be set for each specific set
    expect(param.boxSets[8]).to.equal(1 << 6);
    expect(param.colSets[6]).to.equal(1 << 6);
    expect(param.rowSets[8]).to.equal(1 << 6);
  });

  it('toggle param twice reset the bit in all grid param', () => {
    let param = makeGridParam(makeGrid(9, 9));
    let cell = { row: 8, col: 6, box: 8 };
    toggleParams(cell, 7, param);
    toggleParams(cell, 9, param);
    toggleParams(cell, 7, param);
    toggleParams(cell, 9, param);
    //the 7 th bit should be set for each specific set
    expect(param.boxSets[8]).to.equal(0);
    expect(param.colSets[6]).to.equal(0);
    expect(param.rowSets[8]).to.equal(0);
  });

  it('get max Constraint returns the cell with the most toggle', () => {
    let param = makeGridParam(makeGrid(9, 9));
    const maxCell = { row: 8, col: 6, box: 8 };
    param.boxSets[8] ^= 7; // b'000000111
    param.colSets[6] ^= 7 << 3; // b'000111000
    param.rowSets[8] ^= 1 << 6; // b'001000000
    const { cell, options } = getMaxConstraint(makeGrid(9, 9), param);
    expect(cell).to.eql(maxCell);
    expect(options.length).to.equal(2)
    expect(options).to.include.members([8,9]);
  });
});
