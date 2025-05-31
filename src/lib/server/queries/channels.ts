import { Routes } from "discord-api-types/v10";
import * as v from "valibot";

import { Channel } from "$lib/schemas/channel";
import { bot } from "$lib/server/discord";

export async function getChannels(guildId: string) {
  const response = await bot.get(Routes.guildChannels(guildId));

  return v.parse(v.array(Channel), response);
}
