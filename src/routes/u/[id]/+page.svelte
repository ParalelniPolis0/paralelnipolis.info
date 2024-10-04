<script>
    import { archive, projects, people } from "$lib/data.js";
    import RefsBar from "$lib/components/RefsBar.svelte";
    import ArchiveList from "../../../lib/components/ArchiveList.svelte";
    import EventList from "../../../lib/components/EventList.svelte";

    function listEvents() {
        return projects
            .map((pr) =>
                pr.events?.map((e) => {
                    e.project = pr.id;
                    return e;
                }),
            )
            .flat()
            .filter((p) => p);
    }

    const allEvents = listEvents();

    const { data } = $props();
    const p = $derived(data.item);

    //console.log(p.id, listEvents());

    const events = $derived(
        allEvents.filter((e) => e.speakers && e.speakers.includes(p.id)),
    );

    const archiveItems = $derived(
        archive.filter((i) => i.people.includes(p.id)),
    );
</script>

<svelte:head>
    <title>{p.name} | Paralelní Polis</title>
</svelte:head>

<div class="flex gap-8 mt-4 mb-10">
    <div class="shrink-0">
        <img
            src="/people/{p.img}"
            alt={p.name}
            class="aspect-square w-48 h-48 object-cover -rotate-6 rounded"
        />
    </div>
    <div>
        <h1 class="text-3xl font-semibold">{p.name}</h1>
        <RefsBar refs={p.refs} />
        <div class="my-4">{p.desc}</div>
    </div>
</div>

{#if events.length > 0}
    <div class="mt-4 mb-10">
        <h2 class="main text-xl">Události</h2>
        <EventList {events} person={p.id} />
        <!--pre class="mt-64">{JSON.stringify(events, null, 2)}</pre-->
    </div>
{/if}

{#if archiveItems.length > 0}
    <div class="mt-4">
        <h2 class="main text-xl mb-4">Archiv</h2>
        <ArchiveList items={archiveItems} />
    </div>
{/if}
