import { getSmolInput, getInput } from "../utils.ts";

const rounds = 10000;
let wizardMod = 1;

const monkies: Monkey[] = [];

class Monkey {
  monkeyNum: number;
  currRoundWorryItems: number[];
  inspectCount: number;
  modulus: number;
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
    this.modulus = modulus!;

    this.monkeyNum = parseInt(monkeyNumInput.split(" ")[1], 10);

    this.currRoundWorryItems = worryLevelInput
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
      this.currRoundWorryItems.splice(
        this.currRoundWorryItems.indexOf(ogWorryLevel),
        1
      );
      if (itemWorryLevel % modulus! === 0) {
        monkies
          .find((monkey) => monkey.monkeyNum === trueMonkey)
          ?.currRoundWorryItems.push(itemWorryLevel % wizardMod);
      } else {
        monkies
          .find((monkey) => monkey.monkeyNum === falseMonkey)
          ?.currRoundWorryItems.push(itemWorryLevel % wizardMod);
      }
    };
  }
}

// really what we want to know is the inspections. We don't care about the worry level
async function run() {
  // const input = await getSmolInput("\n\n");
  const input = await getInput("\n\n");

  for (const line of input) {
    monkies.push(new Monkey(line));
  }

  wizardMod = monkies.reduce((prev, curr) => prev * curr.modulus, wizardMod);

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkies) {
      const worryItems = monkey.currRoundWorryItems.slice();
      worryItems.forEach((item) => {
        const newWorryLevel = monkey.inspect(item);
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
