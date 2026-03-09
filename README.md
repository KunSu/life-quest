# Life Quest

Life Quest MVP repository built with Next.js, SQLite (`better-sqlite3`), and Drizzle.

## Prerequisites

- Node.js 20+
- pnpm 10+

## Setup

```bash
pnpm install
```

## Run Locally

```bash
pnpm dev
```

Default app URL: `http://127.0.0.1:3000`

## Test Ports

- App dev server default: `3000`
- Playwright default base URL: `http://127.0.0.1:3100` (managed by `playwright.config.ts`)
- Override Playwright target with `PLAYWRIGHT_TEST_BASE_URL`

## Validation Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e --grep "@m0"
```

## Manual Testing

1. Start dev server:

   ```bash
   pnpm dev
   ```

2. Verify API health:
   - Open `http://127.0.0.1:3000/api/health`
   - Expect:

     ```json
     { "data": { "status": "ok", "app": "life-quest", "storage": "sqlite" } }
     ```

3. Verify dashboard shell:
   - Open `http://127.0.0.1:3000/dashboard`
   - Confirm heading `Life Quest` and supporting copy `Dashboard`
   - Check mobile width (`375px`) has no horizontal overflow
   - Check desktop width (`1440px`) remains readable
