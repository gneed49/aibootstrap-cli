# Agent Starter Kit
A lean kit for working with an AI agent on any project.

## Purpose
- Give the agent a stable frame (context, rules, specs, tasks).
- Standardize specs and tasks to avoid ambiguity.
- Keep artifacts living and versioned in the project.

## Quick start
1) Copy this folder to the project root.
2) Fill the key templates: `context/*.template.md` (including `context/agent_tools.template.md`), `rules/*`, `rules/language_stack.template.md`, `specs/spec.template.md` (copy per feature), `tasks/*.template.md`, `sprints/sprint_X.template.md`.
3) Follow `workflow.md`, `agent_flow/AGENT_WORKFLOWS.md`, and `agent_flow/AGENTS_FLOW.md` to run sessions with the agent. Use `commands/` to set agent/workflow/mode or invoke prompts.

## Useful structure
- `context/`: pitch, constraints, glossary, roadmap, decisions, agent tools.
- `context/memory.md`: **(New)** Long-term memory where the agent records lessons learned and preferred patterns.
- `rules/`: coding, git, testing, review, stack rules.
- `specs/`: single spec template to copy per initiative.
- `tasks/`: backlog, tasks, and bugs.
- `changes/`: proposals/tasks/deltas for non-trivial changes before coding.
- `sprints/`: sprint tracking from the template.
- `prompts/`: ready-to-use prompts to guide the agent.
- `agents/`: role definitions (product, code, testing, architect, ux, review) AND **Orchestrator** (Swarm Leader).
- `commands/`: CLI-friendly commands to set agent/workflow/mode and run prompts.
- `metadata/agent_context_map.md`: reading plan for the agent.
- `agent_flow/`: entry workflows and operating guide for the agent.

## Swarm & Orchestration
This framework supports a "Swarm" mode where an **Orchestrator Agent** (`agents/orchestrator_agent.md`) coordinates specialized agents:
1. **Analysis**: Orchestrator breaks down the user request.
2. **Delegation**: Assigns tasks to Architect, Code, or Testing agents.
3. **Synthesis**: Combines results and updates `context/memory.md`.

Use `aib start` to trigger this flow easily.

Tip: don’t delete templates—clone them for each new spec or sprint. Always have the agent read the relevant files before generating code.
