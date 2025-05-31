<script lang="ts">
  import { page } from "$app/state";
  import type { PageProps } from "./$types";

  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";

  import DeleteServiceAlert from "$lib/components/delete-service-alert.svelte";

  import Pencil from "~icons/lucide/pencil";

  let { data }: PageProps = $props();
</script>

<section>
  <Card>
    <CardHeader>
      <CardTitle>{m.twitch_alerts()}</CardTitle>
      <CardDescription>{m.twitch_alerts_description()}</CardDescription>
    </CardHeader>
    <CardContent>
      {#if data.alerts.length != 0}
        <ul class="flex min-h-64 flex-col gap-4">
          {#each data.alerts as alert}
            <li>
              <div
                class="bg-background border-border flex items-center gap-4 rounded-lg border p-4"
              >
                <img
                  src={alert.twitchUser.profile_image_url}
                  alt={alert.twitchUser.display_name}
                  class="bg-card size-12 rounded-full"
                />
                <div class="flex flex-col gap-2">
                  <p class="font-semibold">{alert.twitchUser.display_name}</p>
                  <p class="text-xs">{alert.channel.name}</p>
                </div>
                <div class="ml-auto flex items-center gap-4">
                  <Button
                    href={localizeHref(
                      `/dashboard/${page.params.guild}/twitch/edit/${alert.id}`
                    )}
                    size="icon"
                    variant="secondary"
                  >
                    <Pencil />
                  </Button>
                  <DeleteServiceAlert service="twitch" alertId={alert.id} />
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="flex min-h-64 flex-col items-center justify-center gap-6">
          <p class="text-muted-foreground">
            {m.no_alerts_yet({ service: "Twitch" })}
          </p>
          <Button href={localizeHref(`/dashboard/${page.params.guild}/twitch/create`)}>
            {m.add_alert({ service: "Twitch" })}
          </Button>
        </div>
      {/if}
    </CardContent>
    {#if data.alerts.length != 0}
      <CardFooter class="justify-end gap-2">
        <Button href={localizeHref(`/dashboard/${page.params.guild}/twitch/create`)}>
          {m.add_alert({ service: "Twitch" })}
        </Button>
      </CardFooter>
    {/if}
  </Card>
</section>
