<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import { Sheet, SheetTrigger } from "$lib/components/ui/sheet";

  import FeaturesMenu from "$lib/components/blocks/features-menu.svelte";
  import LanguageDropdown from "$lib/components/blocks/language-dropdown.svelte";
  import MainMenuSheet from "$lib/components/blocks/main-menu-sheet.svelte";
  import UserMenu from "$lib/components/blocks/user-menu.svelte";

  import { signIn } from "$lib/auth";

  import type { DiscordProfile } from "$lib/schemas/discord-profile";

  import Menu from "~icons/lucide/menu";
  import Discord from "~icons/simple-icons/discord";

  const { user }: { user: DiscordProfile | null } = $props();
</script>

<Sheet>
  <MainMenuSheet {user} />
  <header class="border-border border-b p-4">
    <nav class="container flex items-center justify-between ps-0 pe-0">
      <ul class="flex items-center gap-4">
        <li>
          <a href={localizeHref("/")} class="flex items-center gap-4">
            <img src="/logo.png" alt="SkyLet" class="size-10 rounded-full" />
            <p class="text-lg font-semibold tracking-wide md:text-xl">{m.skylet()}</p>
          </a>
        </li>
        <li class="hidden md:block">
          <FeaturesMenu orientation="horizontal" />
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
          {#if user}
            <UserMenu {user} />
          {:else}
            <Button class="hidden md:inline-flex" variant="outline" onclick={signIn}>
              <Discord />
              {m.login()}
            </Button>
          {/if}
        </li>
      </ul>
    </nav>
  </header>
</Sheet>
