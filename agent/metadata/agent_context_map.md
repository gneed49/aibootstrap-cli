# Agent context map
Entry point to orient the agent in this repo.

## Recommended reading order
1) `AGENTS.md` (core rules and routing)
2) `agent_flow/AGENT_WORKFLOWS.md` (pick the right flow)
3) `agent_flow/AGENTS_FLOW.md` (how to operate)
4) Tracks router: `agent_flow/workflow_tracks.md` (Quick/Standard/Enterprise)
5) Change workflow (si non trivial): `agent_flow/workflow_change.md` + `changes/*.template.md`
6) Diagrams (as needed): `diagrams/agent_workflow_overview.md`, `diagrams/usecase_template.md`, `diagrams/dev_workflow_with_tools.md`
7) `context/project_context.template.md`
8) `context/constraints.template.md` + `context/domain_glossary.template.md`
9) `context/agent_tools.template.md` (tools/resources to query)
10) `context/roadmap.template.md` + `context/decisions.md`
11) Global rules: `rules/*.md` (plus `rules/language_stack.template.md` when filled)
12) Relevant spec(s): `specs/spec.template.md` copies
13) Current task: `tasks/task.template.md` (project-specific copy)

## Where to find things
- Agents: `agents/`
- Commands: `commands/`
- Diagrams: `diagrams/`
- Product context: `context/`
- Tools & data sources: `context/agent_tools.template.md`
- Implementation rules: `rules/`
- Specifications: `specs/`
- Execution (tasks/bugs): `tasks/`
- Sprints: `sprints/`
- Guided prompts: `prompts/`
- Agent flow: `agent_flow/`

## Usage conventions
- Copy this folder into a project, then fill the templates.
- Do not delete templates; clone them to create dated/named files.
- Add new important artifacts here so the agent knows where to look.
