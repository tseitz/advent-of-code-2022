export async function getInput() {
  const text = await Deno.readTextFile("input.txt");
  return text.split("\n");
}
