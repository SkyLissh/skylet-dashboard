import type { LayoutServerLoad } from "./$types";

import { getSession } from "$lib/server/auth";
import { getGuilds } from "$lib/server/queries/guilds";
import { getProfile } from "$lib/server/queries/profile";

export const load: LayoutServerLoad = async () => {
  const session = await getSession();

  const guilds = await getGuilds(session!.user);
  const profile = await getProfile(session!.user);

  return {
    guilds,
    profile,
  };
};
