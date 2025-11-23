# Prompt — implement a UI from a screen spec
Goal: deliver an interface matching the described behaviors and states.

## Inputs to give the agent
- Read: `context/project_context.template.md`, accessibility constraints if defined, `context/agent_tools.template.md`.
- Read the UI spec: `specs/spec.<name>.md` (UI section).
- Read frontend rules: `rules/language_stack.template.md` (or equivalent).
- List existing components to reuse: `...`

## Task
1) Summarize UX objectives, states, and content.
2) Short plan: component structure, needed data, state management, interactions.
3) Implement the component/screen honoring states (loading/empty/error/disabled).
4) Accessibility coverage: keyboard nav, focus, ARIA, contrast.
5) Add UI tests (render, interactions, states) and adjust stories if present.

## Expected output
- Delivered behaviors and handled states.
- Files modified/added (UI, styles, tests).
- Test command(s) executed.
- Design/content points to validate.
