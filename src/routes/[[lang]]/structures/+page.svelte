<script>
    import { getContext } from "svelte";
    import { config, structures } from "$lib/data.js";
    //import GuildList from "$lib/components/GuildList.svelte";
    import StructureList from "$lib/components/StructureList.svelte";

    const lang = getContext();
    const activeStructures = $derived(
        structures.filter((s) => (s.years && !s.years[1]) || !s.years),
    );
    const globalStructures = $derived(activeStructures.filter((s) => !s.local));
    const localStructures = $derived(activeStructures.filter((s) => s.local));
    const pastStructures = $derived(
        structures.filter((s) => s.years && s.years[1]),
    );
</script>

<svelte:head>
    <title>Structures | {config.title}</title>
</svelte:head>

<div class="mb-12">
    <h1 class="main text-2xl mb-6 mt-4">Global Commonwealth</h1>
    <StructureList arr={globalStructures} />
</div>

<div class="mb-12">
    <h1 class="main text-2xl mb-6 mt-4">Local Commonwealth</h1>
    <StructureList arr={localStructures} />
</div>

<div class="mb-12">
    <h1 class="main text-2xl mb-6 mt-4">Inactive Structures</h1>
    <StructureList arr={pastStructures} />
</div>

<!--
<h1 class="main text-2xl mb-4 mt-4">Active Guilds</h1>
<GuildList {guilds} />
-->
