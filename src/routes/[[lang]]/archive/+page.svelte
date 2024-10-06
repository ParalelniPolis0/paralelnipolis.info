<script>
    import { archive as allArchive, config } from "$lib/data.js";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
    import { getContext, onMount } from "svelte";
    import { Squares2x2, ListBullet } from "svelte-heros-v2";

    const lang = getContext("lang");
    let type = $state("list");
    let x = $state("");

    let archive = $derived(filterArchive(x));
    let totalDuration = $derived(
        allArchive.reduce((total, cur) => total + (cur.duration || 0), 0),
    );
    let totalAuthors = $derived(
        allArchive.reduce(
            (all, cur) =>
                all.concat(cur.people.filter((p) => !all.includes(p))),
            [],
        ).length,
    );
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
    <title>{lang === "cs" ? "Archiv" : "Archive"} | {config.title}</title>
</svelte:head>

<div class="mt-4 text-xl mb-8">
    Our archive contains <strong>{allArchive.length} videos</strong> from
    <strong>{totalAuthors} authors</strong>
    and <strong>{totalEvents} events</strong>
    with a total length of
    <strong>{Math.round((totalDuration / 60 / 24) * 100) / 100} hours</strong>.
</div>

<div class="sm:flex mt-4 mb-8 gap-4 items-center">
    <h1 class="block grow main text-2xl">
        {lang === "cs" ? "Archiv" : "Archive"}
    </h1>
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
                placeholder="{lang === 'cs' ? 'Hledat' : 'Search'} ..."
                bind:this={searchRef}
            />
        </div>
    </div>
</div>

<ArchiveList items={archive} {type} />
