# Workflow — change/proposal (spec-driven)
Use to frame a change before implementation (feature, breaking change, optimization altering behavior).

## Steps
1) Load minimal context: `context/project_context.template.md`, `context/constraints.template.md`, `context/agent_tools.template.md`, `rules/*.md`, `rules/language_stack.template.md`. Default mode `strict`.
2) Check if a change already exists (`changes/` folder). If yes, read `proposal.md`, `design.md`, `tasks.md`, and deltas.
3) Otherwise pick a `change-id` (kebab-case, verb-led) and copy templates from `changes/` to `changes/<id>/`.
4) Write `proposal.md` (Why/What/Impact) and `tasks.md` (checklist). Add `design.md` only if architecture/migration/security/perf.
5) Write deltas in `changes/<id>/specs/<capability>/spec.md` using `spec_delta.template.md` (ADDED/MODIFIED/REMOVED/RENAMED + scenarios).
6) Get the proposal validated (human/lead). Do not implement before validation.
7) Then move to `workflow_task.md` or `workflow_project.md` for implementation, based on the change tasks.
8) After delivery, archive the change (move or date) and merge deltas into `specs/`. Update `context/decisions.md`.

## Files to read/write
- Context/rules: `context/*.md`, `rules/*.md`
- Change: `changes/<id>/proposal.md`, `changes/<id>/tasks.md`, `changes/<id>/design.md?`
- Deltas: `changes/<id>/specs/<capability>/spec.md`
- Final specs: `specs/spec.<name>.md`
