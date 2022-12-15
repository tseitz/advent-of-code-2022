import { getSmolInput, getInput } from "../utils.ts";

// console.log(input);
const DIRECTIONS = {
  U: { x: 0, y: 1 },
  R: { x: 1, y: 0 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
};

interface Coordinate {
  x: number;
  y: number;
}

type Direction = "U" | "R" | "D" | "L";

class Knot {
  position: Coordinate;

  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
  }

  move(direction: Direction) {
    const { x, y } = DIRECTIONS[direction];

    this.position.x += x;
    this.position.y += y;
  }

  distanceFrom(knot: Knot) {
    return {
      x: knot.position.x - this.position.x,
      y: knot.position.y - this.position.y,
    };
  }

  shouldMove(prevKnot: Knot) {
    const distance = this.distanceFrom(prevKnot);

    return Math.abs(distance.x) > 1 || Math.abs(distance.y) > 1;
  }
}

const tailSet = new Set();
const numOfKnots = 10;
async function getPositions() {
  const input = await getInput();
  // const input = await getSmolInput();
  const rope = Array(numOfKnots)
    .fill(0)
    .map(() => new Knot());

  for (const line of input) {
    const [direction, distanceStr] = line.split(" ") as [Direction, string];
    const travelDistance = Number(distanceStr);

    for (let i = 0; i < travelDistance; i++) {
      const head = rope[0];
      const tail = rope.at(-1);

      head.move(direction);

      for (let j = 1; j < numOfKnots; j++) {
        const currKnot = rope[j];
        const prevKnot = rope[j - 1];
        const distance = currKnot.distanceFrom(prevKnot);

        if (currKnot.shouldMove(prevKnot)) {
          currKnot.position.x += Math.sign(distance.x);
          currKnot.position.y += Math.sign(distance.y);
        }
      }

      tailSet.add(`${tail!.position.x} ${tail!.position.y}`);
    }
  }
  console.log(tailSet.size);
}

getPositions();
