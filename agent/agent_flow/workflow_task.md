# Workflow — feature / single deliverable task
Use for one feature/API/UI or similar scoped task.

## Steps
1) Load: `context/project_context.template.md`, `context/constraints.template.md`, `context/agent_tools.template.md`, `rules/*.md`, `rules/language_stack.template.md` (if relevant). If mode is unset, use `strict`.
2) If the change is non-trivial, read/create the corresponding change (`changes/<id>/...`) via `workflow_change.md`. Otherwise, note why it is skipped.
3) Choose the track (Quick/Standard/Enterprise) via `workflow_tracks.md` and record it in the task.
4) Read the spec (`specs/spec.<name>.md`). If missing, create from `specs/spec.template.md` using tool data; fill “Sources consulted”.
5) Create/confirm the task sheet (`tasks/task.<id>.md` copy) and link the spec; add to `tasks/backlog.template.md` or active sprint.
6) Choose the prompt: feature/API/UI/test/refactor/doc as appropriate.
7) Ask for a mini-plan, implement within scope, add tests, update docs/spec.
8) Log decisions in `context/decisions.md`; update task status.

## Files to read/write
- Context/constraints/tools: `context/*.md`
- Rules: `rules/*.md`
- Spec: `specs/spec.<name>.md`
- Task/backlog/sprint: `tasks/*.md`, `sprints/sprint_X.template.md` (if used)
