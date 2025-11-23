# Prompt — implement an API
Work strictly from the API spec.

## Inputs to give the agent
- Read: `context/project_context.template.md`, `context/constraints.template.md`, `context/agent_tools.template.md`, `rules/*`, `rules/language_stack.template.md`.
- Read the API spec: `specs/spec.<name>.md` (API section) + related data schemas.
- Point to backend files involved: `...`

## Task
1) Summarize the endpoint and contracts (params, payloads, responses, errors).
2) Short plan: routing, validation, logic, persistence, tests.
3) Implement with correct idempotence, strict validation, and error handling.
4) Add tests (unit + integration) covering happy path and edge cases.
5) Document the contract if a doc file exists (OpenAPI, README).

## Expected output
- Key changes + affected endpoints.
- Schemas/contracts touched.
- Test command(s) run.
- Points of attention (perf, security, compatibility).
