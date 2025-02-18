<script>
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import StructureLink from "$lib/components/StructureLink.svelte";
    import ArchiveItem from "./ArchiveItem.svelte";
    import EventLink from "./EventLink.svelte";
    import { shortText, imgHashUrl } from "$lib/utils.js";
    import { onMount } from "svelte";
    import { pushState } from "$app/navigation";

    let {
        items: allItems,
        type = "list",
        pagination = false,
        cursor: pageCursor,
    } = $props();

    const perPage = 25;

    let cursor = $state(
        pageCursor ? pageCursor.split(",").map(Number) : [0, perPage],
    );
    $inspect(cursor);
    let items = $derived(pagination ? allItems.slice(...cursor) : allItems);

    onMount(() => {
        let changing = false;
        const scrollListener = () => {
            if (changing) {
                return;
            }
            const rect = document
                .getElementById("archive-list")
                .getBoundingClientRect();
            //console.log(rect.bottom, rect.top, rect.height);
            if (rect.bottom < window.innerHeight * 2) {
                changing = true;
                const newCursor = [
                    cursor[0],
                    cursor[1] + perPage > allItems.length
                        ? allItems.length
                        : cursor[1] + perPage,
                ];
                console.log(
                    `chaning cursor: ${newCursor.join(", ")}`,
                    items.length,
                    cursor,
                );
                cursor = newCursor;
                //setTimeout(() => {
                changing = false;
                //pushState(`/archive/${newCursor.join(",")}`);
                //});
            }
        };
        window.addEventListener("scroll", scrollListener);
        return () => {
            window.removeEventListener("scroll", scrollListener);
        };
    });
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
    <div class="grid grid-cols-1 gap-12" id="archive-list">
        {#each items as item}
            <div class="archive-item">
                <div class="sm:flex gap-6">
                    <div class="shrink-0 mb-2 sm:mb-0">
                        <a href="/v/{item.id}" class="image-link"
                            ><img
                                src={imgHashUrl("archive", item.imgHash, "m")}
                                alt={item.name}
                                class="w-full sm:w-48 lg:w-64 rounded aspect-video object-cover bg-gray-200 dark:bg-gray-800 border dark:border-white/5 border-black/5 hover:scale-110 transition-all"
                            /></a
                        >
                    </div>
                    <div class="content-area">
                        <h2 class="text-2xl font-semibold mb-2">
                            <a href="/v/{item.id}" class="hover:underline title-link"
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

<style>
    .archive-item:has(.image-link:hover) .title-link {
        @apply decoration-yellow-500/80 dark:decoration-yellow-500/80;
    }

    .archive-item:hover .image-link > img {
        @apply scale-110 transition-all;
    }

</style>