import {
  cancel,
  confirm,
  intro,
  isCancel,
  note,
  outro,
  select,
  text,
} from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { ensureTemplateCopy, requireAgentRoot } from "../utils/agentPaths";
import { runChangeInit } from "./change";

type SessionInitOptions = {
  role?: string;
  workflow?: string;
  track?: string;
  mode?: string;
  spec?: string;
  task?: string;
  sprint?: string;
  change?: string;
  capability?: string;
  force?: boolean;
  goal?: string;
};

type SessionConfig = {
  role: string;
  workflow: string;
  track: string;
  mode: string;
  goal?: string;
  spec?: string;
  task?: string;
  sprint?: string;
  change?: string;
  capability?: string;
  createdAt: string;
};

const ROLE_OPTIONS = [
  { value: "product", label: "Product" },
  { value: "code", label: "Code" },
  { value: "testing", label: "Testing" },
  { value: "architect", label: "Architect" },
  { value: "ux", label: "UX" },
  { value: "review", label: "Review" },
  { value: "orchestrator", label: "Orchestrator (Swarm leader)" },
];

const WORKFLOW_OPTIONS = [
  { value: "project", label: "Project (from scratch / major)" },
  { value: "task", label: "Task (feature/API/UI)" },
  { value: "bugfix_refactor", label: "Bugfix / small refactor" },
  { value: "sprint", label: "Sprint execution" },
  { value: "docs", label: "Docs refresh" },
  { value: "change", label: "Change gate (proposal before code)" },
];

const TRACK_OPTIONS = [
  { value: "quick", label: "Quick" },
  { value: "standard", label: "Standard" },
  { value: "enterprise", label: "Enterprise" },
];

const MODE_OPTIONS = [
  { value: "strict", label: "strict (default)" },
  { value: "propose", label: "propose" },
  { value: "open", label: "open" },
];

function abortIfCancel<T>(value: T | symbol): T {
  if (isCancel(value)) {
    cancel("Opération annulée.");
    process.exit(0);
  }
  return value as T;
}

async function ensureCoreContext(
  agentRoot: string,
  force?: boolean,
): Promise<string[]> {
  const created: string[] = [];
  const mappings: Array<[string, string]> = [
    ["context/project_context.template.md", "context/project_context.md"],
    ["context/constraints.template.md", "context/constraints.md"],
    ["context/domain_glossary.template.md", "context/domain_glossary.md"],
    ["context/agent_tools.template.md", "context/agent_tools.md"],
    ["context/memory.template.md", "context/memory.md"],
    ["context/roadmap.template.md", "context/roadmap.md"],
  ];

  for (const [templatePath, targetPath] of mappings) {
    const existed = await fs.pathExists(path.join(agentRoot, targetPath));
    const finalPath = await ensureTemplateCopy(
      agentRoot,
      templatePath,
      targetPath,
      {
        force,
      },
    );
    if (!existed) {
      created.push(finalPath);
    }
  }

  return created;
}

async function ensureSpec(
  agentRoot: string,
  specName: string,
  force?: boolean,
): Promise<string> {
  const target = `specs/spec.${specName}.md`;
  return ensureTemplateCopy(agentRoot, "specs/spec.template.md", target, {
    force,
  });
}

async function ensureTask(
  agentRoot: string,
  taskId: string,
  force?: boolean,
): Promise<string> {
  const target = `tasks/task.${taskId}.md`;
  return ensureTemplateCopy(agentRoot, "tasks/task.template.md", target, {
    force,
  });
}

async function ensureSprint(
  agentRoot: string,
  sprintId: string,
  force?: boolean,
): Promise<string> {
  const target = `sprints/sprint_${sprintId}.md`;
  return ensureTemplateCopy(agentRoot, "sprints/sprint_X.template.md", target, {
    force,
  });
}

function workflowFileName(workflow: string): string {
  switch (workflow) {
    case "task":
      return "workflow_task.md";
    case "project":
      return "workflow_project.md";
    case "bugfix_refactor":
      return "workflow_bugfix_refactor.md";
    case "sprint":
      return "workflow_sprint.md";
    case "docs":
      return "workflow_docs.md";
    case "change":
      return "workflow_change.md";
    default:
      return "workflow_task.md";
  }
}

async function writeSessionConfig(
  agentRoot: string,
  config: SessionConfig,
): Promise<void> {
  const configDir = path.join(agentRoot, "config");
  const configPath = path.join(configDir, "session.config.json");
  await fs.ensureDir(configDir);
  await fs.writeJson(configPath, config, { spaces: 2 });

  // Minimal configs so the agent can load them directly.
  const agentConfigPath = path.join(configDir, "agent.config.json");
  const workflowConfigPath = path.join(configDir, "workflow.config.json");
  const agentConfig = {
    mode: "chat",
    type: config.role,
  };
  const workflowConfig = {
    kind: "orchestrator",
    entryFile: undefined,
  };
  await fs.writeJson(agentConfigPath, agentConfig, { spaces: 2 });
  await fs.writeJson(workflowConfigPath, workflowConfig, { spaces: 2 });
}

function buildSessionPrompt(agentRoot: string, config: SessionConfig): string {
  const workflowPath = path.join(
    "agent_flow",
    workflowFileName(config.workflow),
  );
  const rolePath = path.join("agents", `${config.role}_agent.md`);
  const files: string[] = [
    "config/session.config.json",
    "config/agent.config.json",
    "config/workflow.config.json",
    "AGENTS.md",
    "metadata/agent_context_map.md",
    "agent_flow/AGENT_WORKFLOWS.md",
    workflowPath,
    "agent_flow/AGENTS_FLOW.md",
    "agent_flow/workflow_tracks.md",
    rolePath,
    "context/project_context.md",
    "context/constraints.md",
    "context/agent_tools.md",
    "context/domain_glossary.md",
    "context/roadmap.md",
    "context/decisions.md",
    "context/memory.md",
  ];

  const extra: string[] = [];
  if (config.spec) {
    extra.push(path.join("specs", `spec.${config.spec}.md`));
  }
  if (config.task) {
    extra.push(path.join("tasks", `task.${config.task}.md`));
  }
  if (config.sprint) {
    extra.push(path.join("sprints", `sprint_${config.sprint}.md`));
  }
  if (config.change) {
    extra.push(path.join("changes", config.change, "proposal.md"));
    extra.push(path.join("changes", config.change, "tasks.md"));
    extra.push(path.join("changes", config.change, "design.md"));
    extra.push(
      path.join(
        "changes",
        config.change,
        "specs",
        config.capability ?? "capability-name",
        "spec.md",
      ),
    );
  }

  const existingFiles = [...files, ...extra].filter((p) =>
    fs.existsSync(path.join(agentRoot, p)),
  );

  const header = `@session/setup
Role: ${config.role}
Workflow: ${config.workflow}
Track: ${config.track}
Mode: ${config.mode}
${config.goal ? `Goal: ${config.goal}` : ""}`.trim();

  const fileList = existingFiles.map((file) => `@${file}`).join("\n");

  return `${header}
\nFiles to load (in order):
${fileList}

Instructions:
- Respect mode=${config.mode} and track=${config.track}; follow ${workflowPath}.
- Use the role file ${rolePath} for behavior.
- Keep scope to the selected workflow; avoid loading extra context.
`;
}

export async function runSessionInit(
  options: SessionInitOptions,
): Promise<void> {
  intro(chalk.bgBlue(" 🚀 Session setup "));

  const agentRoot = await requireAgentRoot();

  const goal =
    options.goal ??
    abortIfCancel(
      await text({
        message: "Quel est l'objectif principal de cette session ?",
        placeholder: "Ex: Ajouter l'API de notifications",
      }),
    );

  const role =
    options.role ??
    abortIfCancel(
      await select({
        message: "Choisis le rôle de l'agent pour cette session",
        options: ROLE_OPTIONS,
      }),
    );

  const workflow =
    options.workflow ??
    abortIfCancel(
      await select({
        message: "Quel workflow utilises-tu ?",
        options: WORKFLOW_OPTIONS,
      }),
    );

  const track =
    options.track ??
    abortIfCancel(
      await select({
        message: "Choisis le track (rigueur attendue)",
        options: TRACK_OPTIONS,
      }),
    );

  const mode =
    options.mode ??
    abortIfCancel(
      await select({
        message: "Mode d'opération ?",
        options: MODE_OPTIONS,
      }),
    );

  let specName = options.spec;
  if (!specName) {
    const wantsSpec = abortIfCancel(
      await confirm({
        message: "Créer/valider une spec pour cette session ?",
        initialValue: workflow === "project" || workflow === "task",
      }),
    );
    if (wantsSpec) {
      specName = abortIfCancel(
        await text({
          message: "Nom de la spec (slug, sans espaces)",
          placeholder: "notifications-api",
          validate(value) {
            if (!value) return "Requis";
            if (!/^[a-z0-9-_.]+$/.test(value))
              return "Utilise lettres/chiffres/-_.";
          },
        }),
      ) as string;
    }
  }

  let taskId = options.task;
  if (!taskId) {
    const wantsTask = abortIfCancel(
      await confirm({
        message: "Créer/valider une task pour cette session ?",
        initialValue: workflow === "task" || workflow === "bugfix_refactor",
      }),
    );
    if (wantsTask) {
      taskId = abortIfCancel(
        await text({
          message: "ID de task (kebab-case ou ID)",
          placeholder: "T-1234-notifications",
          validate(value) {
            if (!value) return "Requis";
          },
        }),
      ) as string;
    }
  }

  let sprintId = options.sprint;
  if (!sprintId && workflow === "sprint") {
    sprintId = abortIfCancel(
      await text({
        message: "ID de sprint",
        placeholder: "sprint-07",
        validate(value) {
          if (!value) return "Requis";
        },
      }),
    ) as string;
  }

  let changeId = options.change;
  let capability = options.capability ?? "capability-name";
  if (
    !changeId &&
    (workflow === "change" || workflow === "project" || workflow === "task")
  ) {
    const wantsChange = abortIfCancel(
      await confirm({
        message: "Créer/valider un change (proposal + deltas) ?",
        initialValue: workflow === "change",
      }),
    );
    if (wantsChange) {
      changeId = abortIfCancel(
        await text({
          message: "ID de change (kebab-case, verbe au début)",
          placeholder: "add-notifications-api",
          validate(value) {
            if (!value) return "Requis";
            if (!/^[a-z0-9-]+$/.test(value)) return "kebab-case attendu";
          },
        }),
      ) as string;
      capability =
        options.capability ??
        abortIfCancel(
          await text({
            message: "Capability pour les deltas de spec ?",
            placeholder: "notifications",
            validate(value) {
              if (!value) return "Requis";
            },
          }),
        );
    }
  }

  const created: string[] = [];

  created.push(...(await ensureCoreContext(agentRoot, options.force)));

  if (specName) {
    const specPath = await ensureSpec(agentRoot, specName, options.force);
    created.push(specPath);
  }

  if (taskId) {
    const taskPath = await ensureTask(agentRoot, taskId, options.force);
    created.push(taskPath);
  }

  if (sprintId) {
    const sprintPath = await ensureSprint(agentRoot, sprintId, options.force);
    created.push(sprintPath);
  }

  if (changeId) {
    await runChangeInit(changeId, {
      capability,
      force: options.force ?? false,
      workingDir: process.cwd(),
    });
  }

  const config: SessionConfig = {
    role,
    workflow,
    track,
    mode,
    goal: goal || undefined,
    spec: specName || undefined,
    task: taskId || undefined,
    sprint: sprintId || undefined,
    change: changeId || undefined,
    capability,
    createdAt: new Date().toISOString(),
  };

  await writeSessionConfig(agentRoot, config);

  const sessionPrompt = buildSessionPrompt(agentRoot, config);

  note(
    [
      chalk.green("Session prête"),
      `Role: ${role}`,
      `Workflow: ${workflow}`,
      `Track: ${track}`,
      `Mode: ${mode}`,
      changeId ? `Change: ${changeId}` : undefined,
      specName ? `Spec: ${specName}` : undefined,
      taskId ? `Task: ${taskId}` : undefined,
      sprintId ? `Sprint: ${sprintId}` : undefined,
    ]
      .filter(Boolean)
      .join("\n"),
    "Résumé",
  );

  if (created.length) {
    note(
      created.map((p) => path.relative(process.cwd(), p)).join("\n"),
      "Fichiers créés/copied",
    );
  }

  note(
    [
      "agent/config/session.config.json",
      "agent/config/agent.config.json",
      "agent/config/workflow.config.json",
    ]
      .map((p) => path.join(agentRoot, p))
      .map((p) => path.relative(process.cwd(), p))
      .join("\n"),
    "Configs agent écrites",
  );

  console.log(chalk.yellow("\n📋 Prompt à donner à Claude/agent:\n"));
  console.log(chalk.bgBlack.white(sessionPrompt));
  console.log("\n");

  outro(
    chalk.green("Session initialisée. Tu peux lancer l'agent avec ce prompt."),
  );
}
