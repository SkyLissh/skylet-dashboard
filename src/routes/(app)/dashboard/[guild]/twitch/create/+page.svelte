<script lang="ts">
  import type { PageProps } from "./$types";

  import { m } from "$lib/paraglide/messages";

  import TwitchAlertForm from "$lib/components/blocks/forms/twitch-alert-form.svelte";

  let { data }: PageProps = $props();
</script>

<TwitchAlertForm
  channels={data.channels}
  form={data.form}
  title={m.add_alert({ service: "Twitch" })}
  description={m.add_twitch_alert_desc()}
/>
