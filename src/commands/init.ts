import path from "path";
import fs from "fs-extra";
import chalk from "chalk";

export interface InitOptions {
  force?: boolean;
}

/**
 * Copy the embedded `agent` template folder into the target project.
 *
 * We assume the template `agent` folder lives at the package root
 * next to `dist/`. From compiled files in `dist/commands`, this is `../../agent`.
 */
export async function runInit(targetDir: string, options: InitOptions = {}): Promise<void> {
  const resolvedTargetDir = path.resolve(process.cwd(), targetDir);
  const targetAgentDir = path.join(resolvedTargetDir, "agent");

  // Location of the embedded agent template inside the published package
  const templateAgentDir = path.resolve(__dirname, "../../agent");

  try {
    console.log(chalk.blue("\n🚀 Initializing AI agent project"));
    console.log(chalk.gray(`Target directory: ${resolvedTargetDir}`));

    if (!(await fs.pathExists(templateAgentDir))) {
      console.error(
        chalk.red(
          `Embedded 'agent' template folder not found at expected path: ${templateAgentDir}`,
        ),
      );
      console.error(
        chalk.yellow(
          "Make sure an 'agent' folder exists at the package root or update the path in init.ts.",
        ),
      );
      process.exit(1);
    }

    const agentExists = await fs.pathExists(targetAgentDir);

    if (agentExists && !options.force) {
      console.error(
        chalk.red(
          `'agent' folder already exists in ${resolvedTargetDir}. Use --force to overwrite it.`,
        ),
      );
      process.exit(1);
    }

    if (agentExists && options.force) {
      await fs.remove(targetAgentDir);
    }

    await fs.ensureDir(resolvedTargetDir);
    await fs.copy(templateAgentDir, targetAgentDir, { overwrite: true });

    console.log(chalk.green("✅ 'agent' template folder copied successfully into the project."));
    console.log(chalk.gray("You can now customize the agent files inside your project."));
  } catch (err) {
    console.error(chalk.red("❌ Initialization failed:"), err);
    process.exit(1);
  }
}
