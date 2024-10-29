<script>
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import StructureLink from "$lib/components/StructureLink.svelte";
    import ArchiveItem from "./ArchiveItem.svelte";
    import EventLink from "./EventLink.svelte";
    import { shortText, imgHashUrl } from "$lib/utils.js";

    let { items, type = "list" } = $props();
</script>

{#if items.length === 0}
    <div class="text-2xl">No results</div>
{:else if type === "grid"}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {#each items as item}
            <ArchiveItem {item} />
        {/each}
    </div>
{:else}
    <div class="grid grid-cols-1 gap-12">
        {#each items as item}
            <div>
                <div class="sm:flex gap-6">
                    <div class="shrink-0 mb-2 sm:mb-0">
                        <a href="/v/{item.id}"
                            ><img
                                src={imgHashUrl("archive", item.imgHash, "m")}
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
                        <div class="flex flex-wrap items-center gap-2">
                            {#if item.people}
                                <PeopleBar people={item.people} />
                            {/if}
                            <EventLink event={item.event} />
                            <div>
                                by <StructureLink id={item.target} />
                            </div>
                            {#if item.duration}
                                <div class="opacity-50 text-sm">
                                    {Math.round(item.duration / 60)}m
                                </div>
                            {/if}
                        </div>
                        <div class="mt-2 text-sm">
                            {shortText(item.desc.split("\n")[0])}
                            <span class="opacity-50"
                                >({item.publishedAt.slice(0, 10)})</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}
