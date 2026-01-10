import { confirm, number, select } from "@inquirer/prompts";
import { uIOhook } from "uiohook-napi";
import { soundpacksPath } from "./constans";
import { playAudioSegment } from "./lib/audioPlayer";
import { getConfig, setConfig } from "./lib/config";
import { getSoundpacks, transformFileName } from "./lib/getSoundpacks";

async function run() {
  await getSoundpacks();
  const config = await getConfig();

  if (!config) {
    await settings();
    console.log("Please rerun the program");
    return;
  }

  const soundpackConfig: SoundpackConfig = await Bun.file(
    `${soundpacksPath}/${config.soundpack}/config.json`
  ).json();

  const audioPath = `${soundpacksPath}/${config.soundpack}/${soundpackConfig.sound}`;

  uIOhook.on("keydown", async (e) => {
    const defines = soundpackConfig.defines[e.keycode];

    if (!defines) {
      return;
    }

    const [start, duration] = defines;

    try {
      await playAudioSegment(audioPath, start, duration, config.volume);
    } catch (error) {
      console.error(error);
    }
  });

  uIOhook.start();
}

async function selectSoundpack(volume?: Config["volume"]) {
  const soundpacks = await getSoundpacks();

  if (!soundpacks.names.length) {
    console.log("No soundpacks found");
    return;
  }

  const answer = await select({
    message: "Select a soundpack",
    choices: soundpacks.names,
  });

  const selectedIndex = soundpacks.names.indexOf(answer);
  const selectedSoundpack = soundpacks.files[selectedIndex];

  if (!selectedSoundpack) {
    throw new Error("Invalid soundpack");
  }

  await setConfig({
    soundpack: selectedSoundpack,
    volume: volume ?? 50,
  });
}

async function selectVolume(soundpack?: Config["soundpack"]) {
  const answer = await number({
    message: "Select a volume",
    min: 1,
    max: 100,
    default: 50,
  });

  if (!answer) {
    throw new Error("You must select a volume");
  }

  await setConfig({
    soundpack: soundpack ?? "cherrymx-blue-abs",
    volume: answer,
  });
}

async function settings() {
  const config = await getConfig();

  if (!config) {
    await selectSoundpack();
    await selectVolume();
    return;
  }

  const changeSoundpack = await confirm({
    message: `Current soundpack: ${transformFileName(
      config.soundpack
    )}\nDo you want to change the soundpack?`,
    default: false,
  });

  if (changeSoundpack) {
    await selectSoundpack(config.volume);
  }

  const changeVolume = await confirm({
    message: `Current volume: ${config.volume}\n Do you want to change the volume?`,
    default: false,
  });

  if (changeVolume) {
    await selectVolume(config.soundpack);
  }
}

switch (process.argv.at(-1)) {
  case "settings":
    settings();
    break;
  default:
    run();
}
