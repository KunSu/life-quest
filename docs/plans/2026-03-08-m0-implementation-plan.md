# Life Quest Milestone 0 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bootstrap the standalone `life-quest` repo into a runnable Milestone 0 vertical slice with a mobile-first app shell, health endpoint, SQLite foundation, and baseline automated checks.

**Architecture:** Build a single Next.js App Router app with strict TypeScript and shared validation/tooling from day one. Use configuration-only setup first where TDD is not practical, then switch immediately into `@test-driven-development` for UI and data behavior with one failing test at a time.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, SQLite, Drizzle ORM, better-sqlite3, Zod, Vitest, Playwright, pnpm

---

### Task 1: Lock the Milestone 0 contract

**Files:**

- Create: `docs/contracts/m0-contract.md`
- Update: `task_plan.md`
- Update: `progress.md`

**Step 1: Write the Milestone 0 contract**

Create `docs/contracts/m0-contract.md` with:

```markdown
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

## File Ownership

| Agent    | Files                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| Backend  | `src/db/*`, `app/api/health/route.ts`, `src/lib/errors.ts`                                                  |
| Frontend | `app/layout.tsx`, `app/(app)/layout.tsx`, `app/(app)/dashboard/page.tsx`, `components/*`, `app/globals.css` |
| QA       | `tests/e2e/*`, validation notes                                                                             |
```

**Step 2: Update planning memory**

Update `task_plan.md` so Phase 0 becomes complete and Phase 1 becomes in progress. Append to `progress.md` that the M0 contract is locked.

**Step 3: Verify the contract exists**

Run: `test -f docs/contracts/m0-contract.md && echo "contract ready"`
Expected: `contract ready`

### Task 2: Bootstrap the repo toolchain and config

**Files:**

- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `.gitignore`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `.eslintrc.json`
- Create: `.prettierrc`
- Create: `.prettierignore`
- Create: `drizzle.config.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `next-env.d.ts`
- Create: `app/globals.css`

**Step 1: Create the project manifest**

Create `package.json` with scripts:

```json
{
  "name": "life-quest",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  }
}
```

**Step 2: Add dependencies**

Run:

```bash
pnpm add next react react-dom framer-motion zod drizzle-orm better-sqlite3 ulid
pnpm add -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer eslint eslint-config-next prettier vitest @vitest/coverage-v8 @playwright/test drizzle-kit
```

Expected: install completes without lockfile errors.

**Step 3: Write strict config files**

Create the remaining files with:

- `TypeScript`: `strict: true`, `noUncheckedIndexedAccess: true`
- `ESLint`: `next/core-web-vitals`
- `Prettier`: `tabWidth: 2`, `singleQuote: true`, `trailingComma: 'all'`
- `Tailwind`: scan `app`, `components`, and `src`
- `Drizzle`: SQLite output under `src/db/migrations`

**Step 4: Verify config bootstrap**

Run:

```bash
pnpm install
pnpm lint || true
pnpm typecheck || true
```

Expected:

- `pnpm install` succeeds
- `lint` and `typecheck` may fail because app files are not created yet, but config loading itself must work without "command not found" or parser setup errors

### Task 3: Add the first failing Milestone 0 E2E

**Files:**

- Create: `tests/e2e/app-shell.spec.ts`
- Update: `playwright.config.ts`
- Update: `package.json`

**Step 1: Write the failing test**

Create `tests/e2e/app-shell.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('loads dashboard shell and health endpoint @m0', async ({
  page,
  request,
}) => {
  const response = await request.get('/api/health');
  expect(response.ok()).toBeTruthy();
  await expect(response).toHaveJSON({
    data: { status: 'ok', app: 'life-quest', storage: 'sqlite' },
  });

  await page.goto('/dashboard');
  await expect(
    page.getByRole('heading', { name: /life quest/i }),
  ).toBeVisible();
  await expect(page.getByText(/dashboard/i)).toBeVisible();
});
```

**Step 2: Wire Playwright to boot the app**

Set `playwright.config.ts` `webServer.command` to `pnpm dev` and `baseURL` to `http://127.0.0.1:3000`.

**Step 3: Run the test to verify RED**

Run: `pnpm test:e2e --grep "@m0"`
Expected: FAIL because `/api/health` and `/dashboard` do not exist yet

**Step 4: Record the failure**

Append the observed failure reason to `progress.md`.

### Task 4: Make the app shell and health route pass

**Files:**

- Create: `app/layout.tsx`
- Create: `app/(app)/layout.tsx`
- Create: `app/(app)/dashboard/page.tsx`
- Create: `app/api/health/route.ts`
- Create: `components/shared/app-shell.tsx`
- Create: `src/lib/errors.ts`
- Update: `app/globals.css`

**Step 1: Write the minimal implementation**

Create the page tree so `/dashboard` renders a mobile-first shell with:

- app title `Life Quest`
- subtitle containing `Dashboard`
- a responsive container that works from 375px upward

Create `GET /api/health` to return:

```typescript
{ data: { status: 'ok', app: 'life-quest', storage: 'sqlite' } }
```

Create `src/lib/errors.ts` with a minimal `AppError` base class for later milestones.

**Step 2: Run the E2E to verify GREEN**

Run: `pnpm test:e2e --grep "@m0"`
Expected: PASS for the new app-shell test

**Step 3: Refactor lightly**

Extract shared shell markup into `components/shared/app-shell.tsx` if the page becomes noisy, but do not add Milestone 1 behavior.

**Step 4: Re-run quick checks**

Run:

```bash
pnpm lint
pnpm typecheck
```

Expected: both pass

### Task 5: Add the failing database integration test

**Files:**

- Create: `tests/integration/db.client.test.ts`
- Create: `src/db/schema.ts`
- Create: `src/db/client.ts`
- Create: `src/db/seed.ts`
- Create: `src/db/migrations/.gitkeep`
- Update: `package.json`

**Step 1: Write the failing integration test**

Create `tests/integration/db.client.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { bootstrapDatabase, getDatabase } from '@/src/db/client';

describe('database bootstrap', () => {
  it('initializes sqlite pragmas and seeds one demo user', () => {
    bootstrapDatabase();
    const db = getDatabase();

    const journalMode = db.pragma('journal_mode', { simple: true });
    const foreignKeys = db.pragma('foreign_keys', { simple: true });
    const user = db
      .prepare('select display_name, theme_mode from users limit 1')
      .get();

    expect(journalMode).toBe('wal');
    expect(foreignKeys).toBe(1);
    expect(user).toMatchObject({
      display_name: 'Demo Hero',
      theme_mode: 'modern',
    });
  });
});
```

**Step 2: Run the test to verify RED**

Run: `pnpm test tests/integration/db.client.test.ts`
Expected: FAIL because DB bootstrap code does not exist yet

**Step 3: Record the failure**

Append the failure reason to `progress.md`.

### Task 6: Implement SQLite bootstrap, schema, and seed

**Files:**

- Update: `src/db/client.ts`
- Update: `src/db/schema.ts`
- Update: `src/db/seed.ts`
- Update: `drizzle.config.ts`
- Update: `progress.md`

**Step 1: Implement the DB client**

`src/db/client.ts` must:

- open SQLite from `./data/life-quest.db` by default
- execute:

```sql
PRAGMA journal_mode=WAL;
PRAGMA busy_timeout=5000;
PRAGMA foreign_keys=ON;
```

- export `bootstrapDatabase()` and `getDatabase()`

**Step 2: Implement schema and seed**

Add the `users` table definition and seed one demo user with:

- `display_name = 'Demo Hero'`
- `theme_mode = 'modern'`
- `level = 1`
- `xp = 0`
- `total_gold = 0`

**Step 3: Run the integration test to verify GREEN**

Run: `pnpm test tests/integration/db.client.test.ts`
Expected: PASS

**Step 4: Re-run the app-shell test**

Run: `pnpm test:e2e --grep "@m0"`
Expected: still PASS

### Task 7: Final Milestone 0 validation pack

**Files:**

- Update: `task_plan.md`
- Update: `progress.md`
- Create: `docs/reviews/m0-review.md`

**Step 1: Run the full validation bundle**

Run:

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm test
pnpm test:e2e --grep "@m0"
```

Expected: all commands pass

**Step 2: Capture screenshots**

Capture one screenshot at `375px` and one at `1440px` of `/dashboard`.

**Step 3: Write the review note**

Create `docs/reviews/m0-review.md` with:

- changed files
- validation results
- known risks
- recommendation on whether Milestone 0 is ready for user review

**Step 4: Update planning memory**

Mark the Milestone 0 execution phase complete in `task_plan.md` and summarize results in `progress.md`.
