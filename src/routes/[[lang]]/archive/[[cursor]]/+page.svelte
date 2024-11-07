<script>
    import { archive as allArchive, config } from "$lib/data.js";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
    import MetaTags from "$lib/components/MetaTags.svelte";
    import { getContext, onMount } from "svelte";
    import { Squares2x2, ListBullet } from "svelte-heros-v2";
    import { t, T } from "$lib/i18n.js";

    const lang = getContext("lang");
    let type = $state("list");
    let x = $state("");

    const { data } = $props();
    const cursor = $derived(data.cursor);

    let archive = $derived(filterArchive(x));
    let totalDuration = $derived(
        allArchive.reduce((total, cur) => total + (cur.duration || 0), 0),
    );
    const authors = [];
    for (const i of allArchive) {
        if (!i.people) {
            continue;
        }
        for (const ip of i.people) {
            const id = ip.split("|").at(-1);
            if (!authors.includes(id)) {
                authors.push(id);
            }
        }
    }
    let totalAuthors = $derived(authors.length);
    let totalEvents = $derived(
        allArchive.reduce(
            (all, cur) =>
                !all.includes(cur.event) ? all.concat([cur.event]) : all,
            [],
        ).length,
    );
    let searchRef;

    function filterArchive(str) {
        if (str === "") {
            return allArchive;
        }
        const re = new RegExp(str, "i");
        return allArchive.filter((i) => {
            return i.name.match(re);
        });
    }

    function switchType() {
        let param = "";
        if (type === "list") {
            type = "grid";
            param = "grid";
        } else {
            type = "list";
        }

        const url = new URL(window.location);
        if (param) {
            url.searchParams.set("view", param);
        } else {
            url.searchParams.delete("view");
        }
        window.history.pushState({}, "", url);
    }

    onMount(() => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            searchRef.focus();
        }

        const url = new URL(window.location);
        const viewParam = url.searchParams.get("view");
        if (viewParam) {
            type = viewParam;
        }
    });
</script>

<svelte:head>
    <MetaTags
        title={$t`Talks`}
        description={$t`Our archive contains ${allArchive.length} videos from ${totalAuthors} authors and ${totalEvents} events with a total length of ${Math.round((totalDuration / 60 / 24) * 100) / 100} hours.`}
        url="https://{config.host}/archive"
    />
</svelte:head>

<div class="mt-4 text-xl mb-8">
    <T msg="Our archive contains # " ctx="archive counter - number of videos">
        <strong>{allArchive.length} {$t`videos`}</strong>
    </T>
    <T msg="from #" ctx="archive counter - number of authors">
        <a href="/people"><strong>{totalAuthors} {$t`authors`}</strong></a>
    </T>
    <T msg="and #" ctx="archive counter - number of events">
        <a href="/events"><strong>{totalEvents} {$t`events`}</strong></a>
    </T>
    <T
        msg="with a total length of #."
        ctx="archive counter - total length in hours"
    >
        <strong
            >{Math.round((totalDuration / 60 / 24) * 100) / 100}
            {$t`hours`}</strong
        >
    </T>
</div>

<div class="sm:flex mt-4 mb-8 gap-4 items-center">
    <h1 class="block grow main text-2xl">{$t`Latest Talks & Videos`}</h1>
    <div class="flex mt-2 sm:mt-0 gap-4 items-center">
        <div class="text-xl opacity-50">
            {archive.length}
            {#if archive.length !== allArchive.length}/ {allArchive.length}{/if}
        </div>
        <div class="hidden sm:block">
            <button
                class="pointer-cursor p-1.5 hover:bg-gray-200 hover:dark:bg-gray-800"
                onclick={switchType}
                >{#if type === "list"}<Squares2x2 />{:else}<ListBullet
                    />{/if}</button
            >
        </div>
        <div>
            <input
                type="text"
                class="border px-1.5 py-1 ml-1 rounded dark:bg-gray-800 dark:border-black"
                bind:value={x}
                placeholder="{$t`Search`} ..."
                bind:this={searchRef}
            />
        </div>
    </div>
</div>

<ArchiveList items={archive} pagination="true" {cursor} {type} />
