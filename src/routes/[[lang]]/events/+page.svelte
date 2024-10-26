<script>
    import { getContext } from "svelte";
    import { config, events as allEvents } from "$lib/data.js";
    import { isFuture } from "date-fns";
    import EventList from "$lib/components/EventList.svelte";

    const lang = getContext("lang");
    const pastEvents = $derived(
        allEvents.filter((e) => !isFuture(new Date(e.date))),
    );
    const upcomingEvents = $derived(
        allEvents.filter((e) => isFuture(new Date(e.date))),
    );
</script>

<svelte:head>
    <title>Events | {config.title}</title>
</svelte:head>

{#if upcomingEvents.length > 0}
    <div class="mb-10 mt-4">
        <h1 class="main text-2xl mb-6">Upcoming events</h1>

        <EventList events={upcomingEvents} />
    </div>
{/if}

<div class="mb-10 mt-4">
    <h1 class="main text-2xl mb-6">Past events</h1>

    <EventList events={pastEvents} />
</div>
