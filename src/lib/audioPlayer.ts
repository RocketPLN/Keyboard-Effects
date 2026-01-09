import { spawn } from "node:child_process";
import { getFfplay } from "./getFfplay";

export async function playAudioSegment(
	filePath: string,
	startMs: number,
	durationMs: number,
	volume: number = 100,
): Promise<void> {
	const startSeconds = startMs / 1000;
	const durationSeconds = durationMs / 1000;

	const isWindows = process.platform === "win32";

	if (isWindows) {
		const ffplay = await getFfplay();

		return new Promise((resolve, reject) => {
			const ffplayProcess = spawn(ffplay, [
				"-autoexit",
				"-nodisp",
				"-ss",
				startSeconds.toString(),
				"-t",
				durationSeconds.toString(),
				"-volume",
				Math.max(0, Math.min(100, Math.floor(volume))).toString(),
				"-i",
				filePath,
			]);

			ffplayProcess.on("close", (code) => {
				if (code === 0 || code === 255) {
					resolve();
				} else {
					console.error(`ffplay exited with code ${code}`);
					reject(new Error(`Playback failed with code ${code}`));
				}
			});

			ffplayProcess.on("error", (error) => {
				console.error(`Error spawning ffplay process: ${error.message}`);
				reject(error);
			});
		});
	} else {
		// Optionally, implement other OS strategies here or just resolve
		return Promise.resolve();
	}
}
