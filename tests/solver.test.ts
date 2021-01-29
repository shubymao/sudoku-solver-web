import { expect } from 'chai';
import solve from '../src/index'

describe('solve sudoku', function () {
    it('accept valid size', function () {
        let grid = new Array<Array<number>>(9);
        for (let i = 0; i < 9; i++) {
            grid[i] = new Array<number>(9);
        }
        expect(function(){solve(grid);}).not.throws();
    });
    it('reject invalid row size', function () {
        let grid = new Array<Array<number>>(8);
        for (let i = 0; i < 8; i++) {
            grid[i] = new Array<number>(9);
        }
        expect(function(){solve(grid);}).throws();
    });
    it('reject invalid col size', function () {
        let grid = new Array<Array<number>>(9);
        for (let i = 0; i < 9; i++) {
            grid[i] = new Array<number>(8);
        }
        expect(function(){solve(grid);}).throws();
    });
});