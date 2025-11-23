# Workflow — project from scratch / major initiative
Use when bootstrapping a new project or large scope.

## Steps
1) Load essentials: `context/project_context.template.md`, `context/constraints.template.md`, `context/domain_glossary.template.md`, `context/agent_tools.template.md`, `rules/*.md`, `rules/language_stack.template.md`.
2) Create a project spec from `specs/spec.template.md`; pull facts via tools and note them in “Sources consulted”.
3) Define initial backlog entries using `tasks/task.template.md` + `tasks/backlog.template.md`; link the project spec.
4) If planning a sprint, clone `sprints/sprint_X.template.md` and fill objectives/backlog/risks.
5) Execute tasks using relevant prompts (feature/API/UI/tests/refactor/doc); keep scope per task. If mode is unset, default to `strict`.
6) Update `context/decisions.md` and `context/roadmap.template.md` after key choices.

## Files to read/write
- Context: `context/*.md`
- Tools: `context/agent_tools.template.md`
- Rules: `rules/*.md`
- Specs: `specs/spec.<name>.md`
- Tasks/backlog: `tasks/*.md`
- Sprint (optional): `sprints/sprint_X.template.md`
