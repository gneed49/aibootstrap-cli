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
- `rules/`: coding, git, testing, review, stack rules.
- `specs/`: single spec template to copy per initiative.
- `tasks/`: backlog, tasks, and bugs.
- `sprints/`: sprint tracking from the template.
- `prompts/`: ready-to-use prompts to guide the agent.
- `agents/`: role definitions (product, code, testing).
- `commands/`: CLI-friendly commands to set agent/workflow/mode and run prompts.
- `metadata/agent_context_map.md`: reading plan for the agent.
- `agent_flow/`: entry workflows and operating guide for the agent.

Tip: don’t delete templates—clone them for each new spec or sprint. Always have the agent read the relevant files before generating code.
