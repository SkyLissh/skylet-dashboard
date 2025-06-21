import type { LayoutServerLoad } from "./$types";

import { getSession } from "$lib/server/auth";
import { getProfile } from "$lib/server/queries/profile";

export const load: LayoutServerLoad = async () => {
  const session = await getSession({ shouldRedirect: false });

  if (!session) {
    return {
      profile: null,
    };
  }

  const profile = await getProfile(session.user);

  return { profile };
};
