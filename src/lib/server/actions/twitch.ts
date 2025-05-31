import { env } from "$env/dynamic/private";
import { FetchError } from "ofetch";
import * as v from "valibot";

import { TwitchEventSubCreated } from "$lib/schemas/twitch/twitch-eventsub-created";
import type { TwitchSubscription } from "$lib/schemas/twitch/twitch-subscription";
import { fetchTwitch } from "$lib/server/fetch-twitch";
import { getTwitchUser } from "$lib/server/queries/twitch";

export async function subscribeTwitchEvent(streamer: string) {
  const user = await getTwitchUser(streamer);

  if (!user) return { message: "user not found" };

  try {
    const res = await fetchTwitch("/eventsub/subscriptions", {
      method: "POST",
      body: JSON.stringify({
        type: "stream.online",
        version: "1",
        condition: {
          broadcaster_user_id: `${user.id}`,
        },
        transport: {
          method: "webhook",
          callback: env.TWITCH_EVENT_SUB_CALLBACK,
          secret: env.TWITCH_EVENT_SUB_SECRET,
        },
      }),
    });

    const { success } = v.safeParse(TwitchEventSubCreated, res);

    if (!success) return { message: "parsing failed" };

    return { message: "subscription created" };
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 409) return { message: "subscription already exists" };
    }
    return { message: "some error occurred" };
  }
}

export async function unsubscribeTwitchEvent(subscriptionId: string) {
  try {
    const res = await fetchTwitch.raw("/eventsub/subscriptions", {
      method: "DELETE",
      query: {
        id: subscriptionId,
      },
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function unsubscribeAllTwitchEvents(subscriptions: TwitchSubscription[]) {
  if (!subscriptions) return false;

  for (const subscription of subscriptions) {
    await unsubscribeTwitchEvent(subscription.id);
  }

  return true;
}
