# Git conventions
Keep history clean and actionable.

## Branches
- Naming: `feat/<short-desc>`, `fix/<bug>`, `chore/<task>`, `docs/<topic>`.
- One branch = one atomic topic.

## Commits
- Message: `type(scope): clear summary` (type in feat, fix, chore, docs, refactor, test).
- Each commit should be testable and pass basic checks.
- Describe the "why" in the body when useful (impacts, alternatives).

## Pull requests
- Small scope; include change summary, validation done, and risks.
- Checklist: tests pass, docs updated, breaking changes signaled.
- Link issues/tasks (`Closes #id`).

## Hygiene
- Light rebase before merge to avoid noisy merges.
- No dead/commented-out code; delete instead of hiding.
