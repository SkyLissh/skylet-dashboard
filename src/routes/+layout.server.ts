import { browser } from "$app/environment";
import type { LayoutServerLoad } from "./$types";

import { QueryClient } from "@tanstack/svelte-query";
import { loadFlash } from "sveltekit-flash-message/server";

export const load: LayoutServerLoad = loadFlash(async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        refetchOnWindowFocus: false,
      },
    },
  });

  return { queryClient };
});
