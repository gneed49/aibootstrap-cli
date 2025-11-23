import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export type WorkflowKind = "orchestrator" | "pipeline" | "cron" | "event";

interface WorkflowConfig {
  kind: WorkflowKind;
  entryFile?: string; // ex: src/agent/workflows/main.ts
}

export async function runConfigWorkflow(options: { kind?: string; entryFile?: string }) {
  const projectRoot = process.cwd();
  const configDir = path.join(projectRoot, "agent", "config");
  const configPath = path.join(configDir, "workflow.config.json");

  if (!(await fs.pathExists(path.join(projectRoot, "agent")))) {
    console.error(
      chalk.red("No 'agent' folder detected in this project. Run 'aibootstrap init' first."),
    );
    process.exit(1);
  }

  const kind = (options.kind as WorkflowKind) ?? "orchestrator";

  if (!["orchestrator", "pipeline", "cron", "event"].includes(kind)) {
    console.error(
      chalk.red(
        `Invalid workflow type: ${options.kind}. Supported types: orchestrator, pipeline, cron, event`,
      ),
    );
    process.exit(1);
  }

  const config: WorkflowConfig = {
    kind,
    entryFile: options.entryFile,
  };

  await fs.ensureDir(configDir);
  await fs.writeJson(configPath, config, { spaces: 2 });

  console.log(chalk.green("✅ Workflow configuration updated:"));
  console.log(chalk.gray(JSON.stringify(config, null, 2)));
}
