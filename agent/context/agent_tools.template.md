# Agent tools & data sources
Define all tools the agent can use to fetch/sync information (MCP servers, APIs, DBs, docs). Keep it actionable.

## Quick usage rules
- Tools are read-first: fetch facts before asking humans.
- Prefer structured resources (APIs, MCP resources) over free text when available.
- Note access limits/rate limits; avoid destructive actions unless explicitly allowed.

## Tool registry
| Name | Type (MCP/API/DB/Other) | Purpose / what to fetch | How to call / sample query | Auth / secrets location | Rate/usage notes |
| --- | --- | --- | --- | --- | --- |
| `...` | `MCP` | `e.g., product requirements` | `e.g., list-resources resource=...` | `...` | `...` |
|  |  |  |  |  |  |

## Resource map (where to read/write)
- Product context: `...` (e.g., Confluence space, MCP resource URI)
- UX research / feedback: `...`
- Specs source of truth: `...`
- Backlog/tasks source: `...`
- Design system / components: `...`
- Metrics/analytics: `...`

## Sync guidance
- Before filling a spec/task, pull the latest info from the relevant sources above.
- If a source conflicts with a local file, prefer the most recent timestamp; log the decision in `context/decisions.md`.
- Record any new authoritative links or resources here when added.

## Safety constraints
- Do not write to production systems unless explicitly allowed.
- Obey PII/security rules defined in `context/constraints.template.md`.
