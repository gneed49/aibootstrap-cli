# Coding standards (generic)
Goal: readable, testable, maintainable code.

## Style & structure
- Prefer small functions and explicit names (verbs for actions, nouns for objects).
- Prefer composition over inheritance; separate domain logic, I/O, and presentation.
- Avoid global state; inject dependencies.
- Validate and normalize inputs at boundaries (API, CLI, DB).

## Errors & logging
- Raise contextualized errors, never swallow them.
- Log at the right level (`info` normal, `warn` recoverable, `error` blocking).
- No secrets or sensitive data in logs.

## Tests & quality
- Unit tests for pure logic; integration tests for I/O.
- Mandatory edge cases: null/undefined, network errors, timeouts, size limits.
- Add contract assertions (pre/post-conditions) for critical modules.

## Performance & robustness
- Use appropriate data structures; avoid N+1 queries and wasted work inside loops.
- Handle timeouts, retries, and backoff for external calls.
- Document optimization choices; measure before micro-optimizing.

## Documentation
- Comments explain intent, not the obvious code.
- Add local READMEs or headers for complex modules (inputs/outputs, invariants).
