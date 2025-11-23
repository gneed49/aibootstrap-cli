# Workflow — bug fix or small refactor
Use for contained fixes or refactors with minimal scope.

## Steps
1) Load: `context/project_context.template.md`, `context/constraints.template.md`, `context/agent_tools.template.md`, `rules/*.md`, `rules/language_stack.template.md`. If mode is unset, use `strict`.
2) For bugs, read `tasks/bug_report.<id>.md`; for refactors, read the target module/tests and any related spec.
3) Pull evidence via tools (logs/metrics) listed in `context/agent_tools.template.md` if needed.
4) Create/confirm a task entry and log in `tasks/backlog.template.md` or sprint.
5) Plan briefly, implement minimal change; for refactor, preserve behavior; for bugs, add regression tests.
6) Update bug report/task with findings, tests run, and decisions (`context/decisions.md`).

## Files to read/write
- Context/constraints/tools: `context/*.md`
- Rules: `rules/*.md`
- Bug/task: `tasks/bug_report.<id>.md` or `tasks/task.<id>.md`
- Spec (if any): `specs/spec.<name>.md`
- Backlog/sprint: `tasks/backlog.template.md`, `sprints/sprint_X.template.md`
