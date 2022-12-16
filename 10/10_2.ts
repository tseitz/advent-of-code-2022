import { getSmolInput, getInput } from "../utils.ts";

let cycle = 1;
let register = 1;
const PIXELS_PER_ROW = 40;
const PIXEL_DARK = ".";
const PIXEL_LIT = "#";

let result = "";

// this took a while
async function run() {
  // const input = await getSmolInput();
  const input = await getInput();

  for (const line of input) {
    const [command, count] = line.split(" ");
    const cycles = command === "noop" ? 1 : 2;

    for (let i = 0; i < cycles; i++, cycle++) {
      const column = (cycle - 1) % PIXELS_PER_ROW;
      const isPixelLit = register - 1 <= column && column <= register + 1;

      result += isPixelLit ? PIXEL_LIT : PIXEL_DARK;

      if (column === PIXELS_PER_ROW - 1) {
        result += "\n";
      }
    }

    register += Number(count) || 0;
  }

  console.log(result);
}

await run();
