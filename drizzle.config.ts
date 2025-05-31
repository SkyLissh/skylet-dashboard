import { defineConfig } from "drizzle-kit";

if (!process.env.TURSO_DB_URL) throw new Error("TURSO_DB_URL is not set");
if (!process.env.TURSO_DB_AUTH_TOKEN) throw new Error("TURSO_DB_AUTH_TOKEN is not set");

export default defineConfig({
  schema: "./src/lib/server/db/schema",
  dialect: "turso",
  dbCredentials: {
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
    url: process.env.TURSO_DB_URL,
  },
  verbose: true,
  strict: true,
});
