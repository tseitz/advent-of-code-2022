import { getSmolInput, getInput } from "../utils.ts";

let cycle = 1;
let c = 20;
let register = 1;

const totals: number[] = [];

function getCycleChecks(count: number) {
  return new Array(count).fill(0).map((_, index) => {
    if (index === 0) return c;
    c += 40;
    return c;
  });
}

async function run() {
  // const input = await getSmolInput();
  const input = await getInput();
  const cycleChecks = getCycleChecks(6);
  console.log(cycleChecks);

  for (const line of input) {
    const [command, count] = line.split(" ");

    if (command === "noop") {
      cycle += 1;
      if (cycleChecks.includes(cycle)) {
        totals.push(register * cycle);
      }
      continue;
    }

    if (count) {
      const parseCount = Number(count);

      for (let i = 0; i < 2; i++) {
        cycle += 1;
        if (i === 1) {
          register += parseCount;
        }
        if (cycleChecks.includes(cycle)) {
          totals.push(register * cycle);
        }
      }
    }
  }
  console.log(totals);
  console.log(totals.reduce((prev, curr) => prev + curr));
}

await run();
