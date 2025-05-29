<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import { getLocale, locales, setLocale } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";

  import ChevronDown from "~icons/lucide/chevron-down";

  const { class: className } = $props();

  const FLAG_CODES = {
    en: "us",
    es: "mx",
  };

  const LANGUAGE_NAMES = {
    en: "English",
    es: "Español",
  };

  const currentLocale = getLocale();
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost" class={className}>
        <img
          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/flags/4x3/${FLAG_CODES[currentLocale]}.svg`}
          alt={LANGUAGE_NAMES[currentLocale]}
          class="size-6 rounded-full"
          loading="lazy"
        />
        {LANGUAGE_NAMES[currentLocale]}
        <ChevronDown class="size-4" />
      </Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent class="min-w-48">
    <DropdownMenuLabel>{m.select_language()}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {#each locales as locale}
      <DropdownMenuItem onclick={() => setLocale(locale)}>
        <img
          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/flags/4x3/${FLAG_CODES[locale]}.svg`}
          alt={LANGUAGE_NAMES[locale]}
          class="size-6 rounded-full"
          loading="lazy"
        />
        {LANGUAGE_NAMES[locale]}
      </DropdownMenuItem>
    {/each}
  </DropdownMenuContent>
</DropdownMenu>
