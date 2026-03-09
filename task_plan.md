# Life Quest MVP Task Plan

## Goal

Bootstrap the standalone `life-quest` repository and deliver Milestone 0 through an executable, verifiable workflow.

## Current Phase

- [complete] Phase 0: Bootstrap the standalone repo and project planning files
- [complete] Phase 1: Write the detailed Milestone 0 implementation plan
- [complete] Phase 2: Create an isolated Milestone 0 worktree
- [complete] Phase 3: Execute the Milestone 0 implementation plan

## Milestone 0 Batch 1

- [complete] Task 1: Lock the Milestone 0 contract
- [complete] Task 2: Bootstrap the repo toolchain and config
- [complete] Task 3: Add the first failing Milestone 0 E2E
- [complete] Task 4: Make the app shell and health route pass
- [complete] Task 5: Add the failing database integration test
- [complete] Task 6: Implement SQLite bootstrap, schema, and seed
- [complete] Task 7: Final Milestone 0 validation pack

## Locked Decisions

- `life-quest` will live in a standalone repo at `/Users/kunsu/github/life-quest`.
- No nested Git repo will be created inside `.openclaw`.
- Execution starts with Milestone 0 only.
- Milestone work will follow Mobile-First and local-first SQLite requirements from the approved architecture plan.

## Errors Encountered

| Error                                                                                | Attempt | Resolution                                                                                                                      |
| ------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `session-catchup.py` was not present under the planning skill path                   | 1       | Avoided repeating the same command and created fresh planning files manually in the new repo                                    |
| `pnpm` command not found during Milestone 0 Task 2 dependency install                | 1       | Stopped batch 1 and asked the user whether to install/activate `pnpm` before continuing                                         |
| `eslint-config-next` crashes with `eslint@10.0.3` during bootstrap lint verification | 1       | Confirmed the root cause after switching to flat config; stopping for user approval before pinning ESLint to a compatible major |
| Playwright browser executable is missing for the first `@m0` red run                 | 1       | Stopped before downloading browser assets and asked the user for approval to install Playwright browsers                        |
