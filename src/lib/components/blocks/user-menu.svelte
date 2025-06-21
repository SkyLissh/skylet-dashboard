<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";

  import ChevronDown from "~icons/lucide/chevron-down";
  import LogOut from "~icons/lucide/log-out";
  import UserIcon from "~icons/lucide/user";
  import Wrench from "~icons/lucide/wrench";

  import { auth } from "$lib/auth";
  import { DiscordProfile } from "$lib/schemas/discord-profile";

  let { user }: { user: DiscordProfile } = $props();
</script>

<DropdownMenu>
  <DropdownMenuTrigger class="flex items-center gap-2 hover:cursor-pointer">
    <img
      src={user.avatar_url}
      alt={user.name}
      class="size-10 rounded-full"
      loading="lazy"
    />
    <p class="hidden text-sm md:block">{user.name}</p>
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
