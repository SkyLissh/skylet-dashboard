<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";
  import { Sheet, SheetTrigger } from "$lib/components/ui/sheet";

  import FeaturesMenu from "$lib/components/features-menu.svelte";
  import LanguageDropdown from "$lib/components/language-dropdown.svelte";
  import MainMenuSheet from "$lib/components/main-menu-sheet.svelte";

  import { auth, signIn } from "$lib/auth";

  import type { DiscordProfile } from "$lib/schemas/discord-profile";

  import ChevronDown from "~icons/lucide/chevron-down";
  import LogOut from "~icons/lucide/log-out";
  import Menu from "~icons/lucide/menu";
  import UserIcon from "~icons/lucide/user";
  import Wrench from "~icons/lucide/wrench";
  import Discord from "~icons/simple-icons/discord";

  const { user }: { user: DiscordProfile | null } = $props();
</script>

<Sheet>
  <MainMenuSheet />
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
        <LanguageDropdown class="hidden md:inline-flex" />
        <SheetTrigger class="md:hidden">
          {#snippet child({ props })}
            <Button {...props} variant="outline" size="icon">
              <Menu />
            </Button>
          {/snippet}
        </SheetTrigger>

        {#if user}
          <DropdownMenu>
            <DropdownMenuTrigger class="flex items-center gap-2 hover:cursor-pointer">
              <img
                src={user.avatar_url}
                alt={user.name}
                class="size-10 rounded-full"
                loading="lazy"
              />
              <p class="text-sm">{user.name}</p>
              <ChevronDown class="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent class="min-w-52">
              <div class="flex flex-col gap-2 p-2">
                <p>{user.name}</p>
                <span class="text-muted-foreground text-xs">
                  {m.hi({ username: `@${user.username}` })}
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon class="size-4" />
                {m.profile()}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {#snippet child({ props })}
                  <a {...props} href={localizeHref("/dashboard")}>
                    <Wrench class="size-4" />
                    {m.dashboard()}
                  </a>
                {/snippet}
              </DropdownMenuItem>
              <DropdownMenuItem onclick={() => auth.signOut()}>
                <LogOut />
                {m.logout()}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        {:else}
          <Button variant="outline" onclick={signIn}>
            <Discord />
            {m.login()}
          </Button>
        {/if}
      </ul>
    </nav>
  </header>
</Sheet>
