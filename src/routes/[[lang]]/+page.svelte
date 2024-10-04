<script>
    import { ArrowPath } from "svelte-heros-v2";
    import { archive } from "$lib/data.js";
    import ArchiveItem from "../../lib/components/ArchiveItem.svelte";
    import { getContext, onMount } from "svelte";

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
    <title>Paralelní Polis</title>
</svelte:head>

<p>
    Paralelní Polis je nestátní nezisková organizace, kterou v roce 2014 v
    pražských Holešovicích založila umělecká aktivistická skupina Ztohoven. Misí
    Paralelní Polis je poskytovat technologie a vzdělání, které lidé potřebují
    pro zapojení do nezávislé společnosti a na ochranu individuální svobody.
    Vizí Paralelní Polis je svět, kde lidé mají možnost odloučit se od státu a
    žít ve svobodné společnosti.
</p>

<div class="flex mt-8">
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
                    class="cursor-pointer block"
                    href="/archive"
                    onclick={refreshArchive}
                >
                    <ArrowPath />
                </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
                {#each randomVideos as item}
                    <ArchiveItem {item} />
                {/each}
            </div>
        </div>
    {/if}
</div>
