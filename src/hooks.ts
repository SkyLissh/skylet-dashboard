import { deLocalizeUrl } from "$lib/paraglide/runtime";
import type { Transport } from "@sveltejs/kit";

import { QueryClient } from "@tanstack/svelte-query";

export const reroute = (request) => deLocalizeUrl(request.url).pathname;

export const transport: Transport = {
  QueryClient: {
    encode: (value) => value instanceof QueryClient && value.getDefaultOptions(),
    decode: (value) => new QueryClient({ defaultOptions: value }),
  },
};
