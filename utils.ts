export async function getInput(splitAt = "\n") {
  const text = await Deno.readTextFile("input.txt");
  return text.split(splitAt);
}

export async function getSmolInput(splitAt = "\n") {
  const text = await Deno.readTextFile("smol.txt");
  return text.split(splitAt);
}
