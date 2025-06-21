<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "$lib/components/ui/command";
  import { Popover, PopoverContent, PopoverTrigger } from "$lib/components/ui/popover";

  import ChevronsUpDown from "~icons/lucide/chevrons-up-down";

  import type { UserGuild } from "$lib/schemas/guild";

  let {
    guilds,
    onOptionSelected,
  }: { guilds: UserGuild[]; onOptionSelected?: () => void } = $props();

  let open = $state(false);

  let selectedGuild = $derived.by(() =>
    guilds.find((guild) => guild.id === page.params.guild)
  );
</script>

<Popover bind:open>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" class="w-full justify-between">
        <div class="flex items-center gap-2">
          <img
            class="size-6 rounded-full object-cover"
            src={selectedGuild?.icon_url}
            alt={selectedGuild?.name}
          />
          <span class="truncate">{selectedGuild?.name}</span>
        </div>
        <ChevronsUpDown class="size-4" />
      </Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent class="w-(--bits-popover-anchor-width) p-0">
    <Command>
      <CommandInput placeholder={m.search_server()} />
      <CommandList>
        <CommandEmpty>{m.no_results()}</CommandEmpty>
        <CommandGroup>
          {#each guilds as guild}
            <CommandItem
              class="flex items-center gap-4 text-sm text-ellipsis"
              value={guild.id}
              keywords={[guild.name, guild.name.toLowerCase()]}
              onSelect={() => {
                open = false;
                goto(localizeHref(`/dashboard/${guild.id}`));
                onOptionSelected?.();
              }}
            >
              <img
                class="size-6 rounded-full object-cover"
                src={guild.icon_url}
                alt={guild.name}
              />
              <span class="truncate">{guild.name}</span>
            </CommandItem>
          {/each}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
