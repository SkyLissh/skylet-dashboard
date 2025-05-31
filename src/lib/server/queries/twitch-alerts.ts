import { Routes } from "discord-api-types/v10";
import { and, eq } from "drizzle-orm";
import * as v from "valibot";

import { db } from "$lib/server/db";
import { twitchAlerts } from "$lib/server/db/schema/twitch-alerts";

import { bot } from "$lib/server/discord";
import { getTwitchUsers } from "$lib/server/queries/twitch";

import { Channel } from "$lib/schemas/channel";

export async function getTwitchAlerts(guildId: string) {
  const alerts = await db
    .select()
    .from(twitchAlerts)
    .where(eq(twitchAlerts.guildId, guildId));

  if (alerts.length === 0) return [];

  const twitchUsers = await getTwitchUsers(alerts.map((alert) => alert.streamer));

  if (!twitchUsers) return [];

  const response = await bot.get(Routes.guildChannels(guildId));
  const channels = v.parse(v.array(Channel), response);

  return alerts.map((alert) => ({
    ...alert,
    twitchUser: twitchUsers.find((user) => user.login === alert.streamer)!,
    channel: channels.find((channel) => channel.id === alert.channelId)!,
  }));
}

export async function getTwitchAlertById(guildId: string, alertId: string) {
  const [alert] = await db
    .select()
    .from(twitchAlerts)
    .where(and(eq(twitchAlerts.guildId, guildId), eq(twitchAlerts.id, alertId)));

  return alert;
}
