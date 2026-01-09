# keyboard-sounds

A cross-platform tool that plays custom keyboard sounds on keypress.

## TODO

- [ ] Add support for macOS
- [ ] Add support for Linux

## Features

- Play sound effects for each keypress using configurable soundpacks
- Adjustable volume
- Simple configuration via CLI
- Supports Windows (with FFplay)

## Getting Started

### Install dependencies

```bash
bun install
```

### Configure the app

First-time setup will prompt you to select a soundpack and volume.  
You can rerun the configuration at any time:

```bash
bun run index.ts settings
```

### Run the app

```bash
bun run index.ts
```

## Soundpacks

Soundpacks are stored in the `soundpacks/` directory.  
Each soundpack has a `config.json` and audio asset(s).  
You can add or create your own soundpacks.

## Requirements

- [Bun](https://bun.sh) (v1.3+)
- FFplay binary for Windows (bundled automatically)

## License

MIT
