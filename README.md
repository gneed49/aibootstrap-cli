# AiBootstrap CLI (WIP)

Spec-driven agent toolkit with personas, workflows, and scaffolding. **Work in progress**: commands and flows may evolve quickly.

## What it does
- Copies a ready-to-use `agent/` folder (context, rules, specs, prompts, workflows).
- Provides guided wizards to set up sessions, bootstrap an MVP, and generate prompts/files for Claude-like agents.
- Scaffolds changes (proposal/tasks/design/spec delta) and enforces track guidance (Quick/Standard/Enterprise).

## Installation
```bash
npm install -g aibootstrap-cli
# or use without installing
npx aibootstrap-cli init
```
Command name: `aib`.

## Default path (recommended)
1) `aib init` — copie `agent/` dans le projet.  
2) Optionnel : `aib bootstrap:mvp` — réponds aux questions produit/stack/features/contraintes, écrit `agent/config/bootstrap.config.json`, prépare le prompt pour que l’agent remplisse context/rules/specs du MVP.  
3) `aib start` (alias `aib session:init`) — wizard de session (role/workflow/track), crée les fichiers manquants, écrit `agent/config/*.json`, affiche le prompt Claude prêt.  
4) Exécute : `aib task:run <id>` ou `aib sprint:run <id>` / `aib claude <workflow>` pour piloter l’agent avec le bon contexte.  
5) Hygiène : `aib memory:log` pour consigner les lessons learned et décisions.

## Commandes principales
- `aib init [directory] [-f|--force]` : copier le template `agent/` dans le projet.
- `aib start` / `aib session:init` : wizard de session (role/workflow/track), fichiers créés, configs écrites, prompt Claude prêt.
- `aib bootstrap:mvp` : questionnaire MVP (produit/stack/features/contraintes), écrit `config/bootstrap.config.json`, copies de templates, prompt pour faire remplir context/rules/specs par l’agent.
- `aib generate` (ou `generate:context|spec|task|sprint|change`) : génère les artefacts manquants + prompt dédié.
- `aib claude <workflow>` : construit un prompt avec les bons fichiers pour un workflow (project/task/bugfix_refactor/sprint/docs/change).
- `aib task:run <id>`, `aib sprint:run <id>` : prompts d’exécution ciblés (task/sprint) avec le contexte adéquat.
- `aib workflow:tracks` / `aib change:init|archive` / `aib agents:list` : tracks, scaffolding de change, roster des personas.
- `aib memory:log` : ajoute lessons learned / décisions dans `context/memory.md` et `context/decisions.md`.
- `aib guide` : tour du dossier `agent/`.

## Workflows couverts (agent side)
- Session strict/propose/open avec rôle (product/code/testing/architect/ux/review/orchestrator) et workflow (project/task/bugfix_refactor/sprint/docs/change).
- Change gate (proposal + tasks + deltas) avant code.
- Track selector (Quick/Standard/Enterprise) pour calibrer les artefacts.
- Sprint / backlog / tasks / specs / prompts prêts à l’emploi.

## Development
```bash
npm install
npm run build
node dist/cli.js help
```

## Notes
- WIP: interfaces et prompts peuvent changer; vérifiez le changelog avant upgrade.
- Publier sur npm : déjà livré via `aibootstrap-cli`; utilisez la commande `aib` après installation.
