<script>
    import { getContext } from "svelte";
    import { parse } from "marked";
    import { addDays } from "date-fns";
    import { imgHashUrl } from "$lib/utils.js";
    import { t, T } from "$lib/i18n.js";
    import {
        people,
        archive,
        structures,
        config,
        events as allEvents,
    } from "$lib/data.js";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import RefsBar from "$lib/components/RefsBar.svelte";
    import ArchiveItem from "$lib/components/ArchiveItem.svelte";

    const lang = getContext("lang");

    const { data } = $props();
    const p = $derived(data.item);
    const events = $derived(allEvents.filter((e) => e.project === p.id));
    const archiveItems = $derived(archive.filter((i) => i.project === p.id));

    const contributors = $derived(
        people.filter((pe) => {
            return pe.roles?.find((r) => r.project === p.id);
        }),
    );
    const conceptStructure = $derived(
        structures.find((s) => s.id === p.structure),
    );
    let eventView = $state("simple");

    function switchEventView() {
        if (eventView === "full") {
            eventView = "simple";
        } else {
            eventView = "full";
        }
    }
</script>

<svelte:head>
    <title>{p.name} | {config.title}</title>
</svelte:head>

<div class="flex gap-8 mt-4 flex-col-reverse sm:flex-row">
    <div class="grow">
        <div class="breadcrumb">
            <a href="/concepts">{$t`Concept`}</a>
        </div>
        <div class="flex flex-wrap gap-2 items-center">
            <h1 class="text-4xl font-semibold">{p.name}</h1>
            <div class="font-normal text-xl opacity-50 block mt-1">
                {#if p.years}({p.years[0]} - {p.years[1]
                        ? p.years[1]
                        : ""}){/if}
            </div>
        </div>
        <RefsBar refs={p.refs} />
        {#if p.caption}
            <div class="mt-6 text-lg">{@html parse(p.caption)}</div>
        {/if}
        {#if conceptStructure}
            <div class="mt-4 flex gap-2 text-xl items-center">
                <div>{$t`Structure`}:</div>
                <div class="mr-2">
                    <a href="/s/{conceptStructure.id}"
                        >{conceptStructure.name}</a
                    >
                </div>
            </div>
        {/if}
    </div>
    {#if p.imgHash}
        <div class="shrink-0">
            <img
                src={imgHashUrl("structures", p.imgHash, "m")}
                alt={p.name}
                class="w-2/3 sm:w-32 md:w-48 lg:w-64 aspect-square object-cover rounded"
            />
        </div>
    {/if}
</div>

{#if contributors.length > 0}
    <div class="mt-8 mb-12">
        <h2 class="text-2xl main">
            {$t`Contributors`}
        </h2>
        <div class="mt-4">
            <PeopleGrid people={contributors} size="small" />
        </div>
    </div>
{/if}

{#if p.description || p.description_cs}
    <div class="mt-8 mb-12">
        <h2 class="text-2xl main">{$t`Description`}</h2>
        <div class="markdown mt-6">
            {@html parse(p.description || p.description_cs)}
        </div>
    </div>
{/if}

{#if events.length > 0}
    <div class="mt-8">
        <div class="flex flex-wrap items-center">
            <h2 class="grow text-2xl main">
                {$t`Events`}
            </h2>
            <div>
                <button
                    class="button pointer-cursor p-1.5 hover:bg-gray-200 hover:dark:bg-gray-800"
                    onclick={switchEventView}
                    >{#if eventView === "full"}{$t`Show simple overview`}{:else}{$t`Show
                        with details`}{/if}</button
                >
            </div>
        </div>
        <div
            class="grid grid-cols-1 {eventView === 'full'
                ? 'gap-10'
                : 'gap-8'} mt-8"
        >
            {#each events.map((e) => {
                e.archive = archive.filter((i) => i.event === e.id);
                return e;
            }) as e}
                {#if eventView === "full"}
                    <hr />
                {/if}
                <div id={e.id}>
                    <div class="flex flex-wrap">
                        <h3 class="text-3xl font-semibold grow">
                            <a href="/e/{e.id}">
                                {e.name}
                            </a>
                            {#if e.seq}<span class="opacity-50 font-normal"
                                    >(#{e.seq})</span
                                >{/if}
                        </h3>
                        <div class="text-xl opacity-50">
                            {new Date(e.date).toLocaleDateString(lang)}
                            {#if e.days && e.days > 1}
                                - {addDays(
                                    new Date(e.date),
                                    e.days - 1,
                                ).toLocaleDateString(lang)}{/if}
                        </div>
                    </div>

                    {#if eventView === "full"}
                        <div class="mt-8">
                            {#if e.speakers}
                                <PeopleGrid size="small" people={e.speakers} />
                            {/if}
                        </div>
                        {#if e.archive && e.archive.length > 0}
                            <div
                                class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                            >
                                {#each e.archive.slice(0, 6) as item}
                                    <ArchiveItem {item} />
                                {/each}
                            </div>
                            {#if e.archive.length > 3}
                                <div class="text-right">
                                    <a href="/e/{e.id}"
                                        ><T msg="More from #">{e.name}</T> →</a
                                    >
                                </div>
                            {/if}
                        {/if}
                    {/if}
                </div>
            {/each}
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
