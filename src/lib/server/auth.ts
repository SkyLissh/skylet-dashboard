import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { getRequestEvent } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: true,
    schema,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30,
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
      },
    },
  },
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      mapProfileToUser: (profile) => ({
        id: profile.id,
        name: profile.display_name ?? profile.global_name ?? profile.username,
        email: profile.email,
        username: profile.username,
        image: profile.image_url,
        emailVerified: profile.verified,
      }),
    },
  },
});

export async function getSession({
  shouldRedirect = true,
}: { shouldRedirect?: boolean } = {}) {
  const { request } = getRequestEvent();

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session && shouldRedirect) {
    const signIn = await auth.api.signInSocial({
      body: {
        provider: "discord",
        callbackURL: "/dashboard",
        scopes: [
          "identify",
          "email",
          "guilds",
          "guilds.members.read",
          "role_connections.write",
        ],
      },
    });

    if (signIn.redirect) throw redirect(302, signIn.url!);
    throw new Error("No session");
  }

  return session;
}
