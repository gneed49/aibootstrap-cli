# AiBootstrap CLI

CLI to bootstrap AI agent projects. It ships with an embedded `agent` template folder that you can copy into any project.

## Installation

```bash
npm install -g aibootstrap-cli
# or use without installing
npx aibootstrap-cli init
```

## Commands

- `aibootstrap init [directory] [options]`
  - Copy the embedded `agent` template into the target directory (default: current directory).
  - Options:
    - `-f, --force` – overwrite an existing `agent` folder in the target directory.

- `aibootstrap config:agent [--mode <mode>] [--type <type>]`
  - Configure the default agent mode and type for the current project.
  - Modes: `chat`, `tool-calling`, `workflow`.

- `aibootstrap config:workflow [--kind <kind>] [--entry-file <path>]`
  - Configure the workflow type and main entry file.
  - Kinds: `orchestrator`, `pipeline`, `cron`, `event`.

- `aibootstrap guide`
  - Explain how to use the bootstrapped `agent` folder.

## Development

```bash
npm install
npm run build
node dist/cli.js help
```

## Publishing to npm

1. Update `package.json` fields (`name`, `version`, `repository`, etc.).
2. Log in to npm:
   ```bash
   npm login
   ```
3. Build and publish:
   ```bash
   npm run build
   npm publish --access public
   ```

## License

MIT
