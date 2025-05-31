import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

if (!env.TURSO_DB_URL) throw new Error("TURSO_DB_URL is not set");
if (!dev && !env.TURSO_DB_AUTH_TOKEN) throw new Error("TURSO_DB_AUTH_TOKEN is not set");

const client = createClient({
  url: env.TURSO_DB_URL,
  authToken: env.TURSO_DB_AUTH_TOKEN,
});

export const db = drizzle(client);
