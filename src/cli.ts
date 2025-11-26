#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import pkg from "../package.json";
import { runInit } from "./commands/init";
import { runStart } from "./commands/start";
import { printHelpOverview } from "./commands/help";
import { runConfigAgent } from "./commands/configAgent";
import { runConfigWorkflow } from "./commands/configWorkflow";
import { printBootstrapGuide } from "./commands/guide";
import { runChangeArchive, runChangeInit } from "./commands/change";
import { printTrackGuide } from "./commands/tracks";
import { printAgentRoster } from "./commands/agents";
import {
  runGenerateChange,
  runGenerateContext,
  runGenerateSpec,
  runGenerateSprint,
  runGenerateTask,
  runGenerateInteractive,
} from "./commands/generate";
import { runSessionInit } from "./commands/session";
import {
  runClaudePrompt,
  runSprintExecution,
  runTaskExecution,
} from "./commands/claude";
import { runMemoryLog } from "./commands/memory";
import { runBootstrapMvp } from "./commands/bootstrapMvp";

const program = new Command();

program
  .name("aib")
  .description("CLI to bootstrap AI agent projects")
  .version(pkg.version);

program
  .command("start")
  .description("Start the session wizard (alias of session:init)")
  .action(async () => {
    await runStart();
  });

program
  .command("init [directory]")
  .description(
    "Initialize a project by copying the embedded 'agent' template into the target directory (default: current directory)",
  )
  .option(
    "-f, --force",
    "Overwrite an existing agent folder in the target project",
  )
  .action(
    async (directory: string | undefined, options: { force?: boolean }) => {
      const targetDir = directory ?? ".";
      await runInit(targetDir, { force: options.force ?? false });
    },
  );

program
  .command("help")
  .description("Show an overview of AiBootstrap commands")
  .action(() => {
    printHelpOverview();
  });

program
  .command("config:agent")
  .description(
    "Configure the default agent mode/type (chat, tool-calling, workflow, etc.)",
  )
  .option("--mode <mode>", "Agent mode: chat | tool-calling | workflow")
  .option(
    "--type <type>",
    "Agent type (e.g. coder, researcher, orchestrator, ... )",
  )
  .action(async (options: { mode?: string; type?: string }) => {
    await runConfigAgent(options);
  });

program
  .command("config:workflow")
  .description("Configure the workflow type used by the agent")
  .option(
    "--kind <kind>",
    "Workflow type: orchestrator | pipeline | cron | event",
  )
  .option("--entry-file <path>", "Main workflow entry file (TS/JS)")
  .action(async (options: { kind?: string; entryFile?: string }) => {
    await runConfigWorkflow(options);
  });

program
  .command("guide")
  .description("Explain how to use the bootstrapped 'agent' folder")
  .action(() => {
    printBootstrapGuide();
  });

program
  .command("bootstrap:mvp")
  .description(
    "Interactive bootstrap for a new project MVP (questions + prompt de remplissage)",
  )
  .action(async () => {
    await runBootstrapMvp();
  });

program
  .command("session:init")
  .description(
    "Interactive setup for a working session (role, workflow, track) + scaffolding files and session prompt",
  )
  .option(
    "--role <role>",
    "Agent role (product|code|testing|architect|ux|review|orchestrator)",
  )
  .option(
    "--workflow <workflow>",
    "Workflow: project|task|bugfix_refactor|sprint|docs|change",
  )
  .option("--track <track>", "Track: quick|standard|enterprise")
  .option("--mode <mode>", "Mode: strict|propose|open")
  .option("--spec <name>", "Spec slug")
  .option("--task <id>", "Task id")
  .option("--sprint <id>", "Sprint id")
  .option("--change <id>", "Change id")
  .option("--capability <capability>", "Capability for spec delta")
  .option("--goal <goal>", "Goal of the session")
  .option("-f, --force", "Overwrite generated files if they already exist")
  .action(async (options) => {
    await runSessionInit(options);
  });

program
  .command("change:init <id>")
  .description(
    "Scaffold a change (proposal/tasks/design/spec delta) under agent/changes/<id>",
  )
  .option(
    "-c, --capability <capability>",
    "Capability folder for the spec delta (default: capability-name)",
  )
  .option("-f, --force", "Overwrite an existing change folder with the same id")
  .action(
    async (id: string, options: { capability?: string; force?: boolean }) => {
      await runChangeInit(id, {
        capability: options.capability,
        force: options.force ?? false,
      });
    },
  );

program
  .command("change:archive <id>")
  .description(
    "Move agent/changes/<id> to agent/changes/archive/YYYY-MM-DD-<id>",
  )
  .option("-f, --force", "Overwrite the archive target if it exists")
  .action(async (id: string, options: { force?: boolean }) => {
    await runChangeArchive(id, { force: options.force ?? false });
  });

program
  .command("workflow:tracks")
  .description("Display Quick/Standard/Enterprise track guidance")
  .action(() => {
    printTrackGuide();
  });

program
  .command("agents:list")
  .description("Display available agent personas from agent/agents/")
  .action(() => {
    printAgentRoster();
  });

program
  .command("generate")
  .description(
    "Interactive generator for context/spec/task/sprint/change (prompts + fichiers)",
  )
  .option("-f, --force", "Overwrite existing file")
  .action(async (options) => {
    await runGenerateInteractive({ force: options.force ?? false });
  });

program
  .command("generate:context")
  .description(
    "Generate a prompt to fill context/project_context.md (creates the file if missing)",
  )
  .option("-f, --force", "Overwrite existing file")
  .action(async (options) => {
    await runGenerateContext({ force: options.force ?? false });
  });

program
  .command("generate:spec")
  .description("Generate a prompt to fill a spec from specs/spec.template.md")
  .option("--name <name>", "Spec slug")
  .option("-f, --force", "Overwrite existing file")
  .action(async (options) => {
    await runGenerateSpec({
      name: options.name,
      force: options.force ?? false,
    });
  });

program
  .command("generate:task")
  .description(
    "Generate a prompt to fill a task sheet from tasks/task.template.md",
  )
  .option("--id <id>", "Task id")
  .option("--spec <spec>", "Linked spec slug")
  .option("-f, --force", "Overwrite existing file")
  .action(async (options) => {
    await runGenerateTask({
      id: options.id,
      spec: options.spec,
      force: options.force ?? false,
    });
  });

program
  .command("generate:sprint")
  .description(
    "Generate a prompt to fill a sprint sheet from sprints/sprint_X.template.md",
  )
  .option("--id <id>", "Sprint id")
  .option("-f, --force", "Overwrite existing file")
  .action(async (options) => {
    await runGenerateSprint({ id: options.id, force: options.force ?? false });
  });

program
  .command("generate:change")
  .description(
    "Generate a prompt to fill a change (proposal/tasks/deltas) and scaffold it if missing",
  )
  .option("--id <id>", "Change id (kebab-case)")
  .option("--capability <capability>", "Capability for spec delta")
  .option("-f, --force", "Overwrite existing folder")
  .action(async (options) => {
    await runGenerateChange({
      id: options.id,
      capability: options.capability,
      force: options.force ?? false,
    });
  });

program
  .command("claude <workflow>")
  .description(
    "Build a Claude-ready prompt for a workflow (project/task/bugfix_refactor/sprint/docs/change)",
  )
  .option("--role <role>", "Agent role (default orchestrator)")
  .option("--mode <mode>", "Mode: strict|propose|open (default strict)")
  .option(
    "--track <track>",
    "Track: quick|standard|enterprise (default standard)",
  )
  .option("--task <task>", "Task id to include")
  .option("--spec <spec>", "Spec slug to include")
  .option("--sprint <sprint>", "Sprint id to include")
  .option("--change <change>", "Change id to include")
  .option("--goal <goal>", "Goal of the session")
  .action(async (workflow: string, options) => {
    await runClaudePrompt(workflow, options);
  });

program
  .command("task:run <id>")
  .description(
    "Build a Claude-ready prompt to execute a task with the right prompt and context",
  )
  .option("--kind <kind>", "feature|api|ui|test|refactor|doc (default feature)")
  .option("--spec <spec>", "Linked spec slug")
  .option("--mode <mode>", "strict|propose|open (default strict)")
  .option("--track <track>", "quick|standard|enterprise (default quick)")
  .action(async (id: string, options) => {
    await runTaskExecution(id, options);
  });

program
  .command("sprint:run <id>")
  .description("Build a Claude-ready prompt to execute a sprint")
  .option("--mode <mode>", "strict|propose|open (default strict)")
  .option("--track <track>", "quick|standard|enterprise (default standard)")
  .action(async (id: string, options) => {
    await runSprintExecution(id, options);
  });

program
  .command("memory:log")
  .description(
    "Append lessons/decisions to context/memory.md and context/decisions.md",
  )
  .option("--lesson <text>", "Lesson learned to add")
  .option("--pattern <text>", "Preferred pattern to add")
  .option("--antipattern <text>", "Anti-pattern to avoid")
  .option("--decision <text>", "Decision to log")
  .option("--context <text>", "Decision context/options considered")
  .option("--impact <text>", "Impact of the decision")
  .option("--owner <text>", "Owner of the decision (default agent)")
  .option("--status <text>", "Status (Active/Superseded, default Active)")
  .option("-f, --force", "Overwrite memory template if needed")
  .action(async (options) => {
    await runMemoryLog(options);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log(chalk.blue("🚀 AiBootstrap CLI"));
  console.log(chalk.gray("Use --help or 'aib help' to see available commands"));
}
