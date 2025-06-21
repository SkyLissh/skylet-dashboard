<script lang="ts">
  import "@fontsource/poppins/300.css";
  import "@fontsource/poppins/400.css";
  import "@fontsource/poppins/500.css";
  import "@fontsource/poppins/600.css";
  import "@fontsource/poppins/700.css";
  import "../app.css";

  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
  import { toast } from "svelte-sonner";
  import { getFlash } from "sveltekit-flash-message";

  import { m } from "$lib/paraglide/messages";

  import { Toaster } from "$lib/components/ui/sonner";

  let { children, data }: LayoutProps = $props();
  const flash = getFlash(page);

  $effect(() => {
    if (!$flash) return;

    if ($flash.type === "error") {
      toast.error($flash.message, { description: $flash.description });
    }

    if ($flash.type === "warning") {
      toast.warning($flash.message, { description: $flash.description });
    }

    if ($flash.type === "success") {
      toast.success($flash.message, { description: $flash.description });
    }

    if ($flash.type === "info") {
      toast.info($flash.message, { description: $flash.description });
    }

    $flash = undefined;
  });
</script>

<svelte:head>
  <title>
    {m.skylet()} - {m.slogan()}
  </title>
  <meta name="description" content={m.meta_description()} />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
  <Toaster richColors />
  {@render children()}
  <SvelteQueryDevtools />
</QueryClientProvider>
