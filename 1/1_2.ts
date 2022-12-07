const text = await Deno.readTextFile("input.txt");

const calories = text.split("\n");

const highVals = new Array(3).fill(0);
calories.reduce((prev, curr) => {
  if (curr !== "") {
    return prev + parseInt(curr);
  }

  if (prev > highVals.sort((a, b) => a - b)[0]) highVals[0] = prev;

  return 0;
}, 0);

// discovered you could still sort and slice first 3 then reduce them for the answer

console.log(highVals.reduce((a, b) => a + b));
