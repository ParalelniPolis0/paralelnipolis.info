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
    </div>
{/if}
