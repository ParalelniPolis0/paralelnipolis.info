<script>
    import { getContext } from "svelte";
    import { addDays } from "date-fns";
    import { marked } from "marked";
    import { archive, people, projects, events, config } from "$lib/data.js";
    import { imgHashUrl, imgSourceUrl } from "$lib/utils.js";
    import { t } from "$lib/i18n.js";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import ArchiveItem from "$lib/components/ArchiveItem.svelte";
    import RefsBar from "$lib/components/RefsBar.svelte";
    import Video from "$lib/components/Video.svelte";

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
    const img = $derived(e.imgs ? e.imgs[0] : null);
</script>

<svelte:head>
    <title>{e.name} | {config.title}</title>
</svelte:head>

<div class="mb-8 mt-4">
    <div class="">
        {#if img}
            <div class="shrink-0 mb-6 lg:mb-10 lg:ml-10 lg:float-right">
                <img
                    src={imgHashUrl("events", img.hash, "l")}
                    class="lg:w-80 w-2/4"
                    alt={e.name}
                />
            </div>
        {/if}
        <div class="grow">
            <div class="flex items-center gap-4 mb-6">
                <div class="breadcrumb !mb-0">
                    <a href="/events">Event</a>
                </div>
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
            <div class="grow flex items-top gap-4">
                <h1 class="text-4xl font-semibold block grow">
                    {e.name}
                </h1>
            </div>
            <div class="flex flex-wrap gap-4 items-center mt-2">
                <div class="text-2xl opacity-50">
                    {new Date(e.date).toLocaleDateString(lang)}
                    {#if e.days && e.days > 1}
                        - {addDays(
                            new Date(e.date),
                            e.days - 1,
                        ).toLocaleDateString(lang)}{/if}
                </div>
                {#if e.place?.country}
                    <div class="text-2xl opacity-50">
                        <span class="uppercase">{e.place.country}</span>, {e
                            .place.city}
                    </div>
                {/if}
                <div class="text-2xl">
                    {#if project}<a href="/c/{project.id}">{project.name}</a
                        >{/if}
                    {#if e.seq}<span class="opacity-50 font-normal"
                            >#{e.seq}</span
                        >{/if}
                </div>
            </div>
            {#if e.refs}
                <RefsBar refs={e.refs} />
            {/if}
            {#if e.description}
                <div class="mt-4 mb-4">
                    <div class="mt-8 mb-4 markdown">
                        {@html marked.parse(e.description)}
                    </div>
                </div>
            {/if}
        </div>
    </div>
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

{#if archiveItems && archiveItems.length > 0}
    <div class="flex mt-10">
        <h3 class="grow main text-2xl">{$t`Archive`}</h3>
        <div class="opacity-50 text-xl">{archiveItems.length}</div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {#each archiveItems as item}
            <ArchiveItem {item} />
        {/each}
    </div>
{/if}

{#if e.imgs && e.imgs.length > 0}
    <div class="flex mt-10">
        <h3 class="grow main text-2xl">{$t`Images`}</h3>
    </div>
    <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-4"
    >
        {#each e.imgs as i}
            <div class="text-center">
                <div class="mb-2">{i.type}</div>
                <a href={imgSourceUrl("events", i.path)}
                    ><img
                        src={imgHashUrl("events", i.hash, "m")}
                        alt={i.type}
                        class="w-full"
                    /></a
                >
            </div>
        {/each}
    </div>
{/if}
