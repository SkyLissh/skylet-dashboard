<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

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
  import Home from "~icons/lucide/house";
  import Twitch from "~icons/simple-icons/twitch";

  let { data, children }: LayoutProps = $props();

  let selectedGuild = $derived.by(() =>
    data.guilds.find((guild) => guild.id === page.params.guild)
  );

  const socialMedia = [
    {
      label: "Twitch",
      icon: Twitch,
    },
  ];
</script>

<main
  class="mx-auto max-w-7xl items-start px-4 py-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10"
>
  <aside class="sticky hidden shrink-0 overflow-y-auto lg:block">
    <ul class="flex flex-col gap-4">
      <li>
        <Popover>
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
                  {#each data.guilds as guild}
                    <CommandItem
                      class="flex items-center gap-4 text-sm text-ellipsis"
                      value={guild.id}
                      keywords={[guild.name, guild.name.toLowerCase()]}
                      onselect={(value) => {
                        goto(localizeHref(`/dashboard/${value}`));
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
      </li>
      <li class="space-y-2">
        <p class="text-foreground/60 text-sm font-medium">{m.main()}</p>
        <ul class="flex flex-col gap-2">
          <li>
            <Button
              variant="ghost"
              class="w-full justify-start"
              href={localizeHref(`/dashboard/${page.params.guild}`)}
            >
              <Home />
              <span class="text-sm font-normal">{m.server()}</span>
            </Button>
          </li>
        </ul>
      </li>
      <li class="space-y-2">
        <p class="text-foreground/60 text-sm font-medium">{m.social_alerts()}</p>
        <ul class="flex flex-col gap-2">
          {#each socialMedia as item}
            <li>
              <Button
                variant="ghost"
                class="w-full justify-start"
                href={localizeHref(
                  `/dashboard/${page.params.guild}/${item.label.toLowerCase()}`
                )}
              >
                <item.icon />
                <span class="text-sm font-normal">{item.label}</span>
              </Button>
            </li>
          {/each}
        </ul>
      </li>
    </ul>
  </aside>
  {@render children()}
</main>
