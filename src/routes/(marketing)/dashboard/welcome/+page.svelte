<script lang="ts">
  import { m } from "$lib/paraglide/messages";

  import { signIn } from "$lib/auth";
  import { Button } from "$lib/components/ui/button";

  import Discord from "~icons/simple-icons/discord";
</script>

<main
  class="container mx-auto flex max-w-7xl flex-col items-center gap-6 py-20 text-center"
>
  <div class="relative">
    <div
      class="absolute -inset-1 rounded-full bg-gradient-to-br from-pink-400/50 to-sky-500/50 blur-xl"
    ></div>
    <img
      src="/logo.png"
      alt="SkyLet"
      class="relative z-10 aspect-square size-52 rounded-full"
      loading="lazy"
    />
  </div>
  <h1 class="text-3xl font-semibold">{m.welcome_to_dashboard()}</h1>
  <p class="text-muted-foreground">{m.login_to_continue()}</p>
  <Button class="px-16 text-base [&_svg]:size-6" onclick={signIn}>
    <Discord />
    {m.login()}
  </Button>
</main>
