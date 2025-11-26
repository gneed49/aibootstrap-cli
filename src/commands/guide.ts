import chalk from "chalk";

export function printBootstrapGuide(): void {
  console.log(chalk.blue("\nHow to use the 'agent' bootstrap folder"));

  console.log("\n1. Typical 'agent' folder structure (example):");
  console.log("  agent/");
  console.log("    config/");
  console.log("      agent.config.json      -> agent mode/type configuration");
  console.log("      workflow.config.json   -> workflow type configuration");
  console.log("    src/");
  console.log("      index.ts               -> main entrypoint for your agent");
  console.log(
    "      workflows/             -> workflow definitions (pipelines, cron jobs, etc.)",
  );
  console.log(
    "      tools/                 -> functions/tools the agent can call",
  );

  console.log("\n2. Getting started:");
  console.log("  a) In your project, run:");
  console.log(chalk.green("     aib init"));
  console.log(
    "     -> copies the base 'agent' template folder into your project.",
  );

  console.log("  b) Configure the agent mode (chat, tool-calling, workflow):");
  console.log(chalk.green("     aib config:agent --mode chat --type coder"));

  console.log("  c) Configure the workflow type:");
  console.log(
    chalk.green(
      "     aib config:workflow --kind orchestrator --entry-file src/agent/workflows/main.ts",
    ),
  );

  console.log(
    "  d) Pick a track (Quick/Standard/Enterprise) and scaffold a change if non-trivial:",
  );
  console.log(chalk.green("     aib workflow:tracks"));
  console.log(chalk.green("     aib change:init add-new-api --capability api"));

  console.log("\n3. Integrating into your runtime:");
  console.log(
    "  - Import code from 'agent/src' in your backend, CLI, or worker processes.",
  );
  console.log(
    "  - The *.config.json files act as the source of truth for agent behavior.",
  );

  console.log("\n4. Best practices:");
  console.log("  - Commit the 'agent' folder to your VCS (e.g. git).");
  console.log(
    "  - Avoid editing generated templates without documenting the changes.",
  );
  console.log(
    "  - Keep clear conventions for workflows (file naming, directory layout, etc.).",
  );
  console.log("  - Archive changes after delivery:");
  console.log(chalk.green("     aib change:archive add-new-api"));

  console.log("\nTo see all available commands:");
  console.log(chalk.green("  aib help"));
}
