import type { LayoutServerLoad } from "./$types";

import { getSession } from "$lib/server/auth";
import { getGuilds } from "$lib/server/queries/guilds";

export const load: LayoutServerLoad = async () => {
  const session = await getSession({ shouldRedirect: true });

  const guilds = await getGuilds(session!.user);

  return {
    guilds,
  };
};
