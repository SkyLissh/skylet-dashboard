import type { User } from "better-auth";
import { Routes } from "discord-api-types/v10";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "$lib/server/db";
import { accounts } from "$lib/server/db/schema/auth";
import { discord } from "$lib/server/discord";

import { DiscordProfile } from "$lib/schemas/discord-profile";

export async function getProfile(user: User) {
  const [account] = await db.select().from(accounts).where(eq(accounts.userId, user.id));

  if (!account) throw new Error("Account not found");

  const profile = await discord(account.accessToken!).get(Routes.user());

  return v.parse(DiscordProfile, profile);
}
