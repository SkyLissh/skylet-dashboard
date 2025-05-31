import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { getTwitchUser } from "$lib/server/queries/twitch";

export const GET: RequestHandler = async ({ url }) => {
  const user = await getTwitchUser(url.searchParams.get("username") ?? "");

  return json(user);
};
