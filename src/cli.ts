#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import pkg from "../package.json";
import { runInit } from "./commands/init";
import { printHelpOverview } from "./commands/help";
import { runConfigAgent } from "./commands/configAgent";
import { runConfigWorkflow } from "./commands/configWorkflow";
import { printBootstrapGuide } from "./commands/guide";

const program = new Command();

program
  .name("aibootstrap")
  .description("CLI to bootstrap AI agent projects")
  .version(pkg.version);

program
  .command("init [directory]")
  .description(
    "Initialize a project by copying the embedded 'agent' template into the target directory (default: current directory)",
  )
  .option("-f, --force", "Overwrite an existing agent folder in the target project")
  .action(async (directory: string | undefined, options: { force?: boolean }) => {
    const targetDir = directory ?? ".";
    await runInit(targetDir, { force: options.force ?? false });
  });

program
  .command("help")
  .description("Show an overview of AiBootstrap commands")
  .action(() => {
    printHelpOverview();
  });

program
  .command("config:agent")
  .description("Configure the default agent mode/type (chat, tool-calling, workflow, etc.)")
  .option("--mode <mode>", "Agent mode: chat | tool-calling | workflow")
  .option("--type <type>", "Agent type (e.g. coder, researcher, orchestrator, ... )")
  .action(async (options: { mode?: string; type?: string }) => {
    await runConfigAgent(options);
  });

program
  .command("config:workflow")
  .description("Configure the workflow type used by the agent")
  .option("--kind <kind>", "Workflow type: orchestrator | pipeline | cron | event")
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

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log(chalk.blue("🚀 AiBootstrap CLI"));
  console.log(chalk.gray("Use --help or 'aibootstrap help' to see available commands"));
}
