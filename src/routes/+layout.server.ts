import { browser } from "$app/environment";
import type { LayoutServerLoad } from "./$types";

import { QueryClient } from "@tanstack/svelte-query";
import { loadFlash } from "sveltekit-flash-message/server";

import { getSession } from "$lib/server/auth";
import { getProfile } from "$lib/server/queries/profile";

export const load: LayoutServerLoad = loadFlash(async () => {
  const session = await getSession({ shouldRedirect: false });

  if (!session) {
    return {
      profile: null,
    };
  }

  const profile = await getProfile(session.user);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        refetchOnWindowFocus: false,
      },
    },
  });

  return {
    profile,
    queryClient,
  };
});
