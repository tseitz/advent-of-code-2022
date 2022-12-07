interface BaseInput {
  value: number;
}

interface ElfInput extends BaseInput {
  input: "A" | "B" | "C";
  loses: number;
  wins: number;
}

interface MyInput extends BaseInput {
  input: "X" | "Y" | "Z";
}

const rock: ElfInput = {
  input: "A",
  value: 1,
  loses: 2,
  wins: 3,
};

const paper: ElfInput = {
  input: "B",
  value: 2,
  loses: 3,
  wins: 1,
};

const scissors: ElfInput = {
  input: "C",
  value: 3,
  loses: 1,
  wins: 2,
};

const win: MyInput = {
  input: "Z",
  value: 6,
};

const lose: MyInput = {
  input: "X",
  value: 0,
};

const draw: MyInput = {
  input: "Y",
  value: 3,
};

const elfMoves = [rock, paper, scissors];
const myMoves = [win, lose, draw];

const text = await Deno.readTextFile("input.txt");
const input = text.split("\n");

const answer = input.reduce((prev, curr) => {
  const moves = curr.split(" ");
  const elfMove = elfMoves.find((value) => value.input === moves[0])!;
  const myMove = myMoves.find((value) => value.input === moves[1])!;

  if (myMove.value === 3) {
    return prev + elfMove.value + myMove.value;
  }
  if (myMove.value === 6) {
    return prev + elfMove.loses + myMove.value;
  }
  return prev + elfMove.wins + myMove.value;
}, 0);

console.log(answer);
