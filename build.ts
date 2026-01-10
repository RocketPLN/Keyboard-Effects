import { build } from "bun";

const OUTPUT_PATH = "./dist/keyboardsounds";

function getCompileOprtions(): Partial<Bun.BuildConfig> {
  switch (process.argv.at(-1)) {
    case "windows":
      return {
        entrypoints: ["./src/bin/ffplay.exe"],
        compile: {
          outfile: OUTPUT_PATH,
          target: "bun-windows-x64",
          windows: {
            hideConsole: true,
          },
        },
      };
    case "linux":
      return {
        entrypoints: ["./src/bin/ffplay"],
        compile: {
          outfile: OUTPUT_PATH,
          target: "bun-linux-x64",
        },
      };
    default:
      return {};
  }
}

const options = getCompileOprtions();

await build({
  entrypoints: ["./src/index.ts", ...(options.entrypoints ?? [])],
  ...options,
});
