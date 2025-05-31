import type { User } from "better-auth";
import { PermissionFlagsBits, Routes } from "discord-api-types/v10";
import { eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "$lib/server/db";
import { accounts } from "$lib/server/db/schema/auth";
import { bot, discord } from "$lib/server/discord";

import { Guild, UserGuild } from "$lib/schemas/guild";

export async function getGuilds(user: User) {
  const [account] = await db.select().from(accounts).where(eq(accounts.userId, user.id));

  if (!account) throw new Error("Account not found");

  const response = await discord(account.accessToken!).get(Routes.userGuilds());
  const botResponse = await bot.get(Routes.userGuilds());

  const guilds = v.parse(v.array(UserGuild), response);

  const botGuilds = v.parse(v.array(UserGuild), botResponse);

  const adminGuilds = guilds.filter(
    (guild) => BigInt(guild.permissions) & PermissionFlagsBits.Administrator
  );

  return adminGuilds.filter((guild) =>
    botGuilds.some((botGuild) => botGuild.id === guild.id)
  );
}

export async function getGuild(guildId: string) {
  const response = await bot.get(Routes.guild(guildId), {
    query: new URLSearchParams({
      with_counts: "true",
    }),
  });

  return v.parse(Guild, response);
}
