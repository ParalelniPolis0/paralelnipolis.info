<script>
    let { refs } = $props();
</script>

{#if refs}
    <div class="flex flex-wrap gap-4 items-center mt-2 ml-2">
        {#if refs.web}
            <div class="flex gap-2 items-center">
                <div class="text-2xl">@</div>
                <a href={refs.web} class="hover:underline"
                    >{refs.web.replace(/^https?:\/\//, "")}</a
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
    </div>
{/if}
