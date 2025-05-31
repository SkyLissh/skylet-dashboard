<script lang="ts">
  import { ChannelType } from "discord-api-types/v10";
  import type { PageProps } from "./$types";

  import { m } from "$lib/paraglide/messages";

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";

  let { data }: PageProps = $props();

  let categories = $derived.by(() =>
    data.channels.filter((channel) => channel.type === ChannelType.GuildCategory)
  );
</script>

<section>
  <Card>
    <CardHeader>
      <CardTitle>{m.server_summary()}</CardTitle>
      <CardDescription>{m.stats_about_server()}</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid max-w-md grid-cols-2 gap-4">
        <div class="flex items-center gap-2">
          <p class="text-sm font-medium">{m.members()}:</p>
          <span class="text-sm font-normal">{data.guild.approximate_member_count}</span>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-sm font-medium">{m.channels()}:</p>
          <span class="text-sm font-normal">{data.channels.length}</span>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-sm font-medium">{m.roles()}:</p>
          <span class="text-sm font-normal">{data.guild.roles.length}</span>
        </div>
        <div class="flex items-center gap-2">
          <p class="text-sm font-medium">{m.categories()}:</p>
          <span class="text-sm font-normal">{categories.length}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <div class="flex items-center gap-2">
        <p class="text-xs font-medium">{m.id()}:</p>
        <span class="text-primary text-xs font-normal">/{data.guild.id}</span>
      </div>
    </CardFooter>
  </Card>
</section>
