import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export function getAgentRoot(workingDir?: string): string {
  return path.resolve(workingDir ?? process.cwd(), "agent");
}

export async function requireAgentRoot(workingDir?: string): Promise<string> {
  const agentRoot = getAgentRoot(workingDir);
  if (!(await fs.pathExists(agentRoot))) {
    console.error(
      chalk.red(
        `❌ 'agent' folder not found at ${agentRoot}. Run 'aib init' in your project first.`,
      ),
    );
    process.exit(1);
  }
  return agentRoot;
}

export async function ensureTemplateCopy(
  agentRoot: string,
  templateRelativePath: string,
  targetRelativePath: string,
  options: { force?: boolean } = {},
): Promise<string> {
  const templatePath = path.join(agentRoot, templateRelativePath);
  const targetPath = path.join(agentRoot, targetRelativePath);

  if (!(await fs.pathExists(templatePath))) {
    console.error(chalk.red(`❌ Template not found: ${templatePath}`));
    process.exit(1);
  }

  if (await fs.pathExists(targetPath)) {
    if (!options.force) {
      return targetPath;
    }
    await fs.remove(targetPath);
  }

  await fs.ensureDir(path.dirname(targetPath));
  await fs.copy(templatePath, targetPath);
  return targetPath;
}
