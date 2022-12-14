import { getInput } from "../utils.ts";

const input = await getInput();

const splitInput = input.map((line) => line.split("").map(Number));

let visibleTrees = 0;
splitInput.forEach((lineArr, xIndex) => {
  if (xIndex === 0 || xIndex === lineArr.length - 1) {
    visibleTrees += lineArr.length;
    return;
  }

  lineArr.forEach((num, yIndex) => {
    if (yIndex === 0 || yIndex === lineArr.length - 1) {
      visibleTrees++;
      return;
    }

    const neighbors = getNeighbors(splitInput, xIndex, yIndex);
    if (isVisible(num, neighbors)) {
      visibleTrees++;
    }
  });
});

function getNeighbors(grid: number[][], x: number, y: number) {
  const left = grid[x].slice(0, y).map((value) => value);
  const right = grid[x].slice(y + 1).map((value) => value);
  const top = grid.slice(0, x).map((row) => row[y]);
  const bottom = grid.slice(x + 1).map((row) => row[y]);
  return [top, right, bottom, left];
}

function isVisible(num: number, neighbors: number[][]) {
  return neighbors.some((value) =>
    value.every((compareVal) => compareVal < num)
  );
}

console.log(visibleTrees);
