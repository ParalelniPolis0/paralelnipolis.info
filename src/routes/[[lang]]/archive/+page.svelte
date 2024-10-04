<script>
    import { archive } from "$lib/data.js";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
    import { getContext } from "svelte";
    import { Squares2x2, ListBullet } from "svelte-heros-v2";

    const lang = getContext("lang");
    const { data } = $props();
    let type = $state(data.type);

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
</script>

<svelte:head>
    <title>{lang === "cs" ? "Archiv" : "Archive"} | Paralelní Polis</title>
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
