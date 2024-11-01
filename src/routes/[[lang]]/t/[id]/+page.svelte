<script>
    import { parse } from "$lib/wiki.js";
    import { config, glossary } from "$lib/data.js";
    import { t } from "$lib/i18n.js";

    const { data } = $props();
    const i = $derived(data.item);

    const related = $derived(
        i.related?.map((g) => glossary.find((gi) => gi.id === g)) || [],
    );
    const backLinks = $derived(
        glossary.filter(
            (g) =>
                g.related?.includes(i.id) ||
                g.links?.find((l) => l.target === i.id),
        ),
    );
</script>

<svelte:head>
    <title>{i.name} ({i.type}) | {config.title}</title>
</svelte:head>

<div class="mt-4 mb-8">
    <div class="breadcrumb">
        <a href="/glossary">{$t`Glossary`}</a>
    </div>
    <div class="flex md:flex-nowrap flex-wrap gap-8 mt-4 w-full">
        <div class="bg-gray-50 dark:bg-gray-950 rounded p-4">
            <h1 class="text-4xl">
                <span class="font-semibold">{i.name}</span>
                {#if i.year}<span class="">({i.year})</span>{/if}
            </h1>
            <div class="mt-1">
                <span class="opacity-50 text-xl">{i.type}</span>
            </div>

            {#if i.description}
                <div class="markdown markdown-lg">
                    {@html parse(i.description)}
                </div>
            {/if}
        </div>

        <div class="shrink-0 w-1/3">
            <div class="grid grid-cols-1 gap-8">
                <div>
                    <h2 class="main mb-4 text-xl">{$t`Languages`}</h2>
                    <ul class="list-disc ml-8">
                        <li>English ({$t`current`})</li>
                    </ul>
                </div>
                {#if related.length > 0}
                    <div>
                        <h2 class="main mb-4 text-xl">{$t`Related terms`}</h2>
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
                        <h2 class="main mb-4 text-xl">{$t`Backlinks`}</h2>
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
        <div class="mb-10 mt-8">
            <h2 class="main mb-4 text-xl">{$t`Resources`}</h2>
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
        <a href="/glossary">{$t`See all terms in Glossary`} →</a>
    </div>
</div>
