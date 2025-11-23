# Prompt — document a module from code
Goal: produce concise, useful documentation.

## Inputs to give the agent
- Read the module: `...`
- Read related specs: `...`
- Read doc rules if they exist: `...`

## Task
1) Summarize the module's role and public API (inputs/outputs, invariants).
2) Describe dependencies and extension points.
3) Document main flows and handled edge cases.
4) List prerequisites (config, env vars, sample data).
5) Add a "How to test" section with commands.

## Expected output
- Doc file updated/added.
- Location of the doc (e.g., module README).
- Usage example if helpful.
