<script lang="ts">
  import type { PageProps } from "./$types";

  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { InputIcon } from "$lib/components/ui/input-icon";

  import { removeDiacritics } from "$lib/utils";

  import Crown from "~icons/lucide/crown";
  import Search from "~icons/lucide/search";
  import Shield from "~icons/lucide/shield";

  let { data }: PageProps = $props();

  let search = $state("");
  let filteredGuilds = $derived.by(() => {
    return data.guilds.filter((guild) => {
      const name = removeDiacritics(guild.name.toLocaleLowerCase());
      const query = removeDiacritics(search.toLocaleLowerCase());

      return name.includes(query);
    });
  });
</script>

<main class="mx-auto flex max-w-7xl flex-col gap-12 py-20">
  <div class="flex items-center gap-4">
    <img
      src={data.profile.avatar_url}
      alt={data.profile.name}
      class="size-12 rounded-full"
      loading="lazy"
    />
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold">
        {m.user_servers({ username: data.profile.name })}
      </h1>
      <p class="text-sm">{m.choose_manage_server()}</p>
    </div>
  </div>
  <div class="relative">
    <Input
      bind:value={search}
      class="peer py-6 ps-9"
      type="search"
      placeholder={m.search_server()}
    />

    <InputIcon>
      <Search class="size-5" />
    </InputIcon>
  </div>
  <ul class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
    {#each filteredGuilds as guild}
      <li>
        <article class="border-border bg-card text-card-foreground rounded-2xl border">
          <div class="relative h-20 w-full overflow-hidden rounded-t-2xl bg-zinc-400">
            <img
              src={guild.icon_url}
              alt={guild.name}
              class="absolute top-0 left-0 size-full object-cover brightness-[0.45]"
              loading="lazy"
            />
            <div class="size-full backdrop-blur-md"></div>
          </div>
          <div class="bg-card relative z-10 flex flex-col items-center rounded-b-2xl p-4">
            <div class="relative -mt-16 mb-3 size-16 rounded-full">
              <img
                src={guild.icon_url}
                alt={guild.name}
                class="ring-primary size-16 rounded-full ring-4"
                loading="lazy"
              />
            </div>
            <div class="flex w-full items-center justify-between space-x-4 px-2">
              <div class="min-w-0 flex-1 space-y-2">
                <p class="truncate text-sm">{guild.name}</p>
                <span class="text-muted-foreground flex items-center gap-1 text-sm">
                  {#if guild.owner}
                    <Crown class="size-4 text-yellow-500" />
                    <span class="text-primary">{m.owner()}</span>
                  {:else}
                    <Shield class="size-4" />
                    <span class="text-primary">{m.admin()}</span>
                  {/if}
                </span>
              </div>
              <Button
                href={localizeHref(`/dashboard/${guild.id}`)}
                variant="secondary"
                class="px-6"
              >
                {m.go()}
              </Button>
            </div>
          </div>
        </article>
      </li>
    {/each}
  </ul>
</main>
