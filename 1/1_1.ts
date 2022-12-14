import { getInput } from "../utils.ts";

const calories = await getInput();

let highVal = 0;
calories.reduce((prev, curr) => {
  if (curr !== "") {
    return prev + parseInt(curr);
  }
  if (prev > highVal) {
    highVal = prev;
  }
  return 0;
}, 0);

// discovered you could reduce into a sort and just grab the highest one for highVal (i.e. calories.sort().slice(0))

console.log(highVal);
