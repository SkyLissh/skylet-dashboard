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
  import { Dialog, DialogTrigger } from "$lib/components/ui/dialog";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";

  import DeleteServiceAlert from "$lib/components/blocks/alerts/delete-service-alert.svelte";

  import Ellipsis from "~icons/lucide/ellipsis";
  import Pencil from "~icons/lucide/pencil";
  import Trash from "~icons/lucide/trash";

  let { data }: PageProps = $props();

  let open = $state(false);
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
              <Dialog bind:open>
                <div
                  class="bg-background border-border flex items-center gap-4 rounded-lg border p-2 md:p-4"
                >
                  <img
                    src={alert.twitchUser.profile_image_url}
                    alt={alert.twitchUser.display_name}
                    class="bg-card size-12 rounded-full"
                  />
                  <div class="flex flex-col gap-2">
                    <p class="truncate font-semibold">{alert.twitchUser.display_name}</p>
                    <p class="truncate text-xs">{alert.channel.name}</p>
                  </div>
                  <div class="ml-auto hidden items-center gap-4 md:flex">
                    <Button
                      aria-label={m.edit()}
                      href={localizeHref(
                        `/dashboard/${page.params.guild}/twitch/edit/${alert.id}`
                      )}
                      size="icon"
                      variant="secondary"
                    >
                      <Pencil />
                    </Button>
                    <DialogTrigger>
                      {#snippet child({ props })}
                        <Button
                          {...props}
                          aria-label={m.delete()}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash />
                        </Button>
                      {/snippet}
                    </DialogTrigger>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {#snippet child({ props })}
                        <Button
                          {...props}
                          aria-label={m.alert_options()}
                          size="icon"
                          variant="ghost"
                          class="ml-auto md:hidden"
                        >
                          <Ellipsis />
                        </Button>
                      {/snippet}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          {#snippet child({ props })}
                            <Button
                              {...props}
                              variant="ghost"
                              size="sm"
                              class="w-full justify-start"
                              href={localizeHref(
                                `/dashboard/${page.params.guild}/twitch/edit/${alert.id}`
                              )}
                            >
                              <Pencil />
                              {m.edit()}
                            </Button>
                          {/snippet}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {#snippet child({ props })}
                            <DialogTrigger {...props}>
                              {#snippet child({ props })}
                                <Button
                                  {...props}
                                  size="sm"
                                  variant="ghost-destructive"
                                  class="w-full justify-start"
                                >
                                  <Trash />
                                  {m.delete()}
                                </Button>
                              {/snippet}
                            </DialogTrigger>
                          {/snippet}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <DeleteServiceAlert
                  service={alert.twitchUser.display_name}
                  alertId={alert.id}
                  onSuccess={() => (open = false)}
                  onCancel={() => (open = false)}
                />
              </Dialog>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="flex min-h-64 flex-col items-center justify-center gap-6">
          <p class="text-muted-foreground text-center">
            {m.no_alerts_yet({ service: "Twitch" })}
          </p>
          <Button href={localizeHref(`/dashboard/${page.params.guild}/twitch/create`)}>
            {m.add_alert({ service: "Twitch" })}
          </Button>
        </div>
      {/if}
    </CardContent>
    {#if data.alerts.length != 0}
      <CardFooter class="gap-2 md:justify-end">
        <Button
          class="w-full md:w-auto"
          href={localizeHref(`/dashboard/${page.params.guild}/twitch/create`)}
        >
          {m.add_alert({ service: "Twitch" })}
        </Button>
      </CardFooter>
    {/if}
  </Card>
</section>
