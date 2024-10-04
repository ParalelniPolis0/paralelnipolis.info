<script>
    import { archive } from "$lib/data.js";
    import ArchiveList from "$lib/components/ArchiveList.svelte";
</script>

<h1 class="main text-2xl mt-4 mb-8">Archiv ({archive.length})</h1>

<ArchiveList items={archive} />
