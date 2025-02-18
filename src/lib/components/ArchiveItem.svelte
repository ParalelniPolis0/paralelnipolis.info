<script>
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import EventLink from "$lib/components/EventLink.svelte";
    import { imgHashUrl } from "$lib/utils.js";

    let { item, viewType } = $props();
</script>

<div class="w-full mb-2 group">
    <a href="/v/{item.id}" class="mt-0 block peer"
        ><img
            src={imgHashUrl("archive", item.imgHash, "m")}
            alt={item.name}
            class="w-full rounded aspect-video object-cover bg-gray-200 dark:bg-gray-800 border dark:border-white/5 border-black/5 hover:scale-105 transition-all"
        /></a
    >
    <a href="/v/{item.id}" class="block mt-2 mb-2 text-xl peer font-semibold"><h3>{item.name}</h3></a>
    <div class="flex flex-wrap gap-2">
        {#if item.people && item.people.length > 0}
            <PeopleBar people={item.people} size="text-md" />
        {/if}
        {#if viewType !== "event"}
            <EventLink event={item.event} />
        {/if}
    </div>
</div>
