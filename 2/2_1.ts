const victory = 6;
const draw = 3;

interface RPS {
  id_score: number;
  elf: "A" | "B" | "C";
  me: "X" | "Y" | "Z";
  beats: number[];
}

// not proud of this
const rock: RPS = {
  id_score: 1,
  elf: "A",
  me: "X",
  beats: [3],
};

const paper: RPS = {
  id_score: 2,
  elf: "B",
  me: "Y",
  beats: [1],
};

const scissors: RPS = {
  id_score: 3,
  elf: "C",
  me: "Z",
  beats: [2],
};

const rps = [rock, paper, scissors];

const text = await Deno.readTextFile("input.txt");
const input = text.split("\n");

const answer = input.reduce((prev, curr) => {
  const moves = curr.split(" ");
  const elfMove = rps.find((value) => value.elf === moves[0])!;
  const myMove = rps.find((value) => value.me === moves[1])!;

  if (myMove.beats.includes(elfMove.id_score)) {
    return prev + myMove.id_score + victory;
  }
  if (myMove.elf === elfMove.elf) {
    return prev + myMove.id_score + draw;
  }
  return prev + myMove.id_score;
}, 0);

console.log(answer);
