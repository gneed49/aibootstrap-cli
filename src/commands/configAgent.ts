import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export type AgentMode = "chat" | "tool-calling" | "workflow";

interface AgentConfig {
  mode: AgentMode;
  type?: string; // ex: "researcher", "coder", etc.
}

export async function runConfigAgent(options: { mode?: string; type?: string }) {
  const projectRoot = process.cwd();
  const configDir = path.join(projectRoot, "agent", "config");
  const configPath = path.join(configDir, "agent.config.json");

  if (!(await fs.pathExists(path.join(projectRoot, "agent")))) {
    console.error(
      chalk.red("No 'agent' folder detected in this project. Run 'aibootstrap init' first."),
    );
    process.exit(1);
  }

  const mode = (options.mode as AgentMode) ?? "chat";

  if (!["chat", "tool-calling", "workflow"].includes(mode)) {
    console.error(
      chalk.red(
        `Invalid agent mode: ${options.mode}. Supported modes: chat, tool-calling, workflow`,
      ),
    );
    process.exit(1);
  }

  const config: AgentConfig = {
    mode,
    type: options.type,
  };

  await fs.ensureDir(configDir);
  await fs.writeJson(configPath, config, { spaces: 2 });

  console.log(chalk.green("✅ Agent configuration updated:"));
  console.log(chalk.gray(JSON.stringify(config, null, 2)));
}
