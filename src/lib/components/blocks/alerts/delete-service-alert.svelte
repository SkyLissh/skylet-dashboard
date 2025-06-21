<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { page } from "$app/state";

  import { createMutation } from "@tanstack/svelte-query";
  import { capitalize } from "es-toolkit/string";
  import { ofetch } from "ofetch";

  import { m } from "$lib/paraglide/messages";

  import { Button } from "$lib/components/ui/button";
  import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "$lib/components/ui/dialog";

  import LoaderCircle from "~icons/lucide/loader-circle";

  let {
    service,
    alertId,
    onSuccess,
    onCancel,
  }: { service: string; alertId: string; onSuccess: () => void; onCancel: () => void } =
    $props();

  const deleteAlert = createMutation({
    mutationFn: async () => {
      await ofetch(`/api/alerts/delete/${page.params.guild}/${alertId}`, {
        method: "POST",
      });
      await invalidate("alerts:twitch");
    },
    onSuccess: onSuccess,
  });
</script>

<DialogContent>
  <DialogHeader>
    <DialogTitle>
      {m.delete_service_alert({ service: capitalize(service) })}
    </DialogTitle>
    <DialogDescription>
      {m.delete_service_alert_desc({ service: capitalize(service) })}
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button variant="outline" onclick={onCancel}>
      {m.cancel()}
    </Button>
    <Button
      variant="destructive"
      onclick={() => $deleteAlert.mutate()}
      disabled={$deleteAlert.isPending}
    >
      {#if $deleteAlert.isPending}
        <LoaderCircle class="size-4 animate-spin" />
      {/if}
      {m.delete()}
    </Button>
  </DialogFooter>
</DialogContent>
