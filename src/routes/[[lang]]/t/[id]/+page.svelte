<script>
    import { parse } from "marked";
    import { config, glossary } from "$lib/data.js";

    const { data } = $props();
    const i = $derived(data.item);

    const related = $derived(
        i.related?.map((g) => glossary.find((gi) => gi.id === g)) || [],
    );
    const backLinks = $derived(
        glossary.filter((g) => g.related?.includes(i.id)),
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
        <div class="shrink-0 w-1/3">
            <div class="grid grid-cols-1 gap-8">
                <div>
                    <h2 class="main mb-4 text-xl">Languages</h2>
                    <ul class="list-disc ml-8">
                        <li>English (current)</li>
                    </ul>
                </div>
                {#if related.length > 0}
                    <div>
                        <h2 class="main mb-4 text-xl">Related terms</h2>
                        <ul class="list-disc ml-8">
                            {#each related as si}
                                <li>
                                    <a href="/t/{si.id}" class="">{si.name}</a>
                                    <span class="opacity-50">({si.type})</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
                {#if backLinks.length > 0}
                    <div>
                        <h2 class="main mb-4 text-xl">Backlinks</h2>
                        <ul class="list-disc ml-8">
                            {#each backLinks as si}
                                <li>
                                    <a href="/t/{si.id}" class="">{si.name}</a>
                                    <span class="opacity-50">({si.type})</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
        </div>
    </div>

    {#if i.resources?.length > 0}
        <div class="mb-10">
            <h2 class="main mb-4 text-xl">Resources</h2>
            <ul class="list-disc ml-8">
                {#each i.resources as r}
                    <li>
                        <a href={r.url}>{r.title}</a>
                        {#if r.caption}- {r.caption}{/if}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

    <div class="mt-16">
        <a href="/glossary">See all terms in Glossary →</a>
    </div>
</div>
