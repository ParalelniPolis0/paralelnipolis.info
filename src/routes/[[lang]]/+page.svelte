<script>
    import { ArrowPath } from "svelte-heros-v2";
    import { getContext, onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { marked } from "marked";
    import { isFuture, addDays } from "date-fns";

    import { archive, config, glossary, structures, events } from "$lib/data.js";
    import ArchiveItem from "$lib/components/ArchiveItem.svelte";
    import StructureList from "$lib/components/StructureList.svelte";
    import EventBanner from "$lib/components/EventBanner.svelte";
    import TermBox from "$lib/components/TermBox.svelte";
    import { t, T } from "$lib/i18n.js";

    const lang = getContext("lang");
    const randomArchiveBase = $derived(
        archive.filter((i) => (i.lang && i.lang !== "cs") || !i.lang),
    );
    let randomVideos = $state(null); //getRandomVideos();
    let prevRandomVideos = null;
    const upcomingEvents = $derived(events.filter((e) => e.major && isFuture(addDays(new Date(e.date), (e.days || 1) + 1))).reverse().slice(0, 3));
    
    function getRandomVideos(len = 6, used = []) {
        let usedEvents = [];
        return new Array(len).fill(null).map(() => {
            let res;
            while (!res) {
                const rand =
                    randomArchiveBase[
                        Math.floor(Math.random() * randomArchiveBase.length)
                    ];
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
        randomVideos = getRandomVideos(6, prevRandomVideos);
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

<div class="mt-12">
    <h2 class="main text-2xl mb-8">Upcoming <a href="/events">Events</a></h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {#each upcomingEvents as event}
            <EventBanner {event} />
        {/each}
    </div>
</div>

<div class="mt-12">
    <h2 class="main text-2xl mb-8">
        <T msg="From #" ctx="main page - from glossary">
            <a href="/glossary">{$t`Glossary`}</a>
        </T>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-gray-50 dark:bg-gray-950 rounded">
            <TermBox term={glossary.find((g) => g.id === "cryptoanarchy")} />
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-950 rounded">
            <TermBox
                term={glossary.find((g) => g.id === "digital-self-defense")}
            />
        </div>
    </div>
</div>

{#if randomVideos}
    <div class="flex mt-8">
        <div class="grow"></div>
        <div class="w-full">
            <div class="flex items-center w-full">
                <h2 class="main text-2xl grow block">
                    <T msg="From #" ctx="home page - from archive">
                        <a href="/archive">{$t`archive`}</a>
                    </T>
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
    </div>
{/if}

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

<!--div class="mt-12">
    <h2 class="main text-2xl">Current <a href="/concepts">concepts</a></h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {#each projects.filter((p) => (p.years && !p.years[1]) || !p.years) as p}
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
</div-->
