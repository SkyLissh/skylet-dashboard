import type { PageServerLoad } from "./$types";

import { getTwitchAlerts } from "$lib/server/queries/twitch-alerts";

export const load: PageServerLoad = async ({ params, depends }) => {
  const alerts = await getTwitchAlerts(params.guild);

  depends("alerts:twitch");

  return { alerts };
};
