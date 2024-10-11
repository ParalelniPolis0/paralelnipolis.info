<script>
    import { getContext } from "svelte";
    import { config } from "$lib/data.js";

    const lang = getContext("lang");
</script>

<svelte:head>
    <title>{lang === "cs" ? "Instance" : "Instances"} | {config.title}</title>
</svelte:head>

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">
        {lang === "cs" ? "Nadcházející události" : "Upcoming events"}
    </h1>
</div>
