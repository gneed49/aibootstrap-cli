# Developer workflow with tools and agents
Pipeline showing how a dev session flows with roles, workflows, and external tools.

```mermaid
flowchart LR
    issue[Issue/Request
Linear/Jira/etc] --> product[Product Agent
refine need/spec]
    product --> spec[Spec update
specs/spec.*.md]
    spec --> task[Task setup
set_workflow task / backlog]
    task --> codeAgent[Code Agent
implement]
    codeAgent --> repo[Code + Tests]
    repo --> testing[Testing Agent
design/run tests]
    testing --> qa[Results + gaps]
    qa --> review[Review/Feedback loop]
    review --> deploy[Deploy/Release]
    deploy --> metrics[Metrics/Analytics]
    metrics --> product

    subgraph Tools
      tools1[context/agent_tools
MCP/APIs]
      tools2[Issue tracker]
      tools3[CI/CD + test env]
    end

    tools1 -. data/contract .-> product
    tools1 -. data/contract .-> codeAgent
    tools1 -. logs/fixtures .-> testing
    tools2 -. sync status .-> task
    tools3 -. run tests/deploy .-> testing
```

Use this to align devs and agents on the end-to-end pipeline and tool touchpoints.
