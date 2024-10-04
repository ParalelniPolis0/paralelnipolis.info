<script>
    import { archive, projects, people, config } from "$lib/data.js";
    import RefsBar from "$lib/components/RefsBar.svelte";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
    import EventList from "$lib/components/EventList.svelte";
    import { getContext } from "svelte";

    const lang = getContext("lang");

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

    const contributorProjectsIds = $derived(p.roles?.map((r) => r.project));
    const contributorProjects = $derived(
        projects.filter((pr) => contributorProjectsIds?.includes(pr.id)),
    );
</script>

<svelte:head>
    <title>{p.name} | {config.title}</title>
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

{#if contributorProjects.length > 0}
    <div class="mt-4 mb-14">
        <h2 class="main text-xl mb-4">
            {lang === "cs" ? "Přispěvatel" : "Contributor"}
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {#each contributorProjects as cp}
                <div class="flex gap-4 items-center">
                    <a href="/c/{cp.id}" class="block shrink-0">
                        <img
                            src="/projects/{cp.img}"
                            alt={cp.name}
                            class="w-12 aspect-square object-cover rounded bg-gray-200 dark:bg-gray-800"
                        />
                    </a>
                    <div>
                        <a href="/c/{cp.id}" class="text-2xl font-semibold"
                            >{cp.name}</a
                        >
                    </div>
                </div>
            {/each}
        </div>
        <!--pre class="mt-64">{JSON.stringify(events, null, 2)}</pre-->
    </div>
{/if}

{#if events.length > 0}
    <div class="mt-4 mb-14">
        <h2 class="main text-xl">{lang === "cs" ? "Události" : "Events"}</h2>
        <EventList {events} person={p.id} />
        <!--pre class="mt-64">{JSON.stringify(events, null, 2)}</pre-->
    </div>
{/if}

{#if archiveItems.length > 0}
    <div class="mt-4">
        <h2 class="main text-xl mb-4">
            {lang === "cs" ? "Archiv" : "Archive"}
        </h2>
        <ArchiveList items={archiveItems} />
    </div>
{/if}
