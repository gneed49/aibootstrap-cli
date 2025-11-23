import chalk from "chalk";

export function printHelpOverview(): void {
  console.log(chalk.blue("\nAiBootstrap CLI - Help"));
  console.log(chalk.gray("CLI to bootstrap AI agent projects"));

  console.log("\nMain commands:");
  console.log(chalk.green("  aibootstrap init [directory] [options]"));
  console.log("    Initialize a project and copy the embedded 'agent' template into the target directory.");
  console.log("    Options:");
  console.log("      -f, --force    Overwrite an existing 'agent' folder in the target project");

  console.log("\nConfiguration commands:");
  console.log(chalk.green("  aibootstrap config:agent"));
  console.log("    Configure the default agent mode/type (e.g. chat, tool-calling, workflow).");
  console.log(chalk.green("  aibootstrap config:workflow"));
  console.log("    Configure the workflow type (e.g. orchestrator, pipeline, cron, event-driven).");

  console.log("\nGuides:");
  console.log(chalk.green("  aibootstrap guide"));
  console.log("    Explain the structure of the 'agent' folder and how to use it in a new project.");

  console.log("\nTip:"));
  console.log("  Use 'aibootstrap --help' or 'aibootstrap help' to see this overview.");
}
