<script>
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import EventLink from "$lib/components/EventLink.svelte";

    let { item } = $props();
</script>

<div class="w-full">
    <div class="mt-0">
        <a href="/v/{item.id}"
            ><img
                src="/archive/{item.img}"
                alt={item.name}
                class="w-full rounded aspect-video object-cover bg-gray-200 dark:bg-gray-800 border dark:border-white/5 border-black/5"
            /></a
        >
    </div>
    <div class="mt-2 mb-2 text-xl">
        <a href="/v/{item.id}"><h3>{item.name}</h3></a>
    </div>
    <div class="flex flex-wrap gap-2">
        <PeopleBar people={item.people} size="text-md" />
        <EventLink event={item.event} />
    </div>
</div>
