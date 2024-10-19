<script>
    import { getContext } from "svelte";
    import { config, events as allEvents } from "$lib/data.js";
    import EventList from "$lib/components/EventList.svelte";

    const lang = getContext("lang");
    const pastEvents = $derived(allEvents);
    const upcomingEvents = [];
</script>

<svelte:head>
    <title>Events | {config.title}</title>
</svelte:head>

{#if upcomingEvents.length > 0}
    <div class="mb-10 mt-4">
        <h1 class="main text-2xl mb-6">
            {lang === "cs" ? "Nadcházející události" : "Upcoming events"}
        </h1>
    </div>
{/if}

<div class="mb-10 mt-4">
    <h1 class="main text-2xl mb-6">Past events</h1>

    <EventList events={pastEvents} />
</div>

<!--div class="grid grid-cols-1 gap-4">
    {#each pastEvents as e}
        <div>
            <h2 class="text-2xl">{e.name}</h2>
        </div>
    {/each}
</div-->
