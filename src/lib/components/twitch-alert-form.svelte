<script lang="ts">
  import { page } from "$app/state";

  import { ChannelType } from "discord-api-types/v10";
  import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
  import { valibotClient } from "sveltekit-superforms/adapters";

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
  import * as Form from "$lib/components/ui/form";
  import { Textarea } from "$lib/components/ui/textarea";

  import ChannelsCombobox from "$lib/components/channels-combobox.svelte";
  import TwitchChannelCombobox from "$lib/components/twitch-channel-combobox.svelte";

  import LoadingCircle from "~icons/lucide/loader-circle";

  import { Channel } from "$lib/schemas/channel";
  import { TwitchAlertForm } from "$lib/schemas/forms/twitch-alert-form";
  import type { TwitchUser } from "$lib/schemas/twitch/twitch-user";

  type Props = {
    title: string;
    description: string;
    channels: Channel[];
    streamer?: TwitchUser;
    form: SuperValidated<Infer<typeof TwitchAlertForm>>;
  };

  let { channels, form, streamer, title, description }: Props = $props();

  let filteredChannels = $derived.by(() =>
    channels.filter(
      (channel) =>
        channel.type === ChannelType.GuildText ||
        channel.type === ChannelType.GuildAnnouncement ||
        channel.type === ChannelType.GuildVoice
    )
  );

  const alertForm = superForm(form, {
    validators: valibotClient(TwitchAlertForm),
  });

  const { form: formData, enhance, submitting } = alertForm;
</script>

<section>
  <form method="POST" use:enhance>
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent class="flex max-w-[500px] flex-col gap-4">
        <Form.Field form={alertForm} name="alert_id" class="sr-only">
          <Form.Control>
            {#snippet children({ props })}
              <input {...props} bind:value={$formData.alert_id} />
            {/snippet}
          </Form.Control>
        </Form.Field>
        <Form.Field form={alertForm} name="guild" class="sr-only">
          <Form.Control>
            {#snippet children({ props })}
              <input {...props} bind:value={$formData.guild} />
            {/snippet}
          </Form.Control>
        </Form.Field>
        <div class="flex flex-col gap-2">
          <p class="text-sm font-medium">{m.twitch_channel()}</p>
          <span class="text-muted-foreground text-xs">
            {m.enter_twitch_channel_name()}
          </span>
          <Form.Field form={alertForm} name="twitch_user">
            <TwitchChannelCombobox
              bind:value={$formData.twitch_user}
              initialUser={streamer}
            />
            <Form.FieldErrors />
          </Form.Field>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm font-medium">{m.discord_channel()}</p>
          <span class="text-muted-foreground text-xs">
            {m.choose_discord_channel()}
          </span>
          <Form.Field form={alertForm} name="discord_channel">
            <ChannelsCombobox
              channels={filteredChannels}
              bind:value={$formData.discord_channel}
            />
            <Form.FieldErrors />
          </Form.Field>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm font-medium">{m.alert_message()}</p>
          <span class="text-muted-foreground text-xs">
            {m.enter_alert_message()}
            <code>{" {{streamer}} "}</code>
            {m.to_mention_streamer()}
          </span>
          <Form.Field form={alertForm} name="alert_message">
            <Form.Control>
              {#snippet children({ props })}
                <Textarea
                  {...props}
                  bind:value={$formData.alert_message}
                  rows={5}
                  placeholder={m.write_alert_message()}
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>
        </div>
      </CardContent>
      <CardFooter class="justify-end gap-4">
        <Button
          href={localizeHref(`/dashboard/${page.params.guild}/twitch`)}
          variant="secondary"
        >
          {m.cancel()}
        </Button>
        <Button type="submit">
          {#if $submitting}
            <LoadingCircle class="size-4 animate-spin" />
          {/if}
          {m.save_changes()}
        </Button>
      </CardFooter>
    </Card>
  </form>
</section>
