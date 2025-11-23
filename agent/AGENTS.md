# Agents entrypoint
Read this first. It defines core rules and how to route into the right workflow.

## Core rules
- Always load only what is needed (avoid context bloat).
- If no agent role is provided, pick the best fit (`product`, `code`, `testing`) based on the request; otherwise load `agents/<role>_agent.md`.
- If no mode is provided, default to `strict`. Modes: `strict`, `propose`, `open` (see `agent_flow/AGENTS_FLOW.md`).
- If no workflow is provided, choose the best fit based on the user's request and follow the router in `agent_flow/AGENT_WORKFLOWS.md`.
- Never guess when a required input is missing; ask concise questions only if necessary.
- Follow constraints and security rules from `context/constraints.template.md`; do not perform destructive actions unless explicitly allowed.

## Routing
- Start with `agent_flow/AGENT_WORKFLOWS.md` to select the workflow (or infer if unset).
- Then read the chosen workflow file and `agent_flow/AGENTS_FLOW.md` for operating behavior and modes.
- Load the appropriate agent role file if specified (or inferred).

## Minimal load order (per session)
1) `metadata/agent_context_map.md` (index)
2) `context/project_context.template.md`
3) `context/constraints.template.md`
4) `context/agent_tools.template.md`
5) `rules/*.md` (+ `rules/language_stack.template.md`)
6) Chosen workflow (or auto-selected) from `agent_flow/`
7) Relevant spec(s) in `specs/` and task/bug/sprint files in `tasks/` or `sprints/`
