<script>
    import { eventToIntervalString } from "$lib/utils.js";
    import { differenceInDays } from "date-fns";
    const { event } = $props();
</script>

<div class="flex gap-6 w-full">
    <!--div class="justify-center items-center flex">
        <div class="opacity-75">
            <div class="text-center text-2xl">{differenceInDays(new Date(event.date), new Date())}</div>
            <div class="text-xs">days left</div>
        </div>
    </div-->
    <div>
        <h3 class="text-3xl font-semibold mb-2"><a href="/e/{event.id}">{event.shortname || event.name}</a></h3>
        <div class="text-xl opacity-75">{eventToIntervalString(event)} ▸ {event.place.city}, {event.place.country.toUpperCase()}</div>
    </div>
</div>