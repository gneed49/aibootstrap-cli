import {
  cancel,
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

type BaseOptions = { force?: boolean };

function abortIfCancel<T>(value: T | symbol): T {
  if (isCancel(value)) {
    cancel("Opération annulée.");
    process.exit(0);
  }
  return value as T;
}

function printPrompt(prompt: string): void {
  console.log(chalk.yellow("\n📋 Prompt prêt pour Claude/agent:\n"));
  console.log(chalk.bgBlack.white(prompt));
  console.log("\n");
}

async function ensureFile(
  agentRoot: string,
  templateRel: string,
  targetRel: string,
  force?: boolean,
) {
  const existed = await fs.pathExists(path.join(agentRoot, targetRel));
  const target = await ensureTemplateCopy(agentRoot, templateRel, targetRel, {
    force,
  });
  return { target, existed };
}

export async function runGenerateContext(
  options: BaseOptions = {},
): Promise<void> {
  intro(chalk.bgBlue(" 🎛️  Generate context "));
  const agentRoot = await requireAgentRoot();

  const { target, existed } = await ensureFile(
    agentRoot,
    "context/project_context.template.md",
    "context/project_context.md",
    options.force,
  );

  const prompt = `@context/project_context.md
@context/constraints.md
@context/domain_glossary.md
@context/agent_tools.md
@context/roadmap.md
@context/decisions.md

Remplis/rafraîchis project_context.md en restant concis:
- Pitch (2–3 phrases), objectifs, personas, use cases, scope/out of scope.
- Contraines techniques/produit et dépendances majeures.
- Renvoie à constraints/glossary/roadmap si besoin; ne duplique pas.
`;

  note(
    path.relative(process.cwd(), target),
    existed ? "Conserver et compléter" : "Créé depuis le template",
  );
  printPrompt(prompt);
  outro(chalk.green("Prompt prêt."));
}

export async function runGenerateSpec(
  options: BaseOptions & { name?: string },
): Promise<void> {
  intro(chalk.bgBlue(" 🧭  Generate spec "));
  const agentRoot = await requireAgentRoot();

  const specName =
    options.name ??
    abortIfCancel(
      await text({
        message: "Nom de la spec (slug)",
        placeholder: "feature-x",
        validate(value) {
          if (!value) return "Requis";
          if (!/^[a-z0-9-_.]+$/.test(value))
            return "Utilise lettres/chiffres/-_.";
        },
      }),
    );

  const targetRel = path.join("specs", `spec.${specName}.md`);
  const { target, existed } = await ensureFile(
    agentRoot,
    "specs/spec.template.md",
    targetRel,
    options.force,
  );

  const prompt = `@context/project_context.md
@context/constraints.md
@context/agent_tools.md
@rules/coding_standards.md
@rules/testing_rules.md
@${targetRel}

Objectif: rédige/complète la spec ${specName}.
- Remplis les sections Produit/UX, API, UI, Data, Non-fonctionnel, AC, risques, test plan.
- Cite les sources consultées (agent_tools, docs).
- Scope clair (in/out), pas de dispersion.
- Conserve la structure Markdown du template.
`;

  note(
    path.relative(process.cwd(), target),
    existed ? "Spec existante à mettre à jour" : "Spec créée",
  );
  printPrompt(prompt);
  outro(chalk.green("Prompt prêt."));
}

export async function runGenerateTask(
  options: BaseOptions & { id?: string; spec?: string },
): Promise<void> {
  intro(chalk.bgBlue(" ✅  Generate task "));
  const agentRoot = await requireAgentRoot();

  const taskId =
    options.id ??
    abortIfCancel(
      await text({
        message: "ID de task",
        placeholder: "T-1234-feature-x",
        validate(value) {
          if (!value) return "Requis";
        },
      }),
    );

  const specName =
    options.spec ??
    abortIfCancel(
      await text({
        message: "Spec liée (slug) ?",
        placeholder: "feature-x",
        validate(value) {
          if (!value) return "Requis";
        },
      }),
    );

  const targetRel = path.join("tasks", `task.${taskId}.md`);
  const { target, existed } = await ensureFile(
    agentRoot,
    "tasks/task.template.md",
    targetRel,
    options.force,
  );

  const prompt = `@context/project_context.md
@context/constraints.md
@context/agent_tools.md
@rules/coding_standards.md
@rules/testing_rules.md
@specs/spec.${specName}.md
@${targetRel}

Objectif: remplir la fiche de task ${taskId} reliée à spec.${specName}.md.
- Ajoute contexte, scope, critères d'acceptation, fichiers à lire, outils à interroger, risques.
- Note le track (Quick/Standard/Enterprise) et le workflow utilisé.
- Liste les livrables attendus et tests à exécuter.
`;

  note(
    path.relative(process.cwd(), target),
    existed ? "Task existante à compléter" : "Task créée",
  );
  printPrompt(prompt);
  outro(chalk.green("Prompt prêt."));
}

export async function runGenerateSprint(
  options: BaseOptions & { id?: string },
): Promise<void> {
  intro(chalk.bgBlue(" 🏃  Generate sprint "));
  const agentRoot = await requireAgentRoot();

  const sprintId =
    options.id ??
    abortIfCancel(
      await text({
        message: "ID de sprint",
        placeholder: "sprint-08",
        validate(value) {
          if (!value) return "Requis";
        },
      }),
    );

  const targetRel = path.join("sprints", `sprint_${sprintId}.md`);
  const { target, existed } = await ensureFile(
    agentRoot,
    "sprints/sprint_X.template.md",
    targetRel,
    options.force,
  );

  const prompt = `@context/project_context.md
@context/constraints.md
@context/roadmap.md
@context/agent_tools.md
@tasks/backlog.template.md
@${targetRel}

Objectif: remplir le sprint ${sprintId}.
- Définis objectifs, backlog (ID, titre, type, estimate, owner, status, liens spec/task), risques/dépendances, checkpoints, notes de fin.
- Garde le format du tableau existant.
`;

  note(
    path.relative(process.cwd(), target),
    existed ? "Sprint existant à mettre à jour" : "Sprint créé",
  );
  printPrompt(prompt);
  outro(chalk.green("Prompt prêt."));
}

export async function runGenerateChange(
  options: BaseOptions & { id?: string; capability?: string },
): Promise<void> {
  intro(chalk.bgBlue(" 🧩  Generate change "));
  const agentRoot = await requireAgentRoot();

  const changeId =
    options.id ??
    abortIfCancel(
      await text({
        message: "ID de change (kebab-case, verbe au début)",
        placeholder: "add-notifications-api",
        validate(value) {
          if (!value) return "Requis";
          if (!/^[a-z0-9-]+$/.test(value)) return "kebab-case attendu";
        },
      }),
    );

  const capability =
    options.capability ??
    abortIfCancel(
      await text({
        message: "Capability pour la spec delta",
        placeholder: "notifications",
        validate(value) {
          if (!value) return "Requis";
        },
      }),
    );

  await runChangeInit(changeId, {
    force: options.force ?? false,
    capability,
    workingDir: process.cwd(),
  });

  const prompt = `@context/project_context.md
@context/constraints.md
@context/agent_tools.md
@rules/coding_standards.md
@rules/testing_rules.md
@changes/${changeId}/proposal.md
@changes/${changeId}/tasks.md
@changes/${changeId}/design.md
@changes/${changeId}/specs/${capability}/spec.md

Objectif: remplir le change ${changeId}.
- Proposal: Why/What/Impact, risques, dépendances, track choisi.
- Tasks: checklist ordonnée.
- Design (optionnel): archi/migration/perf/sécurité.
- Spec deltas: sections ADDED/MODIFIED/REMOVED/RENAMED avec scénarios WHEN/THEN.
- Reste concis, pas de fluff.
`;

  printPrompt(prompt);
  outro(chalk.green("Prompt prêt."));
}

export async function runGenerateInteractive(
  options: BaseOptions = {},
): Promise<void> {
  intro(chalk.bgBlue(" 🛠️  Generate artifact "));
  const choice = abortIfCancel(
    await select({
      message: "Que veux-tu générer ?",
      options: [
        { value: "context", label: "Context (project_context...)" },
        { value: "spec", label: "Spec" },
        { value: "task", label: "Task" },
        { value: "sprint", label: "Sprint" },
        { value: "change", label: "Change" },
      ],
    }),
  );

  switch (choice) {
    case "context":
      await runGenerateContext(options);
      break;
    case "spec":
      await runGenerateSpec(options);
      break;
    case "task":
      await runGenerateTask(options);
      break;
    case "sprint":
      await runGenerateSprint(options);
      break;
    case "change":
      await runGenerateChange(options);
      break;
    default:
      cancel("Opération annulée.");
      process.exit(0);
  }
}
