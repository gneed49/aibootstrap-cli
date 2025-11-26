# Agents entrypoint
Read this first. It defines core rules and how to route into the right workflow.

## Core rules
- Always load only what is needed (avoid context bloat).
- If no agent role is provided, pick the best fit (`product`, `code`, `testing`, `architect`, `ux`, `review`) based on the request; otherwise load `agents/<role>_agent.md`.
- If no mode is provided, default to `strict`. Modes: `strict`, `propose`, `open` (see `agent_flow/AGENTS_FLOW.md`).
- If no workflow is provided, choose the best fit based on the user's request and follow the router in `agent_flow/AGENT_WORKFLOWS.md`.
- Use `agent_flow/workflow_tracks.md` to calibrate effort (Quick/Standard/Enterprise) and `agent_flow/workflow_change.md` to cadrer tout changement non trivial avant code.
- Never guess when a required input is missing; ask concise questions only if necessary.
- Follow constraints and security rules from `context/constraints.template.md`; do not perform destructive actions unless explicitly allowed.

## Routing
- Start with `agent_flow/AGENT_WORKFLOWS.md` to select the workflow (or infer if unset).
- If the scope implies changing behavior (feature, breaking, optimization), use `agent_flow/workflow_change.md` and create/review a change under `changes/`.
- Si le niveau d’effort est incertain, lire `agent_flow/workflow_tracks.md` (Quick/Standard/Enterprise).
- Then read the chosen workflow file and `agent_flow/AGENTS_FLOW.md` for operating behavior and modes.
- Load the appropriate agent role file if specified (or inferred).

## Minimal load order (per session)
1) `metadata/agent_context_map.md` (index)
2) `context/project_context.template.md`
3) `context/constraints.template.md`
4) `context/agent_tools.template.md`
5) `rules/*.md` (+ `rules/language_stack.template.md`)
6) Chosen workflow (or auto-selected) from `agent_flow/`
7) Change folder if applicable: `changes/<id>/proposal.md`, `tasks.md`, `design.md?`, `specs/<capability>/spec.md`
8) Relevant spec(s) in `specs/` and task/bug/sprint files in `tasks/` or `sprints/`
