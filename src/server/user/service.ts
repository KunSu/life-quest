import { getDatabase } from '@/src/db/client';
import type { ThemeMode } from '@/src/shared/schemas/user';

export function getDemoUserTheme(): ThemeMode {
  const db = getDatabase();
  const row = db.prepare('select theme_mode from users limit 1').get() as
    | { theme_mode: string }
    | undefined;

  return row?.theme_mode === 'adventure' ? 'adventure' : 'modern';
}

export function updateDemoUserTheme(themeMode: ThemeMode) {
  const db = getDatabase();
  const row = db.prepare('select id from users limit 1').get() as
    | { id: string }
    | undefined;

  if (!row) {
    throw new Error('Demo user missing');
  }

  db.prepare(
    `update users
      set theme_mode = @theme_mode,
          updated_at = @updated_at
      where id = @id`,
  ).run({
    id: row.id,
    theme_mode: themeMode,
    updated_at: new Date().toISOString(),
  });

  return { themeMode };
}
