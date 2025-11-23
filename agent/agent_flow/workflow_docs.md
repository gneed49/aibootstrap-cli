# Workflow — documentation refresh
Use to sync docs with code/specs.

## Steps
1) Load: `context/project_context.template.md`, `context/constraints.template.md`, `context/agent_tools.template.md`, `rules/*.md`. If mode is unset, use `strict`.
2) Identify target doc/spec/module; read existing materials and related spec (`specs/spec.<name>.md` if any).
3) Pull latest facts via tools (design system, analytics, research) as listed in `context/agent_tools.template.md`.
4) Use `prompts/document_module_from_code.md` or update the spec/README directly; cite sources in “Sources consulted”.
5) Log decisions in `context/decisions.md`; update links in `context/agent_tools.template.md` if new sources are found.

## Files to read/write
- Context/constraints/tools: `context/*.md`
- Rules: `rules/*.md`
- Target doc/spec: relevant README or `specs/spec.<name>.md`
- Task/backlog (if tracked): `tasks/*.md`
