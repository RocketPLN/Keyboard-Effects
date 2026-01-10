import { env } from "bun";

const isWindows = process.platform === "win32";

function getPaths() {
  if (isWindows) {
    return {
      soundpacksPath: `${env.APPDATA}/keyboard-effects/soundpacks`,
      configPath: `${env.APPDATA}/keyboard-effects/config.json`,
    };
  }

  return {
    soundpacksPath: `${env.HOME}/.config/keyboard-effects/soundpacks`,
    configPath: `${env.HOME}/.config/keyboard-effects/config.json`,
  };
}

export const { soundpacksPath, configPath } = getPaths();
