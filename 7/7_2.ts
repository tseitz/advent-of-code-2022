import { getInput } from "../utils.ts";

const input = await getInput();

const totalSpace = 70_000_000;
const neededSpace = 30_000_000;

const hierarchy: string[] = [];
const myMap = new Map();
input.forEach((line) => {
  if (line.match(/\$/)) {
    if (line.match(/cd/)) {
      const cdReg = new RegExp(/cd\s(.+)/);
      const dir = cdReg.exec(line)![1];
      if (dir !== "..") {
        hierarchy.push(dir);
      } else {
        hierarchy.pop();
      }
    }
  }
  if (line.match(/\d+/)) {
    hierarchy.forEach((_, index) => {
      // lazy way of removing // at start
      const currDir = hierarchy
        .slice(0, index + 1)
        .join("/")
        .replace("//", "/");
      myMap.set(
        currDir,
        (myMap.get(currDir) || 0) + parseInt(line.match(/\d+/)![0])
      );
    });
  }
});

const currentSpace = totalSpace - myMap.get("/");
const spaceLeftToDelete = neededSpace - currentSpace;
let smallest = 0;
for (const item of myMap.entries()) {
  if (item[1] >= spaceLeftToDelete) {
    if (item[1] <= smallest || smallest === 0) {
      smallest = item[1];
    }
  }
}
console.log(smallest);
