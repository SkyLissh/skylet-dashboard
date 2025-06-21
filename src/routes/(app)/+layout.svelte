<script lang="ts">
  import type { LayoutProps } from "./$types";

  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
  } from "$lib/components/ui/sheet";

  import DashboardMenu from "$lib/components/blocks/dashboard-menu.svelte";
  import LanguageDropdown from "$lib/components/blocks/language-dropdown.svelte";
  import UserMenu from "$lib/components/blocks/user-menu.svelte";

  import Menu from "~icons/lucide/menu";

  let { data, children }: LayoutProps = $props();

  let open = $state(false);
</script>

<Sheet bind:open>
  <SheetContent side="left" class="flex flex-col p-0">
    <SheetHeader>
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt={m.skylet()} class="size-10 rounded-full" />
        <p class="text-lg font-semibold tracking-wide md:text-xl">{m.skylet()}</p>
      </div>
    </SheetHeader>
    <div class="px-4">
      <DashboardMenu guilds={data.guilds} onOptionSelected={() => (open = false)} />
    </div>
    <SheetFooter class="flex flex-col gap-2 px-6 py-4">
      <Separator />
      <LanguageDropdown />
    </SheetFooter>
  </SheetContent>
  <header class="border-border border-b p-4">
    <nav class="container flex items-center justify-between ps-0 pe-0">
      <ul class="flex items-center gap-4">
        <li>
          <a href={localizeHref("/")} class="flex items-center gap-4">
            <img src="/logo.png" alt="SkyLet" class="size-10 rounded-full" />
            <p class="text-lg font-semibold tracking-wide md:text-xl">{m.skylet()}</p>
          </a>
        </li>
      </ul>
      <ul class="flex items-center gap-4">
        <li class="hidden md:inline-flex">
          <LanguageDropdown />
        </li>
        <li class="md:hidden">
          <SheetTrigger>
            {#snippet child({ props })}
              <Button {...props} variant="outline" size="icon">
                <Menu />
              </Button>
            {/snippet}
          </SheetTrigger>
        </li>
        <li>
          <UserMenu user={data.profile} />
        </li>
      </ul>
    </nav>
  </header>
</Sheet>
<main
  class="mx-auto max-w-7xl items-start px-4 py-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 md:py-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10"
>
  <aside class="sticky hidden shrink-0 overflow-y-auto md:block">
    <DashboardMenu guilds={data.guilds} />
  </aside>
  {@render children()}
</main>
