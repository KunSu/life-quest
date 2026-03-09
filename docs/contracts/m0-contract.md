# Milestone 0 Contract: App Shell and Local Persistence

## API Interface

- `GET /api/health`
- Response type: `{ data: { status: 'ok'; app: 'life-quest'; storage: 'sqlite' } }`

## DB Schema Diff

- Add `users` table with:
  - `id TEXT PRIMARY KEY`
  - `display_name TEXT NOT NULL`
  - `theme_mode TEXT NOT NULL`
  - `level INTEGER NOT NULL`
  - `xp INTEGER NOT NULL`
  - `total_gold INTEGER NOT NULL`
  - `created_at TEXT NOT NULL`
  - `updated_at TEXT NOT NULL`

## Page Routes

- `/dashboard` - mobile-first placeholder dashboard shell

## Zod Schemas

- None required in Milestone 0 beyond future placeholders

## Acceptance Criteria

- Given the app boots, when I open `/dashboard`, then I see a mobile-first dashboard shell
- Given the app is running, when I call `/api/health`, then I receive the agreed JSON envelope
- Given the DB initializes, when I query the seeded user, then one demo user exists

## What You Should Review

### Product Review

- Open `/dashboard`
- Confirm the page reads as a mobile-first dashboard shell, not a finished dashboard
- Check that `Life Quest` is the main heading
- Check that `Dashboard` is visible as supporting copy
- Check that the shell works at `375px` width without horizontal overflow
- Check that the shell still feels clean and readable at `1440px`

### UI/UX Review

- Confirm spacing, padding, and typography feel stable enough to continue building on
- Confirm the placeholder shell communicates the product direction without pretending M1+ features already exist
- Confirm there is no obvious mobile layout break, clipped content, or unusable empty state

### Behavior Review

- `GET /api/health` should return `{ data: { status: 'ok', app: 'life-quest', storage: 'sqlite' } }`
- After DB bootstrap lands, one demo user should exist

### Out of Scope For M0 Review

- Final dashboard information architecture
- Theme switching UX
- Quest CRUD flows
- Task interactions
- Reward animations or game-feel polish

## File Ownership

| Agent    | Files                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| Backend  | `src/db/*`, `app/api/health/route.ts`, `src/lib/errors.ts`                                                  |
| Frontend | `app/layout.tsx`, `app/(app)/layout.tsx`, `app/(app)/dashboard/page.tsx`, `components/*`, `app/globals.css` |
| QA       | `tests/e2e/*`, validation notes                                                                             |
