<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { page } from "$app/state";

  import { createMutation } from "@tanstack/svelte-query";
  import { capitalize } from "es-toolkit/string";
  import { ofetch } from "ofetch";

  import { m } from "$lib/paraglide/messages";

  import { Button } from "$lib/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";

  import LoaderCircle from "~icons/lucide/loader-circle";
  import Trash from "~icons/lucide/trash";

  let { service, alertId }: { service: string; alertId: string } = $props();

  let open = $state(false);

  const deleteAlert = createMutation({
    mutationFn: async () => {
      await ofetch(`/api/alerts/delete/${page.params.guild}/${alertId}`, {
        method: "POST",
      });
      await invalidate("alerts:twitch");
    },
    onSuccess: () => {
      open = false;
    },
  });
</script>

<Dialog bind:open>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="destructive" size="icon">
        <Trash />
      </Button>
    {/snippet}
  </DialogTrigger>
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
      <Button variant="outline" onclick={() => (open = false)}>
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
</Dialog>
