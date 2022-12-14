import { getInput } from "../utils.ts";

const input = await getInput();
const inputStr = input[0];

for (let i = 0; i < inputStr.length; i++) {
  const subStr = inputStr.slice(i, i + 4);
  const uniqueSet = new Set(subStr.split(""));
  if (uniqueSet.size === 4) {
    // it's the last character of the set
    console.log(i + 4);
    break;
  }
}
