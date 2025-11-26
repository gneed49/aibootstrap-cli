# Prompt — targeted code review
Focus: catch bugs/risks/regressions, not style.

## Inputs to provide
- Diff or involved files.
- Specs/deltas: `specs/...` and `changes/<id>/specs/...` if they exist.
- Context: constraints, rules (`rules/*.md`), chosen track (Quick/Standard/Enterprise).
- Tests executed and results.

## Task
1) Check alignment with specs/deltas and constraints.
2) Identify possible bugs, regressions, perf/security/data/privacy risks.
3) Flag blocking tech debt or necessary quick wins.
4) Require missing tests (unit/int/e2e) and fixture data.

## Expected output
- Prioritized findings (blocker/major/minor) with files/lines.
- Tests or checks to add.
- Open questions if data is missing.
