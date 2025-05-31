import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";

import { paraglideMiddleware } from "$lib/paraglide/server";
import { auth } from "$lib/server/auth";

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale),
    });
  });

const handleAuth: Handle = ({ event, resolve }) =>
  svelteKitHandler({ event, resolve, auth });

export const handle: Handle = sequence(handleParaglide, handleAuth);
