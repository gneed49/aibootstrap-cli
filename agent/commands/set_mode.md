# Command: set_mode
Purpose: set the agent operating mode.

Usage:
```
set_mode <strict|propose|open>
```
Behavior:
- `strict`: follow specs/rules exactly; no unsolicited ideas; default if unspecified.
- `propose`: follow specs, suggest better options when clearly beneficial; do not implement alternatives without approval.
- `open`: allow small creative deviations; still respect constraints/security.
Args:
- mode: required. If missing, default to `strict`.
Notes:
- Apply this at session start; state the active mode explicitly.
