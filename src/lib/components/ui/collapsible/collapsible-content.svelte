<script lang="ts">
  import { cn } from "$lib/utils";
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: CollapsiblePrimitive.ContentProps = $props();
</script>

<CollapsiblePrimitive.Content
  bind:ref
  data-slot="collapsible-content"
  class={cn(
    "data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden",
    className
  )}
  {...restProps}
/>
