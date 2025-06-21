<script lang="ts">
  import type { PageProps } from "./$types";

  import { m } from "$lib/paraglide/messages";

  import TwitchAlertForm from "$lib/components/blocks/forms/twitch-alert-form.svelte";

  let { data }: PageProps = $props();
</script>

<TwitchAlertForm
  channels={data.channels}
  form={data.form}
  streamer={data.streamer ?? undefined}
  title={m.edit_service_alert({ service: "Twitch" })}
  description={m.edit_twitch_alert_desc()}
/>
