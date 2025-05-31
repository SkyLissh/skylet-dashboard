<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  import { cn } from "$lib/utils";

  let { children, class: className, ...restProps }: SvelteHTMLElements["div"] = $props();
</script>

<div
  class={cn(
    "text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
