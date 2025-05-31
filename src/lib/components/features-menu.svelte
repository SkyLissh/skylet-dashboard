<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuRoot,
    NavigationMenuTrigger,
  } from "$lib/components/ui/navigation-menu";

  import BellDot from "~icons/lucide/bell-dot";
  import Music from "~icons/lucide/music";
  import User from "~icons/lucide/user";
  import Wrench from "~icons/lucide/wrench";

  const { orientation }: { orientation: "horizontal" | "vertical" } = $props();
</script>

<NavigationMenuRoot {orientation}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="#commands">
        <span class="font-medium">
          {m.commands()}
        </span>
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        {m.modules()}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
          <li>
            <NavigationMenuLink href="#modules">
              <div class="flex items-center gap-2">
                <BellDot />
                {m.twitch_alerts()}
              </div>
              <p>
                {m.twitch_alerts_description()}
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="#modules">
              <div class="flex items-center gap-2">
                <Music />
                {m.music()}
              </div>
              <p>
                {m.music_description()}
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="#modules">
              <div class="flex items-center gap-2">
                <Wrench />
                {m.moderation()}
              </div>
              <p>
                {m.moderation_description()}
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="#modules">
              <div class="flex items-center gap-2">
                <User />
                {m.welcome_messages()}
              </div>
              <p>
                {m.welcome_messages_description()}
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenuRoot>
