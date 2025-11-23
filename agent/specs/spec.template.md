# Specification template
Write one spec per feature/initiative; keep it concise and testable.

## Summary
- Title: `...`
- Problem / goal: `...`
- Success criteria / KPIs: `...`
- Sources consulted (tools/resources): `list tools or resource URIs from context/agent_tools.template.md`

## Scope
- In scope: `...`
- Out of scope: `...`

## Users & journeys
- Personas affected: `...`
- User flow (key steps): `1) ... 2) ...`

## Requirements by area
### Product / UX
- Core behaviors: `...`
- States: `loading / success / empty / error / disabled`
- Data pulled from tools: `e.g., research links, feedback summaries`

### API (if applicable)
| Method | Path | Purpose | Auth | Idempotent |
| --- | --- | --- | --- | --- |
| `GET` | `/v1/...` | `...` | `...` | `Yes/No` |
- Params/payloads: `schemas, validations, errors`
- Rate limits / pagination / filtering: `...`

### UI (if applicable)
- Layout & hierarchy: `...`
- Interactions: `click, keyboard, focus, scroll`
- Content: `titles, labels, errors`
- Accessibility: `ARIA roles, focus order, contrast`

### Data model (if applicable)
- Entities & fields: `...`
- Relations & constraints: `...`
- Migrations / backfill strategy: `...`
- Sensitive data handling: `...`

### Non-functional
- Performance / SLAs: `latency, throughput`
- Reliability: `graceful degradation, retries`
- Security / compliance: `authn/z, PII handling`
- Observability: `logs, metrics, traces, alerts`
- Ops: `deploy/rollback, feature flags`

## Dependencies
- Technical: `services, libs, infra`
- Product: `other features, experiments, flags`

## Acceptance criteria
- `AC1: ...`
- `AC2: ...`

## Risks / open questions
- `...`

## Test plan
- Unit: `...`
- Integration/E2E: `...`
