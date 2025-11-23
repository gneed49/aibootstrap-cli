# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling & commands

### Install & build

- Install dependencies: `npm install`
- Build the TypeScript CLI into `dist/`: `npm run build`

### Local development / running the CLI

- Run the CLI from TypeScript sources: `npm run dev -- <args>`
  - Example: `npm run dev -- help` or `npm run dev -- init ./my-project`
- Run the built CLI directly: `node dist/cli.js <command> [options]`
  - Example: `node dist/cli.js help`
- The published npm binary name is `aibootstrap` (configured in `package.json`), which maps to `dist/cli.js` when installed globally.

### Linting & tests

- There are no `lint` or `test` scripts defined in `package.json` yet.
- If tests or linters are added, prefer invoking them via npm scripts (for example `npm run lint`, `npm test`) and update this section accordingly.

### Publishing to npm

- Follow the flow in `README.md`:
  - Update `package.json` metadata (`name`, `version`, `repository`, etc.).
  - Log in to npm with `npm login`.
  - Build and publish: `npm run build` then `npm publish --access public`.

## High-level architecture

### Stack

- Node.js CLI written in TypeScript targeting CommonJS (`tsconfig.json`).
- Uses `commander` for argument parsing, `chalk` for colored output, and `fs-extra` for filesystem utilities.
- The published npm binary `aibootstrap` maps to `dist/cli.js` and ships with the `agent/` folder as an embedded template (see `files` in `package.json`).

### CLI entrypoint (`src/cli.ts`)

- Configures the `aibootstrap` command, loads the version from `package.json`, and wires subcommands:
  - `init [directory]` → `runInit` in `src/commands/init.ts`.
  - `help` → `printHelpOverview` in `src/commands/help.ts`.
  - `config:agent` → `runConfigAgent` in `src/commands/configAgent.ts`.
  - `config:workflow` → `runConfigWorkflow` in `src/commands/configWorkflow.ts`.
  - `guide` → `printBootstrapGuide` in `src/commands/guide.ts`.
- If invoked with no arguments, prints a short banner and a hint to run `--help` or `aibootstrap help`.

### Command modules (`src/commands`)

- `init.ts`:
  - Resolves the embedded `agent` template directory relative to compiled code (`dist/commands/` → `../../agent`).
  - Copies it into `<targetDir>/agent`, optionally overwriting when `--force` is passed.
  - Fails fast with human-readable errors if the template is missing or an `agent` folder already exists without `--force`.

- `configAgent.ts`:
  - Requires an `agent/` folder in the current project (assumes `aibootstrap init` has been run).
  - Writes `agent/config/agent.config.json` with `mode` (`chat` | `tool-calling` | `workflow`) and optional `type` (e.g. `coder`, `researcher`).

- `configWorkflow.ts`:
  - Also requires an `agent/` folder.
  - Writes `agent/config/workflow.config.json` with workflow `kind` (`orchestrator` | `pipeline` | `cron` | `event`) and optional `entryFile` path.

- `guide.ts`:
  - Prints a recommended structure for a consumer project's `agent/` folder and example commands to configure mode and workflow.

- `help.ts`:
  - Prints a human-oriented overview of the main CLI commands and their options.

### Embedded agent starter kit (`agent/`)

This repository ships an opinionated, tool-agnostic agent workflow kit as a template; `aibootstrap init` copies this entire folder into a target project. Changes under `agent/` affect what downstream consumers receive.

Key high-level pieces:

- **Entry and routing**
  - `agent/AGENTS.md` is the entrypoint for agents using the kit; it defines:
    - Core rules like loading only what is needed (avoiding unnecessary context) and never guessing when required inputs are missing (ask concise questions instead).
    - How to route by role (`agents/<role>_agent.md`), mode (`strict` / `propose` / `open`), and workflow (`agent_flow/*.md`).
    - A minimal load order that starts from `metadata/agent_context_map.md`, then context templates, constraints, tools, rules, and finally workflows/specs/tasks.
  - `metadata/agent_context_map.md` provides the recommended reading order and maps where to find context, rules, specs, tasks, sprints, prompts, and flows.

- **Workflow orchestration**
  - `agent/agent_flow/AGENT_WORKFLows.md` lists high-level workflows (project, feature task, bugfix/refactor, sprint, docs) and is used to pick an appropriate flow file (e.g. `workflow_task.md`).
  - `agent/agent_flow/AGENTS_FLOW.md` defines how an agent should operate end-to-end:
    - Determine role (product / code / testing) and workflow, then load context, tools, rules, specs, and tasks in that order.
    - Respect an operating mode (`strict` by default) that controls how creative vs. literal the agent should be.
    - Use tools defined in `context/agent_tools.template.md` to fetch facts before improvising, and log decisions / conflicts.

- **Context, rules, and execution artifacts**
  - `context/` holds project-level information (project context, constraints, glossary, roadmap, decisions, agent tools), intended to be filled after copying into a real project.
  - `rules/` is where coding/testing/review/stack-specific rules live; `rules/language_stack.template.md` anchors technology decisions.
  - `specs/`, `tasks/`, `sprints/`, and `prompts/` provide templates for specs, backlog items, sprint planning, and guided prompt flows respectively.
  - `workflow.md` in the `agent/` root summarizes how to combine these pieces when collaborating with an agent.

When modifying files under `agent/`, preserve this separation of concerns (routing & behavior in `AGENTS*.md`, project context in `context/`, implementation rules in `rules/`, and execution/backlog in `specs`/`tasks`/`sprints`) so that downstream projects can rely on a stable mental model.
