<script>
    import { archive, people, projects, events, config } from "$lib/data.js";
    import { getContext } from "svelte";
    import { addDays } from "date-fns";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import ArchiveItem from "$lib/components/ArchiveItem.svelte";
    import RefsBar from "$lib/components/RefsBar.svelte";
    import Video from "$lib/components/Video.svelte";
    import { marked } from "marked";

    const lang = getContext("lang");

    const { data } = $props();
    const e = $derived(data.item);
    const archiveItems = $derived(
        archive.filter(
            (i) =>
                i.event === e.id &&
                ((e.aftermovie && e.aftermovie !== i.videoId) || !e.aftermovie),
        ),
    );
    const aftermovie = $derived(
        e.aftermovie ? archive.find((i) => i.id === e.aftermovie) : null,
    );
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
    <div class="breadcrumb">
        <a href="/events">Event</a>
    </div>
    <div class="grow flex items-top gap-4">
        <h1 class="text-4xl font-semibold block grow">
            {e.name}
        </h1>
        {#if prev || next}
            <div class="text-2xl flex gap-1">
                {#if prev}<a href="/e/{prev.id}">←</a>{:else}<span
                        class="opacity-50">⇤</span
                    >{/if}
                {#if next}<a href="/e/{next.id}">→</a>{:else}<span
                        class="opacity-50">⇥</span
                    >{/if}
            </div>
        {/if}
    </div>
    <div class="flex flex-wrap gap-4 items-center mt-2">
        <div class="text-2xl opacity-50">
            {new Date(e.date).toLocaleDateString(lang)}
            {#if e.days && e.days > 1}
                - {addDays(new Date(e.date), e.days - 1).toLocaleDateString(
                    lang,
                )}{/if}
        </div>
        {#if e.place?.country}
            <div class="text-2xl opacity-50">
                <span class="uppercase">{e.place.country}</span>, {e.place.city}
            </div>
        {/if}
        <div class="text-2xl">
            {#if project}<a href="/c/{project.id}">{project.name}</a>{/if}
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
        <PeopleGrid size="small" people={e.speakers} />
    </div>
{/if}

{#if aftermovie}
    <div class="mt-10">
        <h3 class="main text-2xl mb-4">
            <a href="/v/{aftermovie.id}">Aftermovie</a>
        </h3>
        <div class="lg:w-2/3">
            <Video item={aftermovie} />
        </div>
    </div>
{/if}

{#if e.description}
    <div class="mt-4 mb-10">
        <div class="mt-8 mb-10 markdown">
            {@html marked.parse(e.description)}
        </div>
    </div>
{/if}

{#if archiveItems && archiveItems.length > 0}
    <div class="flex mt-10">
        <h3 class="grow main text-2xl">Archive</h3>
        <div class="opacity-50 text-xl">{archiveItems.length}</div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {#each archiveItems as item}
            <ArchiveItem {item} />
        {/each}
    </div>
{/if}
