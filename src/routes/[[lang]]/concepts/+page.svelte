<script>
    import { projects, config } from "$lib/data.js";
    import { getContext } from "svelte";
    import ProjectList from "$lib/components/ProjectList.svelte";

    const lang = getContext("lang");

    const activeProjects = projects.filter((p) => p.years && !p.years[1]);
    const pastProjects = projects
        .filter((p) => p.years && p.years[1])
        .sort((x, y) => (x.years[1] > y.years[1] ? -1 : 1));
</script>

<svelte:head>
    <title>{lang === "cs" ? "Koncepty" : "Concepts"} | {config.title}</title>
</svelte:head>

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">
        {lang === "cs" ? "Aktivní koncepty" : "Active concepts"}
    </h1>
    <ProjectList arr={activeProjects} />
</div>

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">
        {lang === "cs" ? "Historické koncepty" : "Historical concepts"}
    </h1>
    <ProjectList arr={pastProjects} gray="true" />
</div>
