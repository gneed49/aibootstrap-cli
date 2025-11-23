# Command: set_workflow
Purpose: select the workflow entrypoint.

Usage:
```
set_workflow <project|task|bugfix_refactor|sprint|docs>
```
Behavior:
- Loads the corresponding workflow file in `agent_flow/`:
  - `project` -> `agent_flow/workflow_project.md`
  - `task` -> `agent_flow/workflow_task.md`
  - `bugfix_refactor` -> `agent_flow/workflow_bugfix_refactor.md`
  - `sprint` -> `agent_flow/workflow_sprint.md`
  - `docs` -> `agent_flow/workflow_docs.md`
Args:
- workflow: required. If missing, the agent must infer the best fit from the user request.
Notes:
- Set once per session or per request. If unset, auto-select based on the user's ask.
