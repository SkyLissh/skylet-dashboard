<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  import { Button } from "$lib/components/ui/button";
  import { Sheet, SheetTrigger } from "$lib/components/ui/sheet";

  import LanguageDropdown from "$lib/components/language-dropdown.svelte";
  import MainMenuSheet from "$lib/components/main-menu-sheet.svelte";

  import Menu from "~icons/lucide/menu";
  import Discord from "~icons/simple-icons/discord";
</script>

<Sheet>
  <MainMenuSheet />
  <header class="border-border border-b p-4">
    <nav class="container flex items-center justify-between ps-0 pe-0">
      <ul class="flex items-center gap-4">
        <li>
          <a href={localizeHref("/")} class="flex items-center gap-4">
            <img src="/logo.png" alt="SkyLet" class="size-10 rounded-full" />
            <p class="text-lg font-semibold tracking-wide md:text-xl">{m.skylet()}</p>
          </a>
        </li>
        <li class="hidden md:block">
          <!-- <FeaturesMenu orientation="horizontal" /> -->
        </li>
      </ul>
      <ul class="flex items-center gap-4">
        <LanguageDropdown class="hidden md:inline-flex" />
        <SheetTrigger class="md:hidden">
          {#snippet child({ props })}
            <Button {...props} variant="outline" size="icon">
              <Menu />
            </Button>
          {/snippet}
        </SheetTrigger>

        <Button variant="outline">
          <Discord />
          {m.login()}
        </Button>
      </ul>
    </nav>
  </header>
</Sheet>
