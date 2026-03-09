import { ulid } from 'ulid';

type SqliteDatabase = import('better-sqlite3').Database;

export function seedDatabase(db: SqliteDatabase) {
  const existingUser = db
    .prepare('select count(*) as count from users')
    .get() as { count: number } | undefined;

  if ((existingUser?.count ?? 0) > 0) {
    return;
  }

  const now = new Date().toISOString();

  db.prepare(
    `insert into users (
      id,
      display_name,
      theme_mode,
      level,
      xp,
      total_gold,
      created_at,
      updated_at
    ) values (
      @id,
      @display_name,
      @theme_mode,
      @level,
      @xp,
      @total_gold,
      @created_at,
      @updated_at
    )`,
  ).run({
    id: ulid(),
    display_name: 'Demo Hero',
    theme_mode: 'modern',
    level: 1,
    xp: 0,
    total_gold: 0,
    created_at: now,
    updated_at: now,
  });
}
