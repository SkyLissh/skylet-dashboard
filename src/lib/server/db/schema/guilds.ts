import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

import { nanoid } from "nanoid";

export const guilds = sqliteTable(
  "guilds",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    guildId: text("guild_id").notNull().unique(),
    name: text("name").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [uniqueIndex("guild_idx").on(table.guildId)]
);
