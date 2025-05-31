import crypto from "node:crypto";

import type { RequestHandler } from "./$types";

import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";

import { waitUntil } from "@vercel/functions";
import * as v from "valibot";

import { TwitchEventSub } from "$lib/schemas/twitch/twitch-eventsub";
import { TwitchMessageType } from "$lib/schemas/twitch/twitch-mesage-type";

import { sendNotification } from "$lib/server/actions/send-alerts";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.text();

  const messageId = request.headers.get("twitch-eventsub-message-id");
  const timeStamp = request.headers.get("twitch-eventsub-message-timestamp");
  const message = `${messageId}${timeStamp}${body}`;

  const signature = crypto
    .createHmac("sha256", env.TWITCH_EVENT_SUB_SECRET)
    .update(message)
    .digest("hex");
  const signatureHeader = request.headers.get("twitch-eventsub-message-signature")!;

  const verified = crypto.timingSafeEqual(
    Buffer.from(`sha256=${signature}`),
    Buffer.from(signatureHeader)
  );

  if (!verified) return json({ error: "Invalid signature" }, { status: 403 });

  const messageTypeHeader = request.headers.get("twitch-eventsub-message-type");
  const messageType = v.parse(TwitchMessageType, messageTypeHeader);
  const notification = v.parse(TwitchEventSub, JSON.parse(body));

  if (messageType === "webhook_callback_verification") {
    return new Response(notification.challenge, { status: 200 });
  }
  if (messageType === "revocation") return new Response(null, { status: 204 });
  if (messageType === "notification") {
    waitUntil(sendNotification(notification));
    return new Response(null, { status: 204 });
  }

  return json({ error: "Invalid message type" }, { status: 204 });
};
