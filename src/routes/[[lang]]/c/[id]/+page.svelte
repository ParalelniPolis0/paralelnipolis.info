<script>
    import { people, archive, config } from "$lib/data.js";
    import { addDays } from "date-fns";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import RefsBar from "$lib/components/RefsBar.svelte";
    import { getContext } from "svelte";
    import ArchiveItem from "$lib/components/ArchiveItem.svelte";
    import { parse } from "marked";

    const lang = getContext("lang");

    const { data } = $props();
    const p = $derived(data.item);
    const events = $derived(
        p.events && p.events.sort((x, y) => (x.date < y.date ? 1 : -1)),
    );
    const contributors = $derived(
        people.filter((pe) => {
            return pe.roles?.find((r) => r.project === p.id);
        }),
    );
</script>

<svelte:head>
    <title>{p.name} | {config.title}</title>
</svelte:head>

<div class="flex gap-8 mt-4 flex-col-reverse sm:flex-row">
    <div class="grow">
        <h1 class="text-4xl font-semibold">{p.name}</h1>
        <RefsBar refs={p.refs} />
        {#if p.caption}
            <div class="mt-6 text-lg">{p.caption}</div>
        {/if}
    </div>
    <div class="shrink-0">
        <img
            src="/projects/{p.img}"
            alt={p.name}
            class="w-2/3 sm:w-32 md:w-48 lg:w-64 aspect-square object-cover rounded"
        />
    </div>
</div>

{#if contributors.length > 0}
    <div class="mt-8 mb-12">
        <h2 class="text-2xl main">
            {lang === "cs" ? "Přispěvatelé" : "Contributors"}
        </h2>
        <div class="mt-4">
            <PeopleGrid people={contributors} />
        </div>
    </div>
{/if}

{#if p.description || p.description_cs}
    <div class="mt-8 mb-12">
        <h2 class="text-2xl main">{lang === "cs" ? "Popis" : "Description"}</h2>
        <div class="prose prose-pp mt-6">
            {@html parse(p.description || p.description_cs)}
        </div>
    </div>
{/if}

{#if p.events}
    <div class="mt-8">
        <h2 class="text-2xl main">{lang === "cs" ? "Události" : "Events"}</h2>
        <div class="grid grid-cols-1 gap-10 mt-4">
            {#each events.map((e) => {
                e.archive = archive.filter((i) => i.event === e.id);
                return e;
            }) as e}
                <hr />
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

                    <div class="mt-8">
                        {#if e.speakers}
                            <PeopleGrid
                                size="small"
                                people={e.speakers.map((s) =>
                                    people.find((p) => p.id === s),
                                )}
                            />
                        {/if}
                    </div>
                    {#if e.archive && e.archive.length > 0}
                        <div
                            class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                        >
                            {#each e.archive.slice(0, 3) as item}
                                <ArchiveItem {item} />
                            {/each}
                        </div>
                        {#if e.archive.length > 3}
                            <div class="text-right">
                                <a href="/e/{e.id}">More from "{e.name}" →</a>
                            </div>
                        {/if}
                    {/if}
                </div>
            {/each}
        </div>
    </div>
{/if}
