import { getSmolInput, getInput } from "../utils.ts";

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
  history: Set<string>;

  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.history = new Set();
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

async function getPositions() {
  const input = await getInput();
  // const input = await getSmolInput();
  const rope = Array(2)
    .fill(0)
    .map(() => new Knot());
  const head = rope[0];
  const tail = rope[1];

  for (const line of input) {
    const [direction, distanceStr] = line.split(" ") as [Direction, string];
    const travelDistance = Number(distanceStr);

    for (let i = 0; i < travelDistance; i++) {
      head.move(direction);

      const distance = tail.distanceFrom(head);

      if (tail.shouldMove(head)) {
        tail.position.x += Math.sign(distance.x);
        tail.position.y += Math.sign(distance.y);
      }

      tail.history.add(`${tail.position.x} ${tail.position.y}`);
    }
  }
  console.log(tail.history.size);
}

getPositions();

/* OLD CODE NOT QUITE RIGHT */
// input.forEach((move) => {
//   const [direction, distanceStr] = move.split(" ");
//   const travelDistance = Number(distanceStr);

//   console.log(direction);
//   for (let i = 0; i < travelDistance; i++) {
//     const ogHeadPosition = head.position.slice();
//     head.history.push(head.position);

//     switch (direction) {
//       case "R": {
//         head.position = [head.position[0] + 1, head.position[1]];

//         const spread = distanceApart();
//         tail.history.push(tail.position.slice());
//         if (spread > 1) {
//           if (spread === 3) {
//             // tail.position[1] = head.position[1];
//             // tail.position[0]++;
//             tail.position = ogHeadPosition;
//           } else if (xIsTooFar()) {
//             tail.position[0]++;
//           }
//         }
//         break;
//       }
//       case "L": {
//         head.position = [head.position[0] - 1, head.position[1]];

//         const spread = distanceApart();
//         tail.history.push(tail.position.slice());
//         if (spread > 1) {
//           if (spread === 3) {
//             // tail.position[1] = head.position[1];
//             // tail.position[0]--;
//             tail.position = ogHeadPosition;
//           } else if (xIsTooFar()) {
//             tail.position[0]--;
//           }
//         }
//         break;
//       }
//       case "U": {
//         head.position = [head.position[0], head.position[1] + 1];

//         const spread = distanceApart();
//         tail.history.push(tail.position.slice());
//         if (spread > 1) {
//           if (spread === 3) {
//             // tail.position[0] = head.position[0];
//             // tail.position[1]++;
//             tail.position = ogHeadPosition;
//           } else if (yIsTooFar()) {
//             tail.position[1]++;
//           }
//         }
//         break;
//       }
//       case "D": {
//         head.position = [head.position[0], head.position[1] - 1];

//         const spread = distanceApart();
//         tail.history.push(tail.position.slice());
//         if (spread > 1) {
//           if (spread === 3) {
//             // tail.position[0] = head.position[0];
//             // tail.position[1]--;
//             tail.position = ogHeadPosition;
//           } else if (yIsTooFar()) {
//             tail.position[1]--;
//           }
//         }
//         break;
//       }
//     }
//     console.log("h", head.position, "t", tail.position);
//   }
// });

// // console.log(tail.history);
// const uniqueSet = tail.history.reduce((prev, curr) => {
//   if (prev.some((val) => val[0] === curr[0] && val[1] === curr[1])) {
//     return prev;
//   }

//   prev.push(curr);
//   return prev;
// }, [] as number[][]);
// console.log(uniqueSet);
// console.log(uniqueSet.length);

// function xIsTooFar() {
//   return Math.abs(head.position[0] - tail.position[0]) > 1;
// }

// function yIsTooFar() {
//   return Math.abs(head.position[1] - tail.position[1]) > 1;
// }

// function distanceApart() {
//   return (
//     Math.abs(head.position[0] - tail.position[0]) +
//     Math.abs(head.position[1] - tail.position[1])
//   );
// }
