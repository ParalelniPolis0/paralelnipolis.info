<script>
    import { getContext, onMount } from "svelte";
    import { config, events as allEvents } from "$lib/data.js";
    import { isFuture, addDays } from "date-fns";
    import EventList from "$lib/components/EventList.svelte";
    import { t } from "$lib/i18n.js";

    let onlyMajor = $state(true);

    function showEndDate (e) {
        return addDays(new Date(e.date), (e.days || 1) + 1);
    }

    const lang = getContext("lang");
    const pastEvents = $derived(
        allEvents
            .filter((e) => !isFuture(showEndDate(e)))
            .filter((e) => (onlyMajor ? e.major : e)),
    );
    const upcomingEvents = $derived(
        allEvents.filter((e) => isFuture(showEndDate(e))),
    );
</script>

<svelte:head>
    <title>{$t`Events`} | {config.title}</title>
</svelte:head>

{#if upcomingEvents.length > 0}
    <div class="mb-10 mt-4">
        <h1 class="main text-2xl mb-6">{$t`Upcoming events`}</h1>

        <EventList events={upcomingEvents} />
    </div>
{/if}

<div class="mb-10 mt-4">
    <div class="flex gap-6 items-center mb-6">
        <h1 class="main text-2xl grow">
            {$t`Past events`}
        </h1>
        <div class="text-lg">
            <input id="onlyMajor" type="checkbox" bind:checked={onlyMajor} />
            <label for="onlyMajor" class="cursor-pointer"
                >{$t({ message: "Only major", context: "event list" })}</label
            >
        </div>
    </div>

    <EventList events={pastEvents} />
</div>
