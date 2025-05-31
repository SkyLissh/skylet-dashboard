import { fail, type RequestEvent } from "@sveltejs/kit";

import { and, eq } from "drizzle-orm";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

import { m } from "$lib/paraglide/messages";

import { db } from "$lib/server/db";
import { twitchAlerts } from "$lib/server/db/schema/twitch-alerts";

import { subscribeTwitchEvent } from "$lib/server/actions/twitch";
import { getTwitchSubscriptions, getTwitchUser } from "$lib/server/queries/twitch";

import { TwitchAlertForm } from "$lib/schemas/forms/twitch-alert-form";

export async function createTwitchAlert({ request, cookies }: RequestEvent) {
  const formData = await request.formData();
  const form = await superValidate(formData, valibot(TwitchAlertForm));

  if (!form.valid) {
    return fail(400, { form });
  }

  const streamer = await getTwitchUser(form.data.twitch_user);

  if (!streamer) {
    setFlash({ type: "error", message: m.should_add_twitch_channel() }, cookies);
    return fail(400, { form });
  }

  const [alert] = await db
    .select()
    .from(twitchAlerts)
    .where(
      and(
        eq(twitchAlerts.streamer, form.data.twitch_user),
        eq(twitchAlerts.guildId, form.data.guild)
      )
    )
    .limit(1);

  if (alert) {
    setFlash({ type: "warning", message: m.alert_already_exists() }, cookies);
    return fail(400, { form });
  }

  const subscriptions = await getTwitchSubscriptions();
  const subscriptionExists = subscriptions?.find(
    (sub) => Number(sub.condition.broadcaster_user_id) === streamer.id
  );

  if (!subscriptionExists) {
    const eventsub = await subscribeTwitchEvent(streamer.login);

    if (
      eventsub.message !== "subscription created" &&
      eventsub.message !== "subscription already exists"
    ) {
      setFlash({ type: "error", message: m.some_error_occurred() }, cookies);
      return fail(400, { form });
    }
  }

  await db
    .insert(twitchAlerts)
    .values({
      channelId: form.data.discord_channel,
      streamer: form.data.twitch_user,
      message: form.data.alert_message,
      guildId: form.data.guild,
    })
    .returning();

  redirect(
    `/dashboard/${form.data.guild}/twitch`,
    {
      type: "success",
      message: m.alert_created({ streamer: streamer.display_name }),
      description: m.alert_created_desc(),
    },
    cookies
  );
}

export async function updateTwitchAlert({ request, cookies }: RequestEvent) {
  const formData = await request.formData();
  const form = await superValidate(formData, valibot(TwitchAlertForm));

  if (!form.valid) {
    return fail(400, { form });
  }

  const streamer = await getTwitchUser(form.data.twitch_user);

  if (!streamer) {
    setFlash({ type: "error", message: m.should_add_twitch_channel() }, cookies);
    return fail(400, { form });
  }

  const subscriptions = await getTwitchSubscriptions();
  const subscriptionExists = subscriptions?.find(
    (sub) => Number(sub.condition.broadcaster_user_id) === streamer.id
  );

  if (!subscriptionExists) {
    const eventsub = await subscribeTwitchEvent(streamer.login);

    if (
      eventsub.message !== "subscription created" &&
      eventsub.message !== "subscription already exists"
    ) {
      setFlash({ type: "error", message: m.some_error_occurred() }, cookies);
      return fail(400, { form });
    }
  }

  const [alertUpdated] = await db
    .update(twitchAlerts)
    .set({
      channelId: form.data.discord_channel,
      streamer: form.data.twitch_user,
      message: form.data.alert_message,
    })
    .where(eq(twitchAlerts.id, form.data.alert_id!))
    .returning();

  redirect(
    `/dashboard/${alertUpdated.guildId}/twitch`,
    {
      type: "success",
      message: m.alert_updated({ streamer: streamer.display_name }),
    },
    cookies
  );
}
