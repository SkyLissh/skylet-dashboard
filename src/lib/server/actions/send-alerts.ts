import { type APIEmbed, Routes } from "discord-api-types/v10";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import { twitchAlerts } from "$lib/server/db/schema/twitch-alerts";

import { bot } from "$lib/server/discord";

import { TwitchEventSub } from "$lib/schemas/twitch/twitch-eventsub";
import {
  getTwitchGame,
  getTwitchStream,
  getTwitchUser,
} from "$lib/server/queries/twitch";

export async function sendNotification(notification: TwitchEventSub) {
  const userLogin = notification.event!.broadcaster_user_login;

  const alerts = await db
    .select()
    .from(twitchAlerts)
    .where(eq(twitchAlerts.streamer, userLogin));

  if (alerts.length === 0) return;

  const user = await getTwitchUser(userLogin);
  if (!user) return;

  const stream = await getTwitchStream(userLogin);
  if (!stream) return;

  const game = await getTwitchGame(stream.game_id!);
  if (!game) return;

  const messages = alerts.map((alert) =>
    bot.post(Routes.channelMessages(alert.channelId), {
      body: {
        content: alert.message.replace("{{streamer}}", stream.user_name),
        tts: false,
        embeds: [
          {
            title: stream.title,
            author: {
              name: `${stream.user_name} is live on Twitch!`,
              url: `https://www.twitch.tv/${stream.user_login}`,
              icon_url: user.profile_image_url,
            },
            url: `https://www.twitch.tv/${stream.user_login}`,
            thumbnail: { url: game.box_art_url },
            image: {
              url: `${stream.thumbnail_url}?timestamp=${Date.now()}`,
            },
            fields: [
              { name: ":video_game: Playing", value: game.name },
              { name: ":eyes: Viewers", value: stream.viewer_count },
            ],
            footer: { text: "Started at" },
            timestamp: stream.started_at.toISOString(),
            color: 6570404,
          } as APIEmbed,
        ],
      },
    })
  );

  await Promise.allSettled(messages);
}
