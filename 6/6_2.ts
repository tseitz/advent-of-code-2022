import { getInput } from "../utils.ts";

const input = await getInput();
const inputStr = input[0];

const msgLen = 14;
for (let i = 0; i < inputStr.length; i++) {
  const subStr = inputStr.slice(i, i + msgLen);
  const uniqueSet = new Set(subStr.split(""));
  if (uniqueSet.size === msgLen) {
    // it's the last character of the set
    console.log(i + msgLen);
    break;
  }
}
