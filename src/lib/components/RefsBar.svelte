<script>
    let { refs } = $props();
</script>

{#if refs}
    <div class="flex flex-wrap gap-4 items-center mt-2 ml-2">
        {#if refs.web}
            <div class="flex gap-2 items-center">
                <div class="text-2xl">@</div>
                <a href={refs.web} class="hover:underline"
                    >{refs.web
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}</a
                >
            </div>
        {/if}
        {#if refs.twitter}
            <div class="flex gap-2 items-center">
                <div class="text-2xl">𝕏</div>
                <a href="https://x.com/{refs.twitter}" class="hover:underline"
                    >{refs.twitter}
                </a>
            </div>
        {/if}
        {#if refs.nostr}
            <div class="flex gap-2 items-center">
                <div class="text-2xl">
                    <img
                        src="/nostr.webp"
                        class="w-5 dark:invert"
                        alt="Nostr"
                    />
                </div>
                <a
                    href="https://primal.net/p/{refs.nostr}"
                    class="hover:underline"
                    >{refs.nostr.slice(0, 15)}..
                </a>
            </div>
        {/if}
        {#if refs.github}
            <div class="flex gap-2 items-center">
                <div class="font-semibold">
                    <img
                        src="/github.svg"
                        class="w-5 dark:invert"
                        alt="GitHub"
                    />
                </div>
                <a
                    href="https://github.com/{refs.github}"
                    class="hover:underline"
                    >{refs.github}
                </a>
            </div>
        {/if}
        {#if refs.meetup}
            <div class="flex gap-2 items-center">
                <a href={refs.meetup} class="hover:underline">meetup.com</a>
            </div>
        {/if}
        {#if refs.luma}
            <div class="flex gap-2 items-center">
                <a href="https://lu.ma/{refs.luma}" class="hover:underline"
                    >lu.ma</a
                >
            </div>
        {/if}
    </div>
{/if}
