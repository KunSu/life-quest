import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import Database from 'better-sqlite3';

import { seedDatabase } from '@/src/db/seed';

type SqliteDatabase = import('better-sqlite3').Database;

let database: SqliteDatabase | null = null;

function createUsersTable(db: SqliteDatabase) {
  db.exec(`
    create table if not exists users (
      id text primary key,
      display_name text not null,
      theme_mode text not null,
      level integer not null,
      xp integer not null,
      total_gold integer not null,
      created_at text not null,
      updated_at text not null
    );
  `);
}

function getDefaultDatabasePath() {
  if (process.env.LIFE_QUEST_DB_PATH) {
    return process.env.LIFE_QUEST_DB_PATH;
  }

  return resolve(process.cwd(), 'data', 'life-quest.db');
}

export function bootstrapDatabase() {
  if (database) {
    return database;
  }

  const databasePath = getDefaultDatabasePath();
  mkdirSync(dirname(databasePath), { recursive: true });

  database = new Database(databasePath);
  database.pragma('journal_mode = WAL');
  database.pragma('busy_timeout = 5000');
  database.pragma('foreign_keys = ON');

  createUsersTable(database);
  seedDatabase(database);

  return database;
}

export function getDatabase() {
  if (!database) {
    return bootstrapDatabase();
  }

  return database;
}
