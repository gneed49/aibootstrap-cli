# Workflow — sprint execution
Use when running multiple tasks in a sprint.

## Steps
1) Load: `context/project_context.template.md`, `context/constraints.template.md`, `context/agent_tools.template.md`, `rules/*.md`, `rules/language_stack.template.md`. If mode is unset, use `strict`.
2) Clone `sprints/sprint_X.template.md`; fill objectives, backlog, risks, checkpoints.
3) For each task in the sprint, follow `agent_flow/workflow_task.md` (or `workflow_bugfix_refactor.md` for fixes).
4) Keep sprint backlog status updated; surface blockers/risks early.
5) End-of-sprint: fill notes, outcomes, and decisions (`context/decisions.md`); adjust `context/roadmap.template.md` and `tasks/backlog.template.md`.

## Files to read/write
- Context/constraints/tools: `context/*.md`
- Rules: `rules/*.md`
- Sprint: `sprints/sprint_X.template.md`
- Tasks/backlog: `tasks/*.md`
- Specs: `specs/spec.<name>.md`
