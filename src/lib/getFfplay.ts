import os from "node:os";
import path from "node:path";
import { embeddedFiles } from "bun";

export async function getFfplay() {
  const devPath = path.join(import.meta.dir, "../bin/ffplay.exe");
  if (await Bun.file(devPath).exists()) {
    return devPath;
  }

  const tmp = path.join(os.tmpdir(), "ffplay.exe");

  // @ts-ignore
  const ffplayFile = embeddedFiles.find((f) => f.name.includes("ffplay"));

  if (!(await Bun.file(tmp).exists())) {
    // @ts-ignore
    await Bun.write(tmp, await ffplayFile.arrayBuffer());
  }

  return tmp;
}
