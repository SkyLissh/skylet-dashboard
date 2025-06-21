<script lang="ts">
  import { page } from "$app/state";

  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "$lib/components/ui/collapsible";

  import GuildCombobox from "./combobox-menus/guild-combobox.svelte";

  import ChevronDown from "~icons/lucide/chevron-down";
  import Home from "~icons/lucide/house";
  import Twitch from "~icons/simple-icons/twitch";

  import { UserGuild } from "$lib/schemas/guild";

  let {
    guilds,
    onOptionSelected,
  }: { guilds: UserGuild[]; onOptionSelected?: () => void } = $props();

  const socialMedia = [
    {
      label: "Twitch",
      icon: Twitch,
    },
  ];
</script>

<ul class="flex flex-col gap-4">
  <li>
    <GuildCombobox {onOptionSelected} {guilds} />
  </li>
  <li>
    <Collapsible open={true} class="space-y-1">
      <CollapsibleTrigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="ghost"
            class="group text-foreground/60 w-full justify-between p-2 text-sm"
          >
            {m.main()}
            <ChevronDown
              class="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
          </Button>
        {/snippet}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul class="flex flex-col gap-2 pl-2">
          <li>
            <Button
              variant="ghost"
              class="w-full justify-start"
              href={localizeHref(`/dashboard/${page.params.guild}`)}
              onclick={onOptionSelected}
            >
              <Home />
              <span class="text-sm font-normal">{m.server()}</span>
            </Button>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  </li>
  <li>
    <Collapsible open={true} class="space-y-1">
      <CollapsibleTrigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="ghost"
            class="group text-foreground/60 w-full justify-between p-2 text-sm"
          >
            {m.social_alerts()}
            <ChevronDown
              class="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
          </Button>
        {/snippet}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul class="flex flex-col gap-2 pl-2">
          {#each socialMedia as item}
            <li>
              <Button
                variant="ghost"
                class="w-full justify-start"
                href={localizeHref(
                  `/dashboard/${page.params.guild}/${item.label.toLowerCase()}`
                )}
                onclick={onOptionSelected}
              >
                <item.icon />
                <span class="text-sm font-normal">{item.label}</span>
              </Button>
            </li>
          {/each}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  </li>
</ul>
