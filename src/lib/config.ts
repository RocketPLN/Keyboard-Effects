import { configPath } from "../constans";

export async function getConfig(): Promise<Config | null> {
	const file = Bun.file(configPath);

	if (!(await file.exists())) {
		return null;
	}
	
	const text = await file.text();

	return JSON.parse(text);
}

export async function setConfig(configArg: Config) {
	const file = Bun.file(configPath);

	await file.write(JSON.stringify(configArg, null, 2));
}
