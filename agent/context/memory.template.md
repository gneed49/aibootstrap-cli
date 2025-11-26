# Project Memory & Learned Patterns

This file serves as the **long-term memory** for the AI agents working on this project.
It should be updated after every significant task to record lessons learned, preferred patterns, and pitfalls to avoid.

## 🧠 Lessons Learned
<!-- Record mistakes made and how they were fixed. Format: - [Topic] Issue -> Solution -->
- [Example] Authentication: The token must be refreshed *before* the API call, not in the interceptor -> Fixed in `api_client.ts`.

## 🏗️ Preferred Patterns
<!-- Record architectural decisions or code styles that should be consistently applied. -->
- [Styling] Use Tailwind utility classes for layout, but extract complex components to `@apply` in CSS modules if they exceed 5 classes.
- [Testing] Always mock external API calls using `msw` handlers in `tests/mocks/handlers.ts`.

## 🚫 Anti-Patterns (Do Not Do)
<!-- Record approaches that were tried and rejected. -->
- Do not use `moment.js` for dates; use `date-fns` (lighter weight).
- Do not commit `.env` files.

## 📂 Key File Locations
<!-- Map important logic to files if not obvious from the structure. -->
- **Auth Logic**: `src/lib/auth/`
- **Global State**: `src/stores/`

---
*Agents: Read this file before starting any task. Update it at the end of a task if you learned something new.*
