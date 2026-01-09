import { readdir } from "node:fs/promises";
import { soundpacksPath } from "../constans";

export function transformFileName(str: string) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export async function getSoundpacks() {
  const files = await readdir(`${soundpacksPath}`);

  const names = files.map(transformFileName);

  return {
    names,
    files,
  };
}
