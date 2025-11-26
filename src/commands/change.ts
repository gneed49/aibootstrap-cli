import path from "path";
import fs from "fs-extra";
import chalk from "chalk";

type ChangeInitOptions = {
  capability?: string;
  force?: boolean;
  workingDir?: string;
};

type ChangeArchiveOptions = {
  force?: boolean;
  workingDir?: string;
};

async function copyTemplate(
  templateDir: string,
  templateName: string,
  destination: string,
): Promise<void> {
  const source = path.join(templateDir, templateName);
  if (!(await fs.pathExists(source))) {
    throw new Error(`Template not found: ${source}`);
  }
  const content = await fs.readFile(source, "utf8");
  await fs.outputFile(destination, content, "utf8");
}

export async function runChangeInit(
  changeId: string,
  options: ChangeInitOptions = {},
): Promise<void> {
  const workingDir = options.workingDir ?? process.cwd();
  const agentDir = path.resolve(workingDir, "agent");
  const templateDir = path.join(agentDir, "changes");
  const targetDir = path.join(templateDir, changeId);
  const capability = options.capability ?? "capability-name";

  if (!changeId) {
    console.error(
      chalk.red("❌ Please provide a change id (kebab-case, verb-led)."),
    );
    process.exit(1);
  }

  if (!(await fs.pathExists(agentDir))) {
    console.error(
      chalk.red(
        `❌ 'agent' folder not found at ${agentDir}. Run 'aib init' first.`,
      ),
    );
    process.exit(1);
  }

  if (!(await fs.pathExists(templateDir))) {
    console.error(
      chalk.red(`❌ Template directory not found at ${templateDir}.`),
    );
    process.exit(1);
  }

  if (await fs.pathExists(targetDir)) {
    if (!options.force) {
      console.error(
        chalk.red(
          `❌ Change '${changeId}' already exists. Use --force to overwrite or pick another id.`,
        ),
      );
      process.exit(1);
    }
    await fs.remove(targetDir);
  }

  await fs.ensureDir(targetDir);

  try {
    await copyTemplate(
      templateDir,
      "proposal.template.md",
      path.join(targetDir, "proposal.md"),
    );
    await copyTemplate(
      templateDir,
      "tasks.template.md",
      path.join(targetDir, "tasks.md"),
    );
    await copyTemplate(
      templateDir,
      "design.template.md",
      path.join(targetDir, "design.md"),
    );

    const specTarget = path.join(targetDir, "specs", capability, "spec.md");
    await copyTemplate(templateDir, "spec_delta.template.md", specTarget);

    console.log(chalk.green(`✅ Change scaffold created at ${targetDir}`));
    console.log(chalk.gray("Next steps:"));
    console.log(
      `  - Fill ${path.join("changes", changeId, "proposal.md")} (why/what/impact)`,
    );
    console.log(
      `  - List work in ${path.join("changes", changeId, "tasks.md")} (checklist)`,
    );
    console.log(
      `  - Capture deltas in ${path.join("changes", changeId, "specs", capability, "spec.md")}`,
    );
    console.log(
      "  - Only start implementation after the proposal is validated; then follow workflow_task/project.",
    );
  } catch (err) {
    console.error(chalk.red("❌ Failed to scaffold change:"), err);
    process.exit(1);
  }
}

export async function runChangeArchive(
  changeId: string,
  options: ChangeArchiveOptions = {},
): Promise<void> {
  const workingDir = options.workingDir ?? process.cwd();
  const agentDir = path.resolve(workingDir, "agent");
  const changeDir = path.join(agentDir, "changes", changeId);
  const archiveDir = path.join(agentDir, "changes", "archive");
  const datePrefix = new Date().toISOString().slice(0, 10);
  let targetDir = path.join(archiveDir, `${datePrefix}-${changeId}`);

  if (!changeId) {
    console.error(chalk.red("❌ Please provide a change id to archive."));
    process.exit(1);
  }

  if (!(await fs.pathExists(changeDir))) {
    console.error(chalk.red(`❌ Change folder not found: ${changeDir}`));
    process.exit(1);
  }

  if (await fs.pathExists(targetDir)) {
    if (!options.force) {
      console.error(
        chalk.red(
          `❌ Archive target already exists: ${targetDir}. Use --force to overwrite or archive manually.`,
        ),
      );
      process.exit(1);
    }
    await fs.remove(targetDir);
  }

  await fs.ensureDir(archiveDir);

  try {
    await fs.move(changeDir, targetDir);
    console.log(
      chalk.green(`✅ Change '${changeId}' archived to ${targetDir}`),
    );
    console.log(
      chalk.gray(
        "Remember to merge approved deltas into specs/ and log decisions in context/decisions.md.",
      ),
    );
  } catch (err) {
    console.error(chalk.red("❌ Failed to archive change:"), err);
    process.exit(1);
  }
}
