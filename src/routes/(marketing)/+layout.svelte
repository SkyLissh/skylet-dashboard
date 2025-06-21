<script lang="ts">
  import type { LayoutProps } from "./$types";

  import MainHeader from "$lib/components/blocks/main-header.svelte";

  let { data, children }: LayoutProps = $props();
</script>

<MainHeader user={data.profile} />
{@render children()}
