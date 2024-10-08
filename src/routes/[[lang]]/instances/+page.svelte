<script>
    import { getContext } from "svelte";
    import { config, instances } from "$lib/data.js";
    import ProjectList from "$lib/components/ProjectList.svelte";

    const lang = getContext("lang");
</script>

<svelte:head>
    <title>{lang === "cs" ? "Instance" : "Instances"} | {config.title}</title>
</svelte:head>

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">{lang === "cs" ? "Instance" : "Instances"}</h1>
    <ProjectList arr={instances} type="instance" />
</div>
