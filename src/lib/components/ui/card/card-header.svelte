<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="card-header"
  class={cn(
    "bg-card-header @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 space-y-1.5 rounded-t-xl p-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
