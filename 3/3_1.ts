const text = await Deno.readTextFile("input.txt");
const input = text.split("\n");

const answer = input.reduce((prev, curr) => {
  // split the rucksack
  const ruck1 = curr.slice(0, curr.length / 2);
  const ruck2 = curr.slice(curr.length / 2);

  // loop over the string
  for (let i = 0; i < ruck1.length; i++) {
    // find the duplicate
    if (ruck2.search(ruck1[i]) !== -1) {
      const value = ruck1[i];

      if (value.toUpperCase() === value) {
        // uppercase 38 starts at 27
        return prev + (value.charCodeAt(0) - 38);
      } else {
        // lowercase 96 starts us at 1
        return prev + (value.charCodeAt(0) - 96);
      }
    }
  }
  return prev;
}, 0);

console.log(answer);
