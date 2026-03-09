import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('PATCH /api/user/theme', () => {
  let tempDirectory: string;
  let databasePath: string;

  beforeEach(() => {
    vi.resetModules();
    tempDirectory = mkdtempSync(join(tmpdir(), 'life-quest-theme-'));
    databasePath = join(tempDirectory, 'life-quest.db');
    process.env.LIFE_QUEST_DB_PATH = databasePath;
  });

  afterEach(() => {
    delete process.env.LIFE_QUEST_DB_PATH;
    rmSync(tempDirectory, { recursive: true, force: true });
  });

  it('persists the new theme to sqlite and sets the cookie', async () => {
    const { PATCH } = await import('@/app/api/user/theme/route');
    const { getDatabase } = await import('@/src/db/client');

    const request = new Request('http://localhost/api/user/theme', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ themeMode: 'adventure' }),
    });

    const response = await PATCH(request);
    const payload = await response.json();
    const db = getDatabase();
    const row = db
      .prepare('select theme_mode from users limit 1')
      .get() as { theme_mode: string } | undefined;

    expect(response.status).toBe(200);
    expect(payload).toEqual({ data: { themeMode: 'adventure' } });
    expect(response.headers.get('set-cookie')).toContain(
      'life-quest-theme=adventure',
    );
    expect(row?.theme_mode).toBe('adventure');
  });

  it('rejects unsupported theme values', async () => {
    const { PATCH } = await import('@/app/api/user/theme/route');

    const request = new Request('http://localhost/api/user/theme', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ themeMode: 'cyberpunk' }),
    });

    const response = await PATCH(request);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'invalid_input',
        message: 'Invalid theme payload',
      },
    });
  });
});
