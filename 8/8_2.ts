import { getInput } from "../utils.ts";

const input = await getInput();

const splitInput = input.map((line) => line.split("").map(Number));

let topScore = 0;
splitInput.forEach((lineArr, xIndex) => {
  lineArr.forEach((num, yIndex) => {
    const neighbors = getNeighbors(splitInput, xIndex, yIndex);
    const score = getScenicScore(num, neighbors);
    topScore = score > topScore ? score : topScore;
  });
});

function getNeighbors(grid: number[][], x: number, y: number) {
  const top = grid
    .slice(0, x)
    .map((row) => row[y])
    .reverse();
  const right = grid[x].slice(y + 1);
  const bottom = grid.slice(x + 1).map((row) => row[y]);
  const left = grid[x].slice(0, y).reverse();
  return [top, right, bottom, left];
}

function getScenicScore(num: number, neighbors: number[][]) {
  function getCount(trees: number[]) {
    let count = 0;

    for (const tree of trees) {
      count++;
      if (tree >= num) return count;
    }
    return count;
  }

  return neighbors.reduce((prev, curr) => {
    return prev * getCount(curr);
  }, 1);
}

console.log(topScore);
