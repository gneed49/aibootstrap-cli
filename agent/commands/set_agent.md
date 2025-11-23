# Command: set_agent
Purpose: select the agent role for the session.

Usage:
```
set_agent <product|code|testing>
```
Behavior:
- Loads role guidance from `agents/<type>_agent.md`.
- If not provided, infer the best role from the user's request and current task context.
Args:
- agent type: optional. If missing, auto-select.
Notes:
- Combine with `set_mode` and `set_workflow` for a complete session setup.
