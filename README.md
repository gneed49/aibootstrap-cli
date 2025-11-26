# AiBootstrap CLI

Spin up a spec-driven AI agent workspace in any project, with built-in workflows for changes, tracks, and personas.

## What it does
- Copies a ready-to-use `agent/` folder (context, rules, specs, prompts, workflows).
- Helps you scaffold change proposals (proposal/tasks/design/spec delta) before coding.
- Reminds you to pick the right track (Quick/Standard/Enterprise) and the right persona (product/code/testing/architect/ux/review).

## Installation

```bash
npm install -g aibootstrap-cli
# or use without installing
npx aibootstrap-cli init
```

## Interactive Assistant (New!)
The easiest way to use AiBootstrap is via the interactive wizard:

```bash
aibootstrap start
```

This launches a guided experience where you can choose between:
- **🚀 Auto Mode (Orchestrator)**: Just describe your task, and the AI Orchestrator will plan and delegate the work to specialized agents (Architect, Code, Test).
- **🛠️ Manual Mode (Guided)**: Step-by-step configuration to set up your task, choose the risk level, and optionally create a formal Change Proposal.

## Core commands

- `aibootstrap start`
  Launch the interactive assistant (Wizard).

- `aibootstrap init [directory] [-f|--force]`  
  Copy the embedded `agent` template into the target directory (default: current directory).

- `aibootstrap guide`  
  Quick tour of the `agent/` folder and the recommended flow.

## Workflow helpers

- `aibootstrap workflow:tracks`  
  Show track guidance (Quick/Standard/Enterprise) to right-size the effort.

- `aibootstrap change:init <id> [-c|--capability <cap>] [-f|--force]`  
  Scaffold a change under `agent/changes/<id>` with proposal/tasks/design/spec delta.

- `aibootstrap change:archive <id> [-f|--force]`  
  Move `agent/changes/<id>` to `agent/changes/archive/YYYY-MM-DD-<id>` after delivery.

- `aibootstrap agents:list`  
  List available personas (product, code, testing, architect, ux, review).

- `aibootstrap session:init` (alias `aibootstrap start`)  
  Interactive session setup (role, workflow, track) that scaffolds missing files, écrit les configs (`agent/config/*.json`) et imprime un prompt Claude prêt à l'emploi.

- `aibootstrap generate`  
  Interactive picker to create context/spec/task/sprint/change and print the right prompt (aliases: `generate:context|spec|task|sprint|change` for power users).

- `aibootstrap bootstrap:mvp`  
  Wizard to collect project answers and generate a prompt for the agent to fill context/rules/specs for an MVP.

- `aibootstrap claude <workflow>`  
  Build a prompt for Claude with the right files attached (project/task/bugfix_refactor/sprint/docs/change).

- `aibootstrap task:run <id>`, `aibootstrap sprint:run <id>`  
  Build execution prompts for a specific task or sprint with the right context and tracks.

- `aibootstrap memory:log`  
  Append lessons/decisions into `context/memory.md` and `context/decisions.md`.

## Configuration commands

- `aibootstrap config:agent [--mode <mode>] [--type <type>]`  
  Set the default agent mode/type. Modes: `chat`, `tool-calling`, `workflow`.

- `aibootstrap config:workflow [--kind <kind>] [--entry-file <path>]`  
  Set workflow kind (orchestrator/pipeline/cron/event) and entry file.

## Typical workflow

### Option A: Interactive (Recommended)
1. Run `aibootstrap start`.
2. Choose **Auto** for quick tasks or **Manual** for structured changes.
3. Follow the on-screen instructions.

### Option B: Manual (Power Users)
1. `aibootstrap init` to copy `agent/`.
2. `aibootstrap workflow:tracks` to choose Quick/Standard/Enterprise.
3. `aibootstrap change:init add-new-api --capability api` to draft proposal/tasks/deltas.
4. Fill specs/deltas, get the proposal validated, then implement using the prompts in `agent/prompts/`.
5. Run tests, log decisions, and `aibootstrap change:archive add-new-api` after delivery.

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
