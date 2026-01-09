import { build } from "bun";

await build({
    entrypoints: ["./src/index.ts", "./src/bin/ffplay.exe"],
    compile: {
        outfile: "./keyboardsounds",
        target: "bun-windows-x64"
    }
})