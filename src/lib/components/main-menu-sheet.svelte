<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import LanguageDropdown from "$lib/components/language-dropdown.svelte";
  import { Button } from "$lib/components/ui/button";
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "$lib/components/ui/collapsible";
  import { Separator } from "$lib/components/ui/separator";
  import {
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
  } from "$lib/components/ui/sheet";

  import { signIn } from "$lib/auth";

  import BellDot from "~icons/lucide/bell-dot";
  import ChevronDown from "~icons/lucide/chevron-down";
  import Music from "~icons/lucide/music";
  import User from "~icons/lucide/user";
  import Wrench from "~icons/lucide/wrench";
  import Discord from "~icons/simple-icons/discord";
</script>

<SheetContent side="left" class="flex flex-col p-0">
  <SheetHeader class="border-border border-b p-6">
    <SheetTitle class="flex items-center gap-4">
      <img src="/logo.png" alt="SkyLet" class="size-10 rounded-full" />
      <p class="text-lg font-semibold tracking-wide md:text-xl">{m.skylet()}</p>
    </SheetTitle>
  </SheetHeader>
  <div class="flex flex-1 flex-col gap-4 px-6 py-4">
    <Button variant="ghost" class="w-full justify-start">
      {m.commands()}
    </Button>
    <Collapsible>
      <CollapsibleTrigger>
        {#snippet child({ props })}
          <Button {...props} variant="ghost" class="group w-full justify-between">
            {m.modules()}
            <ChevronDown
              class="size-4 transition-transform duration-300 group-data-expanded:rotate-180"
            />
          </Button>
        {/snippet}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul class="flex flex-col gap-2">
          <li>
            <Button variant="ghost" class="text-muted-foreground w-full justify-start">
              <BellDot />
              {m.twitch_alerts()}
            </Button>
          </li>
          <li>
            <Button variant="ghost" class="text-muted-foreground w-full justify-start">
              <Music />
              {m.music()}
            </Button>
          </li>
          <li>
            <Button variant="ghost" class="text-muted-foreground w-full justify-start">
              <User />
              {m.welcome_messages()}
            </Button>
          </li>
          <li>
            <Button variant="ghost" class="text-muted-foreground w-full justify-start">
              <Wrench />
              {m.moderation()}
            </Button>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
    <LanguageDropdown class="mt-auto" />
  </div>
  <SheetFooter class="flex flex-col gap-2 px-6 py-4">
    <Separator />
    <Button onclick={signIn}>
      <Discord />
      {m.login()}
    </Button>
  </SheetFooter>
</SheetContent>
