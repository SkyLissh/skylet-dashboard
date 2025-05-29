<script lang="ts">
  import "../app.css";

  import MainHeader from "$lib/components/main-header.svelte";

  let { children } = $props();
</script>

<MainHeader />
{@render children()}
