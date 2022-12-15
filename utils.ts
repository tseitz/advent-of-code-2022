export async function getInput() {
  const text = await Deno.readTextFile("input.txt");
  return text.split("\n");
}

export async function getSmolInput() {
  const text = await Deno.readTextFile("smol.txt");
  return text.split("\n");
}
