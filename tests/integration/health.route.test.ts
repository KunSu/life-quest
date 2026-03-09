import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('health route', () => {
  let tempDirectory: string;
  let databasePath: string;

  beforeEach(() => {
    vi.resetModules();
    tempDirectory = mkdtempSync(join(tmpdir(), 'life-quest-health-'));
    databasePath = join(tempDirectory, 'life-quest.db');
    process.env.LIFE_QUEST_DB_PATH = databasePath;
  });

  afterEach(() => {
    delete process.env.LIFE_QUEST_DB_PATH;
    rmSync(tempDirectory, { force: true, recursive: true });
  });

  it('bootstraps the database before returning health', async () => {
    const { GET } = await import('@/app/api/health/route');

    const response = GET();

    expect(await response.json()).toEqual({
      data: {
        status: 'ok',
        app: 'life-quest',
        storage: 'sqlite',
      },
    });
    expect(existsSync(databasePath)).toBe(true);
  });

  it('returns 500 when database bootstrap fails', async () => {
    vi.doMock('@/src/db/client', () => ({
      bootstrapDatabase: () => {
        throw new Error('sqlite unavailable');
      },
    }));

    const { GET } = await import('@/app/api/health/route');
    const response = GET();

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      error: {
        code: 'internal_error',
        message: 'Internal server error',
      },
    });
  });
});
