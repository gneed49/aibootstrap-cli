# Use case diagram template
Mermaid template to quickly sketch business use cases linked to tasks/features.

```mermaid
flowchart TD
    actor([Persona / User])
    need([Problem / Goal])
    uc1[[Use case 1]]
    uc2[[Use case 2]]
    alt{{Alternative / Edge cases?}}
    outcome([Outcome / KPI])

    actor --> need --> uc1 --> outcome
    need --> uc2
    uc1 -. includes .-> alt
```

How to use:
- Replace nodes with concrete personas, needs, use cases, edge cases, and KPIs.
- Link this diagram from the relevant task/spec to give the agent a visual summary.
