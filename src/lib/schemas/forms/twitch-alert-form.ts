import * as v from "valibot";

import { m } from "$lib/paraglide/messages";

export const TwitchAlertForm = v.object({
  twitch_user: v.string(m.should_add_twitch_channel()),
  discord_channel: v.string(m.should_select_discord_channel()),
  alert_message: v.pipe(
    v.string(m.alert_message_required()),
    v.minLength(1),
    v.maxLength(2000)
  ),
  guild: v.string(),
  alert_id: v.string(),
});

export type TwitchAlertForm = v.InferOutput<typeof TwitchAlertForm>;

export type TwitchAlertFormInput = v.InferInput<typeof TwitchAlertForm>;
