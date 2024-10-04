<script>
    import { archive } from "$lib/data.js";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
</script>

<svelte:head>
    <title>Archiv | Paralelní Polis</title>
</svelte:head>

<h1 class="main text-2xl mt-4 mb-8">Archiv ({archive.length})</h1>

<ArchiveList items={archive} />
