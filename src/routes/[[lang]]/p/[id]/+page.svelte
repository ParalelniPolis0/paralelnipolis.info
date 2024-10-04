<script>
    import { people } from "$lib/data.js";
    import { addDays } from "date-fns";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import RefsBar from "$lib/components/RefsBar.svelte";
    import { getContext } from "svelte";

    const lang = getContext("lang");

    const { data } = $props();
    const p = $derived(data.item);
    const events = $derived(
        p.events && p.events.sort((x, y) => (x.date < y.date ? 1 : -1)),
    );
</script>

<svelte:head>
    <title>{p.name} | Paralelní Polis</title>
</svelte:head>

<div class="flex gap-6 mt-4">
    <div class="grow">
        <h1 class="text-4xl font-semibold">{p.name}</h1>
        <RefsBar refs={p.refs} />
        <div class="mt-4">{p.description || p.description_cs}</div>
    </div>
    <div class="shrink-0">
        <img
            src="/projects/{p.img}"
            alt={p.name}
            class="w-64 h-64 aspect-square object-cover rounded"
        />
    </div>
</div>

{#if p.events}
    <div class="mt-8">
        <h2 class="text-2xl main">{lang === "cs" ? "Události" : "Events"}</h2>
        <div class="grid grid-cols-1 gap-10 mt-4">
            {#each events as e}
                <div id={e.id}>
                    <div class="flex flex-wrap">
                        <h3 class="text-3xl font-semibold grow">
                            {e.name}
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

                    <div class="ml-2">
                        {#if e.speakers}
                            <PeopleGrid
                                size="small"
                                people={e.speakers.map((s) =>
                                    people.find((p) => p.id === s),
                                )}
                            />
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}
