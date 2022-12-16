import { getSmolInput, getInput } from "../utils.ts";

const rounds = 20;

const monkies: Monkey[] = [];

class Monkey {
  monkeyNum: number;
  worryItems: number[];
  inspectCount: number;
  inspect: (itemWorryLevel: number) => number;
  throwToNextMonkey: (ogWorryLevel: number, itemWorryLevel: number) => void;

  constructor(monkeyLine: string) {
    const [monkeyNumInput, worryLevelInput, operationInput, ...testInput] =
      monkeyLine.split("\n");
    const [_1, _2, firstTerm, operator, secondTerm] = operationInput
      .replace("Operation: ", "")
      .trim()
      .split(" ")
      .map((val) => {
        return val;
      });
    const [modulus, trueMonkey, falseMonkey] = testInput.map((line, index) => {
      const outputNum = parseInt(line.match(/\d+/)![0], 10);
      if (index === 0) {
        return outputNum;
      } else if (index === 1) {
        return outputNum;
      } else if (index === 2) {
        return outputNum;
      }
    });
    this.monkeyNum = parseInt(monkeyNumInput.split(" ")[1], 10);
    this.worryItems = worryLevelInput
      .replace("Starting items: ", "")
      .split(",")
      .map((val) => parseInt(val.trim(), 10));
    this.inspectCount = 0;
    this.inspect = (itemWorryLevel: number) => {
      this.inspectCount++;
      return eval(
        `${firstTerm === "old" ? itemWorryLevel : firstTerm} ${operator} ${
          secondTerm === "old" ? itemWorryLevel : secondTerm
        }`
      );
    };
    this.throwToNextMonkey = (ogWorryLevel: number, itemWorryLevel: number) => {
      this.worryItems.splice(this.worryItems.indexOf(ogWorryLevel), 1);
      if (itemWorryLevel % modulus! === 0) {
        monkies
          .find((monkey) => monkey.monkeyNum === trueMonkey)
          ?.worryItems.push(itemWorryLevel);
      } else {
        monkies
          .find((monkey) => monkey.monkeyNum === falseMonkey)
          ?.worryItems.push(itemWorryLevel);
      }
    };
  }
}

async function run() {
  // const input = await getSmolInput("\n\n");
  const input = await getInput("\n\n");

  for (const line of input) {
    monkies.push(new Monkey(line));
  }

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkies) {
      const worryItems = monkey.worryItems.slice();
      worryItems.forEach((item) => {
        let newWorryLevel = monkey.inspect(item);
        newWorryLevel = Math.floor(newWorryLevel / 3);
        monkey.throwToNextMonkey(item, newWorryLevel);
      });
    }
  }

  console.log(
    monkies
      .sort((a, b) => b.inspectCount - a.inspectCount)
      .slice(0, 2)
      .reduce((prev, curr) => prev * curr.inspectCount, 1)
  );
}

await run();
