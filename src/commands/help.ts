import chalk from "chalk";

export function printHelpOverview(): void {
  console.log(chalk.blue("\nAiBootstrap CLI - Help"));
  console.log(chalk.gray("CLI to bootstrap AI agent projects"));

  console.log("\nMain commands:");
  console.log(chalk.green("  aibootstrap init [directory] [options]"));
  console.log(
    "    Initialize a project and copy the embedded 'agent' template into the target directory.",
  );
  console.log("    Options:");
  console.log(
    "      -f, --force    Overwrite an existing 'agent' folder in the target project",
  );

  console.log("\nConfiguration commands:");
  console.log(chalk.green("  aibootstrap config:agent"));
  console.log(
    "    Configure the default agent mode/type (e.g. chat, tool-calling, workflow).",
  );
  console.log(chalk.green("  aibootstrap config:workflow"));
  console.log(
    "    Configure the workflow type (e.g. orchestrator, pipeline, cron, event-driven).",
  );

  console.log("\nWorkflow & change helpers:");
  console.log(chalk.green("  aibootstrap change:init <id>"));
  console.log(
    "    Scaffold a change with proposal/tasks/design/spec delta under agent/changes/<id>.",
  );
  console.log(chalk.green("  aibootstrap change:archive <id>"));
  console.log("    Move a change to agent/changes/archive/YYYY-MM-DD-<id>.");
  console.log(chalk.green("  aibootstrap workflow:tracks"));
  console.log("    Display Quick/Standard/Enterprise track guidance.");
  console.log(chalk.green("  aibootstrap agents:list"));
  console.log(
    "    List available agent personas (product/code/testing/architect/ux/review).",
  );
  console.log(chalk.green("  aibootstrap session:init"));
  console.log(
    "    Interactive session setup (role, workflow, track) + scaffolding and session prompt.",
  );
  console.log(
    chalk.green("  aibootstrap generate:context|spec|task|sprint|change"),
  );
  console.log("    Produce prompts and files to fill key artifacts.");
  console.log(chalk.green("  aibootstrap generate"));
  console.log("    Interactive picker for the same generators (simplified).");
  console.log(chalk.green("  aibootstrap claude <workflow>"));
  console.log("    Build a Claude-ready prompt with the right files attached.");
  console.log(chalk.green("  aibootstrap task:run <id> / sprint:run <id>"));
  console.log("    Build execution prompts for a specific task or sprint.");
  console.log(chalk.green("  aibootstrap memory:log"));
  console.log("    Append lessons and decisions to memory/decisions logs.");
  console.log(chalk.green("  aibootstrap bootstrap:mvp"));
  console.log(
    "    Wizard pour créer un MVP: questions + prompt pour remplir context/rules/spec.",
  );

  console.log("\nGuides:");
  console.log(chalk.green("  aibootstrap guide"));
  console.log(
    "    Explain the structure of the 'agent' folder and how to use it in a new project.",
  );

  console.log("\nTip:");
  console.log(
    "  Use 'aibootstrap --help' or 'aibootstrap help' to see this overview.",
  );
}
