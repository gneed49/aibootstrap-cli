# Testing rules
Goal: focused, reliable, useful coverage.

## Minimum scope
- Unit tests for each business rule and edge case.
- Integration tests for critical flows (API, DB, queue, UI e2e if relevant).
- Regression tests for every fixed bug.

## Good practices
- Clear Arrange/Act/Assert; readable test data.
- Mocks/stubs only at boundaries; avoid mocking domain logic.
- Deterministic tests: no uncontrolled network or clock.
- Name tests by expected behavior, not called function.

## Quality
- Track coverage but favor relevance over raw %.
- Verify API contracts (schemas) and data migrations.
- Add lightweight load/perf tests if SLAs exist.

## Execution
- Automate via CI; provide local commands (`npm test`, `pytest`, etc.).
- Document required flags or datasets.
