<script>
    import { parse } from "marked";

    const { term } = $props();
    const i = $derived(term);
</script>

<div>
    <h2 class="text-3xl">
        <a href="/t/{i.id}" class="font-semibold">{i.name}</a>
        <span class="opacity-50">({i.type})</span>
    </h2>
    {#if i.description}
        <div class="mt-2 markdown">
            {@html parse(
                i.description?.split("\n\n")[0] +
                    ` <a href="/t/${i.id}" class="whitespace-nowrap">Read more →</a>`,
            )}
        </div>
    {/if}
</div>
