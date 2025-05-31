import type { PageServerLoad } from "./$types";

import { getSession } from "$lib/server/auth";
import { getChannels } from "$lib/server/queries/channels";
import { getGuild } from "$lib/server/queries/guilds";

export const load: PageServerLoad = async ({ params }) => {
  await getSession();

  const guild = await getGuild(params.guild);
  const channels = await getChannels(params.guild);

  return {
    guild,
    channels,
  };
};
