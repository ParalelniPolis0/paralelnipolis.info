<script>
    import { getContext } from "svelte";
    import { config, instances } from "$lib/data.js";
    import ProjectList from "$lib/components/ProjectList.svelte";

    const lang = getContext("lang");
    const activeInstances = instances.filter((p) => p.years && !p.years[1]);
    const historicalInstances = instances
        .filter((p) => p.years && p.years[1])
        .sort((x, y) => (x.years[1] > y.years[1] ? -1 : 1));
</script>

<svelte:head>
    <title>{lang === "cs" ? "Instance" : "Instances"} | {config.title}</title>
</svelte:head>

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">
        {lang === "cs" ? "Aktivní instance" : "Active instances"}
    </h1>
    <ProjectList arr={activeInstances} type="instance" />

    <div class="mt-4 text-xl italic">
        Want to start your own Parallel Polis? Check-out our
        <a
            href="https://github.com/ParalelniPolis0/ParalelniPolis-decentralized/blob/master/README.md"
            target="_blank">know-how and guidelines →</a
        >
    </div>
</div>

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">
        {lang === "cs" ? "Historické instance" : "Historical instances"}
    </h1>
    <ProjectList arr={historicalInstances} type="instance" />
</div>
