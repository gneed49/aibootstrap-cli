# Prompt — add tests to a module
Focus: reliability and edge cases.

## Inputs to give the agent
- Read: `rules/testing_rules.md`, `rules/coding_standards.md`.
- Read the target module: `...`
- Read related specs: `...`

## Task
1) Identify behaviors to test (happy path + edge cases + known regressions).
2) Propose the test strategy (unit/integration) and needed doubles.
3) Write tests with readable data and precise assertions.
4) At minimum cover: invalid inputs, external errors, boundary cases.
5) Run the tests and report the result.

## Expected output
- List of scenarios covered.
- Test files created/modified.
- Command(s) executed and results.
- Remaining gaps, if any.
