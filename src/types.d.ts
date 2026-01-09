interface Config {
  soundpack: string;
  volume: number;
}

interface SoundpackConfig {
  sound: string;
  defines: {
    [key: string]: [number, number];
  };
}

