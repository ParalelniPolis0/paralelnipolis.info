<script>
    import { getContext } from "svelte";
    import { config, guilds } from "$lib/data.js";
    import GuildList from "$lib/components/GuildList.svelte";

    const lang = getContext();
</script>

<svelte:head>
    <title>Structures | {config.title}</title>
</svelte:head>

<h1 class="main text-2xl mb-4 mt-4">Active Guilds</h1>

<GuildList {guilds} />
