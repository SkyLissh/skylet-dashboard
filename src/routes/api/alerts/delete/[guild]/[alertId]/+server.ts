import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { eq } from "drizzle-orm";
import { setFlash } from "sveltekit-flash-message/server";

import { m } from "$lib/paraglide/messages";

import { db } from "$lib/server/db";
import { twitchAlerts } from "$lib/server/db/schema/twitch-alerts";

export const POST: RequestHandler = async ({ cookies, params }) => {
  if (!params.alertId || !params.guild) {
    setFlash({ type: "error", message: m.some_error_occurred() }, cookies);
    return error(400, m.some_error_occurred());
  }

  await db.delete(twitchAlerts).where(eq(twitchAlerts.id, params.alertId));

  setFlash(
    { type: "success", message: m.service_alert_deleted({ service: "Twitch" }) },
    cookies
  );

  return new Response(null, { status: 204 });
};
