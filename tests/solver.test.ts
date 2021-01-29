import { expect } from 'chai';
import solve from '../src/solver'

describe('solve sudoku', function () {
    it('accept valid size', function () {
        let grid = new Array<Array<Number>>(9);
        for (let i = 0; i < 9; i++) {
            grid[i] = new Array<Number>(9);
        }
        expect(function(){solve(grid);}).not.throws();
    });
    it('reject valid size', function () {
        let grid = new Array<Array<Number>>(8);
        for (let i = 0; i < 8; i++) {
            grid[i] = new Array<Number>(9);
        }
        expect(function(){solve(grid);}).throws();
    });
});