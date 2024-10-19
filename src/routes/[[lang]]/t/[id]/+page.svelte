<script>
    import { parse } from "marked";
    import { config, glossary } from "$lib/data.js";

    const { data } = $props();
    const i = $derived(data.item);

    function getSimilar(bi) {
        return glossary.filter((g) => g.related?.includes(bi.id));
    }

    const related = $derived(
        i.related
            ? [
                  ...i.related.map((g) => glossary.find((gi) => gi.id === g)),
                  ...getSimilar(i),
              ]
            : getSimilar(i),
    );
</script>

<svelte:head>
    <title>{i.name} ({i.type}) | {config.title}</title>
</svelte:head>

<div class="mt-4 mb-8">
    <div class="breadcrumb">
        <a href="/glossary">Glossary</a>
    </div>
    <h1 class="text-4xl font-semibold">
        {i.name} <span class="opacity-50 font-normal">({i.type})</span>
    </h1>

    <div class="flex md:flex-nowrap flex-wrap gap-8 mt-4 w-full">
        {#if i.description}
            <div class="markdown">
                {@html parse(i.description)}
            </div>
        {/if}
        {#if related.length > 0}
            <div class="shrink-0 w-1/3">
                <h2 class="main mb-4 text-xl">Related terms</h2>
                <ul class="list-disc ml-8">
                    {#each related as si}
                        <li>
                            <a href="/t/{si.id}" class="text-lg">{si.name}</a>
                            <span class="opacity-50">({si.type})</span>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>

    <div class="mt-8">
        <a href="/glossary">See all terms in Glossary →</a>
    </div>
</div>
