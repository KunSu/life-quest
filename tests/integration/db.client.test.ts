import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('database bootstrap', () => {
  let tempDirectory: string;
  let databasePath: string;

  beforeEach(() => {
    vi.resetModules();
    tempDirectory = mkdtempSync(join(tmpdir(), 'life-quest-db-'));
    databasePath = join(tempDirectory, 'life-quest.db');
    process.env.LIFE_QUEST_DB_PATH = databasePath;
  });

  afterEach(() => {
    delete process.env.LIFE_QUEST_DB_PATH;
    rmSync(tempDirectory, { force: true, recursive: true });
  });

  it('initializes sqlite pragmas and seeds exactly one demo user', async () => {
    const { bootstrapDatabase, getDatabase } = await import('@/src/db/client');

    bootstrapDatabase();
    const db = getDatabase();

    const journalMode = db.pragma('journal_mode', { simple: true });
    const busyTimeout = db.pragma('busy_timeout', { simple: true });
    const foreignKeys = db.pragma('foreign_keys', { simple: true });
    const userCount = db
      .prepare('select count(*) as count from users')
      .get() as { count: number } | undefined;
    const user = db
      .prepare('select display_name, theme_mode from users limit 1')
      .get() as { display_name: string; theme_mode: string } | undefined;

    expect(db.name).toBe(databasePath);
    expect(journalMode).toBe('wal');
    expect(busyTimeout).toBe(5000);
    expect(foreignKeys).toBe(1);
    expect(userCount?.count).toBe(1);
    expect(user).toMatchObject({
      display_name: 'Demo Hero',
      theme_mode: 'modern',
    });
  });
});
