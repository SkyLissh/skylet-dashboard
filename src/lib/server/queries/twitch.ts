import * as v from "valibot";

import { fetchTwitch } from "$lib/server/fetch-twitch";

import { TwitchGame } from "$lib/schemas/twitch/twitch-game";
import { paginatedTwitchResponse } from "$lib/schemas/twitch/twitch-paginated";
import { TwitchStream } from "$lib/schemas/twitch/twitch-stream";
import { TwitchSubscription } from "$lib/schemas/twitch/twitch-subscription";
import { TwitchUser } from "$lib/schemas/twitch/twitch-user";

export async function getTwitchUser(username?: string) {
  if (!username) return null;

  const res = await fetchTwitch("/users", {
    query: {
      login: username,
    },
  });

  const { output: user, success } = v.safeParse(paginatedTwitchResponse(TwitchUser), res);

  if (!success) return null;
  if (user.data.length === 0) return null;

  return user.data[0];
}

export async function getTwitchUsers(usernames: string[]) {
  const query = usernames.map((username) => `login=${username}`).join("&");
  const res = await fetchTwitch(`/users?${query}`);

  const { output: users, success } = v.safeParse(
    paginatedTwitchResponse(TwitchUser),
    res
  );

  if (!success) return null;

  return users.data;
}

export async function getTwitchStream(username: string) {
  const res = await fetchTwitch("/streams", {
    query: { user_login: username },
  });

  const { output: stream, success } = v.safeParse(
    paginatedTwitchResponse(TwitchStream),
    res
  );

  if (!success) return null;
  if (stream.data.length === 0) return null;

  return stream.data[0];
}

export async function getTwitchGame(gameId: number) {
  const res = await fetchTwitch("/games", {
    query: { id: gameId },
  });

  const { output: game, success } = v.safeParse(paginatedTwitchResponse(TwitchGame), res);

  if (!success) return null;
  if (game.data.length === 0) return null;

  return game.data[0];
}

export async function getTwitchSubscriptions() {
  try {
    const res = await fetchTwitch("/eventsub/subscriptions");

    const { output: subscriptions, success } = v.safeParse(
      v.array(TwitchSubscription),
      res.data
    );

    if (!success) return null;

    return subscriptions;
  } catch {
    return null;
  }
}
