# Agent operating guide
How the agent should work with this kit, end to end.

## Start here (every session)
1) Determine agent role: if `set_agent` not provided, infer (product for scoping/spec/feedback; code for implementation; testing for QA/validation). Load the corresponding file in `agents/`.
2) If a workflow is set, read it; otherwise pick the best fit in `agent_flow/AGENT_WORKFLOWS.md`.
3) Read `metadata/agent_context_map.md` for the index and order.
4) Load context: `context/project_context.template.md`, `context/constraints.template.md`, `context/domain_glossary.template.md`, `context/roadmap.template.md`, `context/decisions.md`.
5) Load tools: `context/agent_tools.template.md` to know available MCP/APIs/resources and how to query them.
6) Load rules: `rules/*.md` and `rules/language_stack.template.md`.
7) Load current work: relevant spec(s) in `specs/` and task in `tasks/`.

## Operating modes (set once per session; default = strict if unset)
- `strict`: follow specs/rules exactly; no new ideas; flag missing info.
- `propose`: follow specs but suggest better options when clearly beneficial; do not implement alternatives without approval.
- `open`: follow specs loosely; small creative deviations allowed; still respect constraints and security.
> Always state the active mode at the start and act accordingly.

## Challenge policy (only if needed)
- If required inputs are missing (spec, constraints, files, tools data) or contradictions exist, pause and ask concise clarifying questions.
- If context is sufficient, proceed without asking.

## Using tools to gather info
- Before filling gaps, query the sources listed in `context/agent_tools.template.md`.
- Prefer structured resources (APIs/MCP resources) before free text.
- Record new authoritative links in `context/agent_tools.template.md` and conflicts/decisions in `context/decisions.md`.
- Obey constraints from `context/constraints.template.md` (security/PII/rate limits); no destructive actions unless allowed.

## Creating/updating specs
1) Copy `specs/spec.template.md`.
2) Pull facts from tools (research, requirements, analytics, design system) and note them in "Sources consulted".
3) Fill sections for Product/UX, API, UI, Data, Non-functional, Acceptance criteria.
4) Link the spec in the related task.

## Running a task
1) Copy `tasks/task.template.md`, fill context, scope, constraints, mode, and inputs (including tools to query).
2) Add the task ID to `tasks/backlog.template.md` or the active sprint (`sprints/sprint_X.template.md`).
3) Pick the right prompt in `prompts/` (feature/API/UI/tests/refactor/doc) and feed it:
   - Context files, constraints, tools, rules, spec(s), and target code files.
4) Ask for a mini-plan, then execute per mode. Keep scope tight.
5) Add/adjust tests; run and report commands.
6) Update docs/specs and log decisions in `context/decisions.md`.

## Sprint/backlog hygiene
- Keep backlog ordered in `tasks/backlog.template.md`.
- For each sprint, clone `sprints/sprint_X.template.md`, fill objectives, backlog, risks, checkpoints, notes.
- Move finished/abandoned items out of active tables when done.

## When stuck
- Re-read `context/agent_tools.template.md` and fetch missing data.
- Reduce scope to a single file or acceptance criterion.
- Add a reference test or clarify acceptance criteria in the spec/task.
