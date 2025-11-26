# Testing rules
Goal: focused, reliable, useful coverage.

## Minimum scope (by track)
- Quick: unit + regression for the touched surface, parsing/validation tests.
- Standard: unit + integration for critical flows, API contracts, simple migrations.
- Enterprise: add critical e2e, perf/security when relevant, tested rollback plan.
- Always add regression tests for each bugfix.

## Good practices
- Clear Arrange/Act/Assert; readable test data.
- Mocks/stubs only at boundaries; avoid mocking domain logic.
- Deterministic tests: no uncontrolled network or clock.
- Name tests by expected behavior, not called function.
- Cover: dependency/network errors, boundary data, empty/error UX states, permissions.

## Quality
- Track coverage but favor relevance over raw %.
- Verify API contracts (schemas) and data migrations.
- Add lightweight load/perf tests if SLAs exist.
- Require reproducible fixtures (seed, clock, feature flags) and verify migrations/rollback.

## Execution
- Automate via CI; provide local commands (`npm test`, `pytest`, etc.).
- Document required flags or datasets.
- Report executed commands and results in the task/change.
