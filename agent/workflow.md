# Agent Workflow Guide
How to collaborate efficiently with the agent.

---

## 1. Principles
- Always provide context and rules before asking for code.
- Small, well-scoped tasks yield better results.
- Specs before code; decisions logged; tests by default.
- Any non-trivial change goes through a change (proposal + tasks + deltas) before implementation.
- The agent should not guess: it follows the versioned artifacts.

---

## 2. Setup
1) Copy this folder to the project root.  
2) Fill:
   - `context/project_context.template.md`
   - `context/constraints.template.md` and `context/domain_glossary.template.md` if useful
   - `context/agent_tools.template.md` (tools/resources the agent can query)
   - Rules in `rules/*.md` (plus `rules/language_stack.template.md` for stack specifics)
3) Keep `context/roadmap.template.md` and `context/decisions.md` up to date.
4) Read `agent_flow/AGENT_WORKFLOWS.md` to choose the right flow for the work, then `agent_flow/AGENTS_FLOW.md` to understand expected behavior.

---

## 3. Before coding: write the spec (and the change if needed)
- Use the single template `specs/spec.template.md` and copy it per feature/initiative.
- For non-trivial changes, create a change folder from `changes/*.template.md` (proposal, tasks, deltas) before coding.
- Pull facts from the sources listed in `context/agent_tools.template.md` (MCP, APIs, docs) before filling gaps.
- Reference the spec from tasks so the agent can read it.

---

## 4. Start a task
1) Create a sheet from `tasks/task.template.md` and fill it (context, scope, criteria, files to read).  
2) Place the ID in `tasks/backlog.template.md` or the current sprint (`sprints/`).  
3) Pick the right prompt in `prompts/` and provide:
   - Context (`context/*.md`)
   - Tools (`context/agent_tools.template.md`) to fetch missing info
   - Rules (`rules/*.md`)
   - Target spec(s)
   - Code files involved

Prompts available: implement feature/API/UI, add tests, refactor, document.

---

## 5. While executing with the agent
- Ask for a mini plan (3–5 steps) before edits.
- Require tests and check spec-defined edge cases.
- Keep scope minimal; defer out-of-scope ideas.

---

## 6. Validation & follow-up
1) Run declared tests plus needed manual checks.  
2) Update specs, docs, and `context/decisions.md` if a decision was made.  
3) Log sprint/task in `sprints/` if relevant.  
4) Commit per `rules/git_conventions.md`.

---

## 7. When the agent stalls
- Ensure it read all required files.
- Reduce the task (smaller scope, single file).
- Clarify acceptance criteria or add a reference test.
