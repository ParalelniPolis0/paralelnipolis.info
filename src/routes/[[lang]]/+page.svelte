<script>
    import { ArrowPath } from "svelte-heros-v2";
    import { getContext, onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { marked } from "marked";

    import { archive, projects, friends, config } from "$lib/data.js";
    import ArchiveItem from "../../lib/components/ArchiveItem.svelte";

    const lang = getContext("lang");
    let randomVideos = null; //getRandomVideos();
    let prevRandomVideos = null;

    function getRandomVideos(len = 3, used = []) {
        let usedEvents = [];
        return new Array(len).fill(null).map(() => {
            let res;
            while (!res) {
                const rand =
                    archive[Math.floor(Math.random() * archive.length)];
                if (
                    !used.includes(rand.id) &&
                    !usedEvents.includes(rand.event)
                ) {
                    res = rand;
                } else {
                    used.push(rand.id);
                    usedEvents.push(rand.event);
                }
            }
            return res;
        });
    }
    function refreshArchive(e) {
        e.preventDefault();
        prevRandomVideos = randomVideos.map((v) => v.id);
        randomVideos = getRandomVideos(3, prevRandomVideos);
    }

    onMount(() => {
        randomVideos = getRandomVideos();
    });
</script>

<svelte:head>
    <title>{config.title}</title>
</svelte:head>

<div class="mt-8 mb-10 text-xl">
    {@html marked.parse(config.description || config.description_cs)}
</div>

<div class="mt-8">
    <h2 class="main text-2xl">Current <a href="/concepts">concepts</a></h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {#each projects.filter((p) => !p.years[1]) as p}
            <div
                class="flex gap-4 group cursor-pointer items-center"
                onclick={() => goto("/c/" + p.id)}
            >
                <div class="shrink-0">
                    <a href="/c/{p.id}">
                        <img
                            src="/projects/{p.img}"
                            alt={p.name}
                            class="w-20 aspect-square object-cover rounded transition-all"
                        />
                    </a>
                </div>
                <div class="text-2xl font-semibold">
                    <a
                        href="/c/{p.id}"
                        class="group-hover:decoration-yellow-500/80">{p.name}</a
                    >
                </div>
            </div>
        {/each}
    </div>
</div>

<div class="flex mt-12">
    <div class="grow"></div>
    {#if randomVideos}
        <div class="w-full">
            <div class="flex items-center w-full">
                <h2 class="main text-2xl grow block">
                    {#if lang === "cs"}
                        Z <a href="/cs/archive">archivu</a>
                    {:else}
                        From <a href="/archive">archive</a>
                    {/if}
                </h2>
                <a
                    class="cursor-pointer block hover:bg-gray-200 p-2 dark:hover:bg-gray-800"
                    href="/archive"
                    onclick={refreshArchive}
                >
                    <ArrowPath />
                </a>
            </div>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-4"
            >
                {#each randomVideos as item}
                    <ArchiveItem {item} />
                {/each}
            </div>
        </div>
    {/if}
</div>

<!--div class="mt-12">
    <h2 class="main text-2xl">Our friends</h2>
    <div class="mt-4 grid grid-cols-5 gap-8">
        {#each friends as item}
            <div class="text-2xl">
                <a
                    href={item.refs?.web}
                    class="flex items-center align-middle m-2"
                    ><img
                        src="/friends/{item.img}"
                        class="w-full"
                        alt={item.name}
                    /></a
                >
            </div>
        {/each}
    </div>
</div-->
