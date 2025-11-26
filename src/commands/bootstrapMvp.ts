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

type BootstrapConfig = {
  projectName: string;
  pitch: string;
  personas: string[];
  useCases: string[];
  mvpFeatures: string[];
  allowAiStackChoice: boolean;
  stack: {
    frontend?: string;
    backend?: string;
    style?: string;
    database?: string;
    auth?: string;
    testing?: string;
    infra?: string;
  };
  constraints: string[];
  quality: string[];
};

function abortIfCancel<T>(value: T | symbol): T {
  if (isCancel(value)) {
    cancel("Opération annulée.");
    process.exit(0);
  }
  return value as T;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "mvp";
}

function splitList(value: string): string[] {
  return value
    .split(/[,;\n]/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function printPrompt(prompt: string): void {
  console.log(chalk.yellow("\n📋 Prompt prêt pour l'agent:\n"));
  console.log(chalk.bgBlack.white(prompt));
  console.log("\n");
}

export async function runBootstrapMvp(): Promise<void> {
  intro(chalk.bgBlue(" 🧭  Bootstrap MVP "));
  const agentRoot = await requireAgentRoot();

  const projectName = abortIfCancel(
    await text({
      message: "Nom du projet ?",
      placeholder: "NovaPay",
      validate(value) {
        if (!value) return "Requis";
      },
    }),
  ) as string;

  const pitch = abortIfCancel(
    await text({
      message: "Pitch court (1-3 phrases) ?",
      placeholder: "Plateforme de paiement simple pour PME.",
      validate(value) {
        if (!value) return "Requis";
      },
    }),
  ) as string;

  const personas = splitList(
    (abortIfCancel(
      await text({
        message: "Personas cibles (séparés par virgule ou retour à la ligne) ?",
        placeholder: "Admin PME, Comptable, Employé",
      }),
    ) as string) ?? "",
  );

  const useCases = splitList(
    (abortIfCancel(
      await text({
        message: "Top use cases (séparés par virgule/retour à la ligne) ?",
        placeholder: "Encaisser paiements, Suivre factures, Rapports",
      }),
    ) as string) ?? "",
  );

  const mvpFeatures = splitList(
    (abortIfCancel(
      await text({
        message: "Features MVP de base ?",
        placeholder: "Création facture, Paiement carte, Tableau de bord",
      }),
    ) as string) ?? "",
  );

  const allowAiStackChoice =
    (abortIfCancel(
      await select({
        message: "Laisser l'IA choisir la stack si tu ne précises pas ?",
        options: [
          { value: "yes", label: "Oui, laisse l'IA choisir/préciser" },
          { value: "no", label: "Non, je précise" },
        ],
      }),
    ) as string) === "yes";

  const stack: BootstrapConfig["stack"] = {};

  if (!allowAiStackChoice) {
    stack.frontend = abortIfCancel(
      await text({
        message: "Frontend (React/Next/Vue/Svelte/autre) ?",
        placeholder: "Next.js + TypeScript",
      }),
    ) as string;
    stack.style = abortIfCancel(
      await text({
        message: "Style system (Tailwind, Chakra, MUI, CSS Modules, autre) ?",
        placeholder: "TailwindCSS",
      }),
    ) as string;
    stack.backend = abortIfCancel(
      await text({
        message: "Backend (Express/Nest/FastAPI/Rails/autre) ?",
        placeholder: "NestJS",
      }),
    ) as string;
    stack.database = abortIfCancel(
      await text({
        message: "Base de données ?",
        placeholder: "PostgreSQL",
      }),
    ) as string;
    stack.auth = abortIfCancel(
      await text({
        message: "Auth (Auth0/Cognito/Supabase/DIY) ?",
        placeholder: "Supabase Auth",
      }),
    ) as string;
    stack.testing = abortIfCancel(
      await text({
        message: "Tests (Jest/Vitest/Playwright/Cypress/autre) ?",
        placeholder: "Vitest + Playwright",
      }),
    ) as string;
    stack.infra = abortIfCancel(
      await text({
        message: "Infra/deploy (Vercel/Render/Fly/docker/k8s/autre) ?",
        placeholder: "Vercel pour front, Render pour API",
      }),
    ) as string;
  }

  const constraints = splitList(
    (abortIfCancel(
      await text({
        message: "Contraintes majeures (perf, sécu, budget, délais) ?",
        placeholder: "Budget serré, délai 4 semaines, RGPD",
      }),
    ) as string) ?? "",
  );

  const quality = splitList(
    (abortIfCancel(
      await text({
        message: "Règles qualité/code/tests (libres ou laisse vide) ?",
        placeholder: "TypeScript strict, lint+format, tests e2e principaux",
      }),
    ) as string) ?? "",
  );

  const config: BootstrapConfig = {
    projectName,
    pitch,
    personas,
    useCases,
    mvpFeatures,
    allowAiStackChoice,
    stack,
    constraints,
    quality,
  };

  const configDir = path.join(agentRoot, "config");
  const configPath = path.join(configDir, "bootstrap.config.json");
  await fs.ensureDir(configDir);
  await fs.writeJson(configPath, config, { spaces: 2 });

  // Ensure target files exist (templates copied).
  const created: string[] = [];
  const ensure = async (template: string, target: string) => {
    const existed = await fs.pathExists(path.join(agentRoot, target));
    const final = await ensureTemplateCopy(agentRoot, template, target, {
      force: false,
    });
    if (!existed) created.push(final);
    return final;
  };

  await ensure("context/project_context.template.md", "context/project_context.md");
  await ensure("context/constraints.template.md", "context/constraints.md");
  await ensure("context/domain_glossary.template.md", "context/domain_glossary.md");
  await ensure("context/agent_tools.template.md", "context/agent_tools.md");
  await ensure("context/roadmap.template.md", "context/roadmap.md");
  await ensure("context/memory.template.md", "context/memory.md");
  await ensure("rules/language_stack.template.md", "rules/language_stack.md");

  const specSlug = slugify(`${projectName}-mvp`);
  await ensure("specs/spec.template.md", `specs/spec.${specSlug}.md`);

  const prompt = `@config/bootstrap.config.json
@context/project_context.md
@context/constraints.md
@context/domain_glossary.md
@context/agent_tools.md
@context/roadmap.md
@rules/coding_standards.md
@rules/git_conventions.md
@rules/review_process.md
@rules/testing_rules.md
@rules/language_stack.md
@specs/spec.${specSlug}.md

Objectif: utiliser les réponses bootstrap pour remplir les fichiers de base.
- Mettre à jour project_context (pitch, personas, use cases, valeur, contraintes).
- Compléter constraints, domain_glossary (termes clés), agent_tools (sources/APIs/stack), roadmap (3 jalons).
- Compléter language_stack.md avec la stack choisie ou proposée si allowAiStackChoice=true.
- Mettre à jour coding/review/testing rules en cohérence avec la stack/qualité.
- Rédiger la spec MVP dans specs/spec.${specSlug}.md: scope, AC, API/UI si besoin, test plan.
- Rester concis, pas de prose inutile. Citer les choix dans “Sources consultées” en mentionnant bootstrap.config.json.
`;

  note(
    [configPath, ...created].map((p) => path.relative(process.cwd(), p)).join("\n"),
    "Fichiers créés/confirmés",
  );
  printPrompt(prompt);
  outro(chalk.green("Bootstrap MVP prêt. Donne le prompt à l'agent pour remplir les fichiers."));
}
