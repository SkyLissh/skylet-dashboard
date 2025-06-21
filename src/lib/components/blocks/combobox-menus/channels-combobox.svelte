<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { Button } from "$lib/components/ui/button";
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "$lib/components/ui/command";
  import * as Form from "$lib/components/ui/form";
  import { Popover, PopoverContent, PopoverTrigger } from "$lib/components/ui/popover";

  import ChevronsUpDown from "~icons/lucide/chevrons-up-down";

  import type { Channel } from "$lib/schemas/channel";
  import { ChannelType } from "discord-api-types/v10";

  let { channels, value = $bindable("") }: { channels: Channel[]; value: string } =
    $props();

  let open = $state(false);

  let selectedChannel = $derived.by(() =>
    channels.find((channel) => channel.id === value)
  );
</script>

<Popover bind:open>
  <Form.Control>
    {#snippet children({ props })}
      <PopoverTrigger {...props} role="combobox">
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            class="bg-background w-full justify-between"
          >
            {#if selectedChannel}
              {selectedChannel.name}
            {:else}
              {m.select_channel()}
            {/if}
            <ChevronsUpDown class="size-4" />
          </Button>
        {/snippet}
      </PopoverTrigger>
      <input hidden {value} name={props.name} />
    {/snippet}
  </Form.Control>
  <PopoverContent class="w-(--bits-popover-anchor-width) p-0">
    <Command>
      <CommandInput placeholder={m.search_server()} />
      <CommandList>
        <CommandEmpty>{m.no_results()}</CommandEmpty>
        <CommandGroup>
          {#each channels as channel}
            <CommandItem
              class="flex items-center gap-4 text-sm text-ellipsis"
              value={channel.id}
              keywords={[channel.name, channel.name.toLowerCase()]}
              onSelect={() => {
                value = channel.id;
                open = false;
              }}
            >
              <span class="truncate">{channel.name}</span>

              <span class="text-muted-foreground truncate text-xs uppercase">
                {#if channel.type === ChannelType.GuildText}
                  {m.text_channel()}
                {:else if channel.type === ChannelType.GuildVoice}
                  {m.voice_channel()}
                {:else if channel.type === ChannelType.GuildAnnouncement}
                  {m.announcement_channel()}
                {/if}
              </span>
            </CommandItem>
          {/each}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
