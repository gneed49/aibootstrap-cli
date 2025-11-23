# Agent workflows (router)
Pick the workflow matching the request; keep scope tight to avoid loading unnecessary context. Always read `agent_flow/AGENTS_FLOW.md` after choosing a flow.

## Available workflows
- Project from scratch / major initiative: `agent_flow/workflow_project.md`
- Feature / single deliverable task: `agent_flow/workflow_task.md`
- Bug fix or small refactor: `agent_flow/workflow_bugfix_refactor.md`
- Sprint execution (multiple tasks): `agent_flow/workflow_sprint.md`
- Documentation refresh: `agent_flow/workflow_docs.md`

## How to use
1) If a workflow is already set (via context or command), open that file. Otherwise, infer the best fit from the user's request and select it.
2) Follow its steps and linked artifacts only; avoid loading extra files.
3) Then read `agent_flow/AGENTS_FLOW.md` for operating rules and modes (mode defaults to `strict` if not set).
