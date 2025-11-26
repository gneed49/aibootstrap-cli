# Workflow — choose the track (Quick / Standard / Enterprise)
Select the level of rigor based on size/risk to right-size the effort (BMAD-inspired).

## Tracks and criteria
- **Quick**: bugfix / small feature, local change, no breaking, low perf/security risk. Minimal artifacts: concise spec (`specs/spec.<name>.md`), tasks, targeted tests.
- **Standard**: multi-file feature or new user flow, moderate impact, possible external deps. Artifacts: full spec, task breakdown, light design if new pattern, acceptance criteria + test plan.
- **Enterprise**: breaking change, data migration, critical perf/security, multiple teams/services. Artifacts: PRD + detailed architecture, migration/rollback plan, risks, reinforced test plan (perf/security), review checklists.

## Steps
1) Read `context/project_context.template.md` + `context/constraints.template.md` + `context/agent_tools.template.md`.
2) Classify the request using the criteria above (Quick/Standard/Enterprise). If unsure → Standard.
3) According to the track:
   - Quick: create/update the minimal spec, add tasks, move to implementation (`workflow_task.md` or `workflow_bugfix_refactor.md`).
   - Standard: produce a full spec (template), define tasks and test plan, optional `design.md` if architecture/patterns.
   - Enterprise: produce PRD + architecture (rules/language_stack + dedicated doc), migration + risk plan, validate with lead before coding.
4) Record the chosen track in the task/change context to align expectations.
