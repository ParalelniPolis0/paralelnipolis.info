<script>
    import { parse } from "$lib/wiki.js";

    const { term } = $props();
    const i = $derived(term);
</script>

<div>
    <h2 class="text-3xl">
        <a href="/t/{i.id}" class="font-semibold">{i.name}</a>
        {#if i.year}<span class="">({i.year})</span>{/if}
    </h2>
    <div class="mt-1">
        <span class="opacity-50 text-xl">{i.type}</span>
    </div>
    {#if i.description}
        <div class="mt-2 markdown">
            {@html parse(
                i.description?.split("\n\n")[0] +
                    ` <a href="/t/${i.id}" class="whitespace-nowrap">Read more →</a>`,
            )}
        </div>
    {/if}
</div>
