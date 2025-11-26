import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { ensureTemplateCopy, requireAgentRoot } from "../utils/agentPaths";

type MemoryLogOptions = {
  lesson?: string;
  pattern?: string;
  antipattern?: string;
  decision?: string;
  context?: string;
  impact?: string;
  owner?: string;
  status?: string;
  force?: boolean;
};

async function appendIfProvided(
  filePath: string,
  heading: string,
  entry?: string,
): Promise<void> {
  if (!entry) return;
  const content = await fs.readFile(filePath, "utf8");
  const marker = `## ${heading}`;
  let updated = content;

  if (content.includes(marker)) {
    const insertionPoint = content.indexOf(marker) + marker.length;
    updated =
      content.slice(0, insertionPoint) +
      `\n- ${entry}\n` +
      content.slice(insertionPoint);
  } else {
    updated = `${content.trim()}\n\n## ${heading}\n- ${entry}\n`;
  }

  await fs.writeFile(filePath, updated, "utf8");
}

async function appendDecisionRow(filePath: string, options: MemoryLogOptions): Promise<void> {
  if (!options.decision) return;
  const date = new Date().toISOString().slice(0, 10);
  const context = options.context ?? "TBD";
  const impact = options.impact ?? "TBD";
  const owner = options.owner ?? "agent";
  const status = options.status ?? "Active";

  const row = `| ${date} | ${options.decision} | ${context} | ${impact} | ${owner} | ${status} |\n`;
  await fs.appendFile(filePath, row, "utf8");
}

export async function runMemoryLog(options: MemoryLogOptions): Promise<void> {
  if (
    !options.lesson &&
    !options.pattern &&
    !options.antipattern &&
    !options.decision
  ) {
    console.error(
      chalk.red(
        "❌ Provide at least one of --lesson, --pattern, --antipattern, --decision.",
      ),
    );
    process.exit(1);
  }

  const agentRoot = await requireAgentRoot();
  const memoryPath = await ensureTemplateCopy(
    agentRoot,
    "context/memory.template.md",
    "context/memory.md",
    { force: options.force },
  );
  const decisionsPath = path.join(agentRoot, "context/decisions.md");

  await appendIfProvided(memoryPath, "🧠 Lessons Learned", options.lesson);
  await appendIfProvided(memoryPath, "🏗️ Preferred Patterns", options.pattern);
  await appendIfProvided(memoryPath, "🚫 Anti-Patterns (Do Not Do)", options.antipattern);

  if (!(await fs.pathExists(decisionsPath))) {
    await fs.writeFile(
      decisionsPath,
      "# Decision log\n\n| Date | Decision | Context / options considered | Impact | Owner | Status |\n| --- | --- | --- | --- | --- | --- |\n",
      "utf8",
    );
  }
  await appendDecisionRow(decisionsPath, options);

  console.log(chalk.green("✅ Mémoire mise à jour."));
  console.log(chalk.gray(`- memory: ${memoryPath}`));
  if (options.decision) {
    console.log(chalk.gray(`- decisions: ${decisionsPath}`));
  }
}
