<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { debounce } from "es-toolkit/function";
  import { ofetch } from "ofetch";

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

  import type { TwitchUser } from "$lib/schemas/twitch/twitch-user";
  import { derived, writable } from "svelte/store";

  let {
    value = $bindable(""),
    initialUser,
  }: { value: string; initialUser?: TwitchUser } = $props();

  let open = $state(false);
  let search = writable(value);
  let selectedUser = $state<TwitchUser | null>(initialUser ?? null);

  const query = createQuery(
    derived(search, ($search) => ({
      queryKey: ["twitch-user", $search],
      queryFn: () =>
        ofetch<TwitchUser>("/api/twitch-user", { params: { username: $search } }),
      enabled: $search.length > 0,
    }))
  );

  const updateSearch = debounce((value: string) => {
    $search = value;
  }, 500);
</script>

<Popover bind:open>
  <Form.Control>
    {#snippet children({ props })}
      <PopoverTrigger {...props}>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            class="bg-background w-full justify-between"
          >
            {#if selectedUser}
              <div class="flex items-center gap-2">
                <img
                  class="size-8 rounded-full object-cover"
                  src={selectedUser?.profile_image_url}
                  alt={selectedUser?.display_name}
                />
                <span class="truncate">{selectedUser?.display_name}</span>
              </div>
            {:else}
              {m.search_twitch_channel()}
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
      <CommandInput
        value={$search}
        oninput={(event) => updateSearch(event.currentTarget.value)}
        placeholder={m.write_to_search()}
      />
      <CommandList>
        <CommandEmpty>
          {#if $query.isLoading}
            {m.searching_twitch_channel()}
          {:else}
            {m.no_results()}
          {/if}
        </CommandEmpty>
        <CommandGroup>
          {#if $query.data}
            <CommandItem
              class="flex items-center gap-4 text-sm text-ellipsis"
              value={$query.data.login}
              onSelect={() => {
                open = false;
                selectedUser = $query.data;
                value = $query.data.login;
              }}
            >
              <img
                class="size-6 rounded-full object-cover"
                src={$query.data.profile_image_url}
                alt={$query.data.display_name}
              />
              <span class="truncate">{$query.data.display_name}</span>
            </CommandItem>
          {/if}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
