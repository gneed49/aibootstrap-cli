import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { requireAgentRoot } from "../utils/agentPaths";

type ClaudeOptions = {
  task?: string;
  spec?: string;
  change?: string;
  sprint?: string;
  role?: string;
  mode?: string;
  track?: string;
  goal?: string;
};

type TaskRunOptions = {
  kind?: "feature" | "api" | "ui" | "test" | "refactor" | "doc";
  spec?: string;
  mode?: string;
  track?: string;
};

type SprintRunOptions = {
  mode?: string;
  track?: string;
};

function workflowFileName(workflow: string): string {
  switch (workflow) {
    case "task":
      return "agent_flow/workflow_task.md";
    case "project":
      return "agent_flow/workflow_project.md";
    case "bugfix_refactor":
      return "agent_flow/workflow_bugfix_refactor.md";
    case "sprint":
      return "agent_flow/workflow_sprint.md";
    case "docs":
      return "agent_flow/workflow_docs.md";
    case "change":
      return "agent_flow/workflow_change.md";
    default:
      return "agent_flow/workflow_task.md";
  }
}

function promptForClaude(
  files: string[],
  header: string,
  instructions: string,
): string {
  const list = files.map((f) => `@${f}`).join("\n");
  return `${header}

${instructions.trim()}

Files:
${list}
`;
}

async function existing(agentRoot: string, relPath: string): Promise<boolean> {
  return fs.pathExists(path.join(agentRoot, relPath));
}

export async function runClaudePrompt(
  workflow: string,
  options: ClaudeOptions = {},
): Promise<void> {
  const agentRoot = await requireAgentRoot();
  const mode = options.mode ?? "strict";
  const track = options.track ?? "standard";
  const role = options.role ?? "orchestrator";

  const workflowPath = workflowFileName(workflow);
  const files: string[] = [
    "AGENTS.md",
    "metadata/agent_context_map.md",
    "agent_flow/AGENT_WORKFLOWS.md",
    workflowPath,
    "agent_flow/AGENTS_FLOW.md",
    "agent_flow/workflow_tracks.md",
    `agents/${role}_agent.md`,
    "context/project_context.md",
    "context/constraints.md",
    "context/agent_tools.md",
    "context/domain_glossary.md",
    "context/roadmap.md",
    "context/decisions.md",
    "context/memory.md",
  ];

  if (options.spec) {
    files.push(`specs/spec.${options.spec}.md`);
  }
  if (options.task) {
    files.push(`tasks/task.${options.task}.md`);
  }
  if (options.sprint) {
    files.push(`sprints/sprint_${options.sprint}.md`);
  }
  if (options.change) {
    files.push(`changes/${options.change}/proposal.md`);
    files.push(`changes/${options.change}/tasks.md`);
    files.push(`changes/${options.change}/design.md`);
  }

  const filtered: string[] = [];
  for (const f of files) {
    if (await existing(agentRoot, f)) {
      filtered.push(f);
    }
  }

  const header = `Session setup:
- Role: ${role}
- Workflow: ${workflow}
- Track: ${track}
- Mode: ${mode}
${options.goal ? `- Goal: ${options.goal}` : ""}`;

  const instructions = `Lis les fichiers dans l'ordre. Applique le workflow ${workflowPath}, respecte le mode=${mode} et le track=${track}.
Si des entrées manquent, pose des questions courtes, sinon exécute directement.`;

  const prompt = promptForClaude(filtered, header, instructions);

  console.log(chalk.yellow("\n📋 Prompt orchestrateur à envoyer à Claude:\n"));
  console.log(chalk.bgBlack.white(prompt));
  console.log("\n");
}

export async function runTaskExecution(
  taskId: string,
  options: TaskRunOptions = {},
): Promise<void> {
  const agentRoot = await requireAgentRoot();
  const mode = options.mode ?? "strict";
  const track = options.track ?? "quick";
  const specName = options.spec;

  const promptFileByKind: Record<string, string> = {
    feature: "prompts/implement_feature_from_spec.md",
    api: "prompts/implement_api_from_spec.md",
    ui: "prompts/implement_ui_from_screen_spec.md",
    test: "prompts/add_tests_for_module.md",
    refactor: "prompts/refactor_module_with_rules.md",
    doc: "prompts/document_module_from_code.md",
  };
  const promptFile =
    promptFileByKind[options.kind ?? "feature"] ?? promptFileByKind.feature;

  const files: string[] = [
    "AGENTS.md",
    "agent_flow/AGENT_WORKFLOWS.md",
    "agent_flow/workflow_task.md",
    "agent_flow/AGENTS_FLOW.md",
    "context/project_context.md",
    "context/constraints.md",
    "context/agent_tools.md",
    "rules/coding_standards.md",
    "rules/testing_rules.md",
    `tasks/task.${taskId}.md`,
    promptFile,
  ];

  if (specName) {
    files.push(`specs/spec.${specName}.md`);
  }

  const taskPath = path.join(agentRoot, `tasks/task.${taskId}.md`);
  if (!(await fs.pathExists(taskPath))) {
    console.error(
      chalk.red(
        `❌ Task introuvable: ${taskPath}. Crée-la d'abord (aib generate:task --id ${taskId}).`,
      ),
    );
    process.exit(1);
  }

  const filtered: string[] = [];
  for (const f of files) {
    if (await existing(agentRoot, f)) {
      filtered.push(f);
    }
  }

  const header = `Task execution
- Task: ${taskId}
- Kind: ${options.kind ?? "feature"}
- Mode: ${mode}
- Track: ${track}
${specName ? `- Spec: ${specName}` : ""}`;

  const instructions = `Lis la task et la spec, utilise le prompt ${promptFile}. Produit un mini-plan puis exécute en respectant le track=${track}. Ajoute tests et note les décisions dans context/decisions.md.`;

  const prompt = promptForClaude(filtered, header, instructions);

  console.log(chalk.yellow("\n📋 Prompt d'exécution de task:\n"));
  console.log(chalk.bgBlack.white(prompt));
  console.log("\n");
}

export async function runSprintExecution(
  sprintId: string,
  options: SprintRunOptions = {},
): Promise<void> {
  const agentRoot = await requireAgentRoot();
  const mode = options.mode ?? "strict";
  const track = options.track ?? "standard";

  const files: string[] = [
    "AGENTS.md",
    "agent_flow/AGENT_WORKFLOWS.md",
    "agent_flow/workflow_sprint.md",
    "agent_flow/AGENTS_FLOW.md",
    "context/project_context.md",
    "context/constraints.md",
    "context/agent_tools.md",
    "tasks/backlog.template.md",
    `sprints/sprint_${sprintId}.md`,
  ];

  const sprintPath = path.join(agentRoot, `sprints/sprint_${sprintId}.md`);
  if (!(await fs.pathExists(sprintPath))) {
    console.error(
      chalk.red(
        `❌ Sprint introuvable: ${sprintPath}. Crée-le d'abord (aib generate:sprint --id ${sprintId}).`,
      ),
    );
    process.exit(1);
  }

  const filtered: string[] = [];
  for (const f of files) {
    if (await existing(agentRoot, f)) {
      filtered.push(f);
    }
  }

  const header = `Sprint execution
- Sprint: ${sprintId}
- Mode: ${mode}
- Track: ${track}`;

  const instructions = `Planifie/rafraîchis le sprint: valider backlog, risques, checkpoints. Pour chaque task, bascule vers workflow_task ou workflow_bugfix_refactor selon besoin. Mets à jour le tableau du sprint et context/decisions.md.`;

  const prompt = promptForClaude(filtered, header, instructions);

  console.log(chalk.yellow("\n📋 Prompt d'exécution de sprint:\n"));
  console.log(chalk.bgBlack.white(prompt));
  console.log("\n");
}
