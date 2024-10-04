<script>
    import { archive } from "$lib/data.js";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
    import { getContext } from "svelte";

    const lang = getContext("lang");
</script>

<svelte:head>
    <title>{lang === "cs" ? "Archiv" : "Archive"} | Paralelní Polis</title>
</svelte:head>

<h1 class="main text-2xl mt-4 mb-8">
    {lang === "cs" ? "Archiv" : "Archive"} ({archive.length})
</h1>

<ArchiveList items={archive} />
