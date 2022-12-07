const text = await Deno.readTextFile("input.txt");
const input = text.split("\n");

const mappedInput = [];
for (let i = 0; i < input.length; i += 3) {
  mappedInput.push([input[i], input[i + 1], input[i + 2]]);
}

const answer = mappedInput.reduce((prev, curr) => {
  const searchStr = curr[0];

  // loop over first string
  for (let i = 0; i < searchStr.length; i++) {
    const value = searchStr[i];
    // if value in both string 2 and 3
    if (curr[1].includes(value) && curr[2].includes(value)) {
      if (value.toUpperCase() === value) {
        // uppercase 38 starts at 27
        return prev + value.charCodeAt(0) - 38;
      } else {
        // lowercase 96 starts us at 1
        return prev + value.charCodeAt(0) - 96;
      }
    }
  }
  return prev;
}, 0);

console.log(answer);
