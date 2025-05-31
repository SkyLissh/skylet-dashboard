import type { PageServerLoad } from "./$types";

import type { Actions } from "@sveltejs/kit";

import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

import { TwitchAlertForm } from "$lib/schemas/forms/twitch-alert-form";

import { createTwitchAlert } from "$lib/server/actions/twitch-alerts";
import { getChannels } from "$lib/server/queries/channels";

export const load: PageServerLoad = async ({ params }) => {
  const channels = await getChannels(params.guild);
  const form = await superValidate(valibot(TwitchAlertForm), {
    defaults: {
      guild: params.guild,
      twitch_user: "",
      discord_channel: "",
      alert_message: "",
      alert_id: "",
    },
  });

  return { channels, form };
};

export const actions: Actions = {
  default: (event) => createTwitchAlert(event),
};
