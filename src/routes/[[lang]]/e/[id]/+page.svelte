<script>
    import { archive, people, projects, events, config } from "$lib/data.js";
    import { getContext } from "svelte";
    import { addDays } from "date-fns";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import ArchiveItem from "$lib/components/ArchiveItem.svelte";
    import RefsBar from "$lib/components/RefsBar.svelte";

    const lang = getContext("lang");

    const { data } = $props();
    const e = $derived(data.item);
    const archiveItems = $derived(archive.filter((i) => i.event === e.id));
    const project = $derived(projects.find((p) => p.id === e.project));

    const prev = $derived(
        e.seq > 1
            ? events.find((i) => i.project === e.project && i.seq === e.seq - 1)
            : null,
    );
    const next = $derived(
        e.seq
            ? events.find((i) => i.project === e.project && i.seq === e.seq + 1)
            : null,
    );
</script>

<svelte:head>
    <title>{e.name} | {config.title}</title>
</svelte:head>

<div class="mb-8 mt-4">
    <div class="grow flex items-center gap-4">
        <h1 class="text-4xl font-semibold block grow">
            {e.name}
        </h1>
        {#if prev || next}
            <div class="text-2xl">
                {#if prev}<a href="/e/{prev.id}">←</a>{:else}<span
                        class="opacity-50">⇤</span
                    >{/if}
                {#if next}<a href="/e/{next.id}">→</a>{:else}<span
                        class="opacity-50">⇥</span
                    >{/if}
            </div>
        {/if}
    </div>
    <div class="flex gap-4 items-center mt-2">
        <div class="text-2xl opacity-50">
            {new Date(e.date).toLocaleDateString(lang)}
            {#if e.days && e.days > 1}
                - {addDays(new Date(e.date), e.days - 1).toLocaleDateString(
                    lang,
                )}{/if}
        </div>
        <div class="text-2xl">
            <a href="/c/{project.id}">{project.name}</a>
            {#if e.seq}<span class="opacity-50 font-normal">#{e.seq}</span>{/if}
        </div>
    </div>
    {#if e.refs}
        <RefsBar refs={e.refs} />
    {/if}
</div>

{#if e.speakers && e.speakers.length > 0}
    <div class="">
        <h3 class="main text-2xl mb-4">Speakers</h3>
        <PeopleGrid
            size="small"
            people={e.speakers.map((s) => people.find((p) => p.id === s))}
        />
    </div>
{/if}
{#if archiveItems && archiveItems.length > 0}
    <h3 class="mt-10 main text-2xl">Archive</h3>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {#each archiveItems as item}
            <ArchiveItem {item} />
        {/each}
    </div>
{/if}
