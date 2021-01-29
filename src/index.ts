import { getBoxSet, getColSet, getRowSet, SIZE } from "./helper";


export default function solve(grid: Array<Array<number>>){
    if (grid.length !== SIZE || grid[0].length !== SIZE) throw new Error('Input Size Not Valid');
    let rowSets = new Array<number>(SIZE);
    let colSets = new Array<number>(SIZE);
    let boxSets = new Array<number>(SIZE);
    for(let i = 0; i < SIZE ; i++){
        rowSets[i] = getRowSet(grid,i);
        colSets[i] = getColSet(grid,i);
        boxSets[i] = getBoxSet(grid,i);
    }
    return grid;
}