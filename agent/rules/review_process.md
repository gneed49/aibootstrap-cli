# Review process
Goal: find risks, not just style nits.

## Before requesting review
- Describe context, specs read, known limits.
- List what was tested (commands, results).
- Flag potential impacts (perf, security, migrations, public APIs).

## During review
- Check alignment with specs and rules (`rules/*.md`).
- Look for regressions, missing edge cases, added debt.
- If UI, check usability and quality of added tests.

## Review outcome
- Mark blocking vs non-blocking comments.
- Document structural decisions in `context/decisions.md`.
- Merge only when tests pass, feedback addressed, docs updated.
