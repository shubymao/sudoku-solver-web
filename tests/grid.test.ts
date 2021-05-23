import { expect } from 'chai';
import { fillGridWithDefaultValue, getBoxFromRolCol, makeGrid } from '../src/grid';
import { getBit } from '../src/util';

describe('grid function test', () => {
  it('make grid create right dimension', () => {
    let grid = makeGrid(5, 6);
    expect(grid.length).equal(5);
    expect(grid[0].length).equal(6);
  });

  it('fill undefine or null grid with value throws error', () => {
    expect(() => {
      fillGridWithDefaultValue(undefined);
    }).to.throw(/undefine/);
    expect(() => {
      fillGridWithDefaultValue(null);
    }).to.throw(/null/);
  });

  it('make grid throws error if dimension is undefine', () => {
    expect(() => makeGrid(undefined, 5)).to.throws(/undefine/);
    expect(() => makeGrid(6, undefined)).to.throws(/undefine/);
  });

  it('make grid throws error if dimension is null', () => {
    expect(() => makeGrid(null, 5)).to.throws(/null/);
    expect(() => makeGrid(6, null)).to.throws(/null/);
  });

  it('make grid fill the grid with 0', () => {
    let grid = makeGrid(5, 6);
    let allZero = grid.every((r) => r.every((c) => c === 0));
    expect(allZero).to.be.true;
  });

  it('make grid fill the grid with custom value', () => {
    let grid = makeGrid(5, 6, 9);
    let allZero = grid.every((r) => r.every((c) => c === 9));
    expect(allZero).to.be.true;
  });

  it('get box from row and col returns correct box', () => {
    expect(getBoxFromRolCol(5, 5)).to.equal(4);
    expect(getBoxFromRolCol(3, 3)).to.equal(4);
    expect(getBoxFromRolCol(2, 2)).to.equal(0);
    expect(getBoxFromRolCol(6, 6)).to.equal(8);
  });

  it('get box from undefine col or row throws error', () => {
    expect(() => getBoxFromRolCol(undefined, 1)).to.throw(/undefine/);
    expect(() => getBoxFromRolCol(1, undefined)).to.throw(/undefine/);
  });

  it('get box with out of bound throws error', () => {
    expect(() => getBoxFromRolCol(9, 1)).to.throw(/out of bound/);
    expect(() => getBoxFromRolCol(1, -1)).to.throw(/out of bound/);
  });

  it('get bit throws error when number is null', ()=>{
    expect(() => getBit(null,null)).to.throw();
  })
});
