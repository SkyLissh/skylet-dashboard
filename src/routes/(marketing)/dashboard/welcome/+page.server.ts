import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { getSession } from "$lib/server/auth";

export const load: PageServerLoad = async () => {
  const session = await getSession({ shouldRedirect: false });

  if (session) redirect(308, "/dashboard");
};
