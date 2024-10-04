<script>
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import EventLink from "./EventLink.svelte";

    let { items } = $props();

    function shortText(str, maxSize = 400) {
        if (str.length > maxSize) {
            return str.substr(0, maxSize) + "..";
        }
        return str;
    }
</script>

<div class="grid grid-cols-1 gap-12">
    {#each items as item}
        <div>
            <div class="sm:flex gap-6">
                <div class="shrink-0 mb-2 sm:mb-0">
                    <a href="/v/{item.id}"
                        ><img
                            src="/archive/{item.img}"
                            alt={item.name}
                            class="w-full sm:w-48 lg:w-64 rounded aspect-video object-cover bg-gray-200 dark:bg-gray-800 border dark:border-white/5 border-black/5 hover:scale-110 transition-all"
                        /></a
                    >
                </div>
                <div>
                    <h2 class="text-2xl font-semibold mb-2">
                        <a href="/v/{item.id}" class="hover:underline"
                            >{item.name}</a
                        >
                    </h2>
                    <div class="flex flex-wrap items-center">
                        {#if item.people}
                            <PeopleBar people={item.people} />
                        {/if}
                        <EventLink event={item.event} />
                    </div>
                    <div class="mt-2 text-sm">
                        {shortText(item.desc.split("\n")[0])}
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
