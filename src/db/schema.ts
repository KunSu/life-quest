import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  displayName: text('display_name').notNull(),
  themeMode: text('theme_mode').notNull(),
  level: integer('level').notNull(),
  xp: integer('xp').notNull(),
  totalGold: integer('total_gold').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});
