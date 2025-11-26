# Changes workflow (spec-driven)
Lightweight OpenSpec-inspired process to frame any non-trivial change.

## When to create a change
- New feature or capability.
- Breaking behavior or architectural change.
- Optimization that alters contracts/APIs.
- Ambiguous or multi-module scope → open a change.
> Exceptions: pure bugfix restoring intended behavior, typos/formatting, non-breaking deps.

## Change structure
```
changes/<id>/
├── proposal.md   # why + what + impact
├── tasks.md      # numbered checklist to tick off
├── design.md     # optional for architecture/migration/perf/security
└── specs/
    └── <capability>/spec.md   # deltas ADDED/MODIFIED/REMOVED + scenarios
```

## How to work
1) Pick a unique kebab-case id, verb-led (`add-`, `update-`, `remove-`, `refactor-`).
2) Copy the templates from this folder into `changes/<id>/`.
3) Write `proposal.md` (Why / What / Impact) and `tasks.md` (ordered checklist).
4) Add `design.md` if needed (context, decisions, risks, migration).
5) Write deltas in `specs/<capability>/spec.md`:
   - Allowed sections: `## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`, `## RENAMED Requirements`.
   - Each `### Requirement: ...` must contain at least one `#### Scenario: ...` with WHEN/THEN.
   - For MODIFIED: copy the full existing requirement then edit.
6) Manually validate shape before implementation. Implement only once the proposal is approved.
7) After delivery, archive the change (move or date the folder) and merge deltas into `specs/`.

## Available templates
- `proposal.template.md`
- `tasks.template.md`
- `design.template.md` (optional)
- `spec_delta.template.md` (copy per capability)
