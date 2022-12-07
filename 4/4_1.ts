const text = await Deno.readTextFile("input.txt");
const input = text.split("\n");

const answer = input.reduce((acc, curr) => {
  const section1 = curr.split(",")[0];
  const section2 = curr.split(",")[1];

  const lower1 = parseInt(section1.split("-")[0], 10);
  const upper1 = parseInt(section1.split("-")[1], 10);
  const lower2 = parseInt(section2.split("-")[0], 10);
  const upper2 = parseInt(section2.split("-")[1], 10);

  // if lower and upper are greater than or equal to, it fully encapsulates it
  if (
    (lower1 <= lower2 && upper1 >= upper2) ||
    (lower2 <= lower1 && upper2 >= upper1)
  ) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(answer);
