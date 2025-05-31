import type { Actions, PageServerLoad } from "./$types";

import { QueryClient } from "@tanstack/svelte-query";
import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

import { TwitchAlertForm } from "$lib/schemas/forms/twitch-alert-form";

import { updateTwitchAlert } from "$lib/server/actions/twitch-alerts";
import { getChannels } from "$lib/server/queries/channels";
import { getTwitchUser } from "$lib/server/queries/twitch";
import { getTwitchAlertById } from "$lib/server/queries/twitch-alerts";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { queryClient } = await parent();

  const channels = await getChannels(params.guild!);
  const alert = await getTwitchAlertById(params.guild, params.alertId);
  const initialData: TwitchAlertForm = {
    guild: params.guild,
    twitch_user: alert.streamer,
    discord_channel: alert.channelId,
    alert_message: alert.message,
    alert_id: alert.id,
  };

  const form = await superValidate(initialData, valibot(TwitchAlertForm));

  const data = await (queryClient as QueryClient).fetchQuery({
    queryKey: ["twitch-user", alert.streamer],
    queryFn: () => getTwitchUser(alert.streamer),
  });

  return { channels, form, streamer: data };
};

export const actions: Actions = {
  default: (event) => updateTwitchAlert(event),
};
