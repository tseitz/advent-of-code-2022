import { getInput } from "../utils.ts";
import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";

const input = await getInput();

const f = await Deno.open("input.txt");

// read in crate rows (could use reduce)
const rows: string[][] = [];
input.forEach((value) => {
  if (value.match(/\d/) || value.startsWith("move") || value === "") {
    return;
  }

  const groups = [];
  for (let i = 0; i < value.length; i += 4) {
    groups.push(
      value
        .slice(i, i + 4)
        .replace(/\[|\]/g, "")
        .trim()
    );
  }

  rows.push(groups);
});
const colCount = rows[0].length;

// convert it to a map of crates
const myMap = new Map();
rows.forEach((row) => {
  row.forEach((r, index) => {
    const column = index + 1;
    if (r !== "") {
      if (myMap.get(column)) {
        myMap.set(column, [r, ...myMap.get(column)]);
      } else {
        myMap.set(column, [r]);
      }
    }
  });
});

// read in moves and remap our map
for await (const l of readLines(f)) {
  if (l.startsWith("move")) {
    const regex = new RegExp(/move (\d+) from (\d+) to (\d+)/, "gi");
    const lineIn = regex.exec(l)!;
    // capturing groups gives us count, from, to
    const count = parseInt(lineIn[1]);
    const from = parseInt(lineIn[2]);
    const to = parseInt(lineIn[3]);

    const row: string[] = myMap.get(from);

    // just have to remove reverse here :)
    const pick = row.slice(count * -1);

    myMap.set(from, row.slice(0, count * -1));
    myMap.set(to, [...myMap.get(to), ...pick]);
  }
}

let answer = "";
for (let i = 1; i < colCount + 1; i++) {
  answer += myMap.get(i).at(-1);
}

console.log(answer);
