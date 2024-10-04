<script>
    import { archive, config } from "$lib/data.js";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
    import { getContext, onMount } from "svelte";
    import { Squares2x2, ListBullet } from "svelte-heros-v2";

    const lang = getContext("lang");
    let type = $state("list");

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
        const url = new URL(window.location);
        const viewParam = url.searchParams.get("view");
        console.log(viewParam);
        if (viewParam) {
            type = viewParam;
        }
    });
</script>

<svelte:head>
    <title>{lang === "cs" ? "Archiv" : "Archive"} | {config.title}</title>
</svelte:head>

<div class="flex mt-4 mb-8 gap-4">
    <h1 class="block grow main text-2xl">
        {lang === "cs" ? "Archiv" : "Archive"} ({archive.length})
    </h1>
    <div>
        <button
            class="pointer-cursor p-2 hover:bg-gray-200 hover:dark:bg-gray-800"
            onclick={switchType}
            >{#if type === "list"}<Squares2x2 />{:else}<ListBullet
                />{/if}</button
        >
    </div>
</div>

<ArchiveList items={archive} {type} />
