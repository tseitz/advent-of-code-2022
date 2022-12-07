const text = await Deno.readTextFile("input.txt");

const calories = text.split("\n");

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

// discovered you could reduce into a sort and just grab the highest one for highVal

console.log(highVal);
