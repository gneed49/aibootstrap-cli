# Prompt — refactor a module
Goal: improve without changing observable behavior.

## Inputs to give the agent
- Read: `rules/coding_standards.md`, `rules/testing_rules.md`.
- Read the target module + existing tests: `...`
- Read the spec/contract if applicable: `...`

## Task
1) Briefly describe current behavior and issues (debt, duplication, complexity).
2) Propose a short plan (3–5 steps) that preserves compatibility.
3) Refactor while keeping the public API stable.
4) Extend/add tests to secure behavior.
5) Remove dead code; document important invariants.

## Expected output
- Structural changes made.
- Files touched.
- Tests executed and results.
- Residual risks or recommended follow-ups.
