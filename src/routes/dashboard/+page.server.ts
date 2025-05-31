import type { PageServerLoad } from "./$types";

import { getSession } from "$lib/server/auth";
import { getGuilds } from "$lib/server/queries/guilds";
import { getProfile } from "$lib/server/queries/profile";

export const load: PageServerLoad = async () => {
  const session = await getSession();

  const profile = await getProfile(session!.user);
  const guilds = await getGuilds(session!.user);

  return {
    profile,
    guilds,
  };
};
