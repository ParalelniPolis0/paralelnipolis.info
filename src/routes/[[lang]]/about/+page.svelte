<script>
    import { getContext, onMount } from "svelte";
    import {
        config,
        people as allPeople,
        topics,
        structures,
    } from "$lib/data.js";
    import { marked } from "marked";
    //import ProjectList from "$lib/components/ProjectList.svelte";
    //import GuildList from "$lib/components/GuildList.svelte";
    import StructureList from "$lib/components/StructureList.svelte";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import AboutPageMd from "$lib/../pages/about.md";
    import TopicsList from "$lib/components/TopicsList.svelte";
    import { t } from "$lib/i18n.js";

    const lang = getContext("lang");
    //const activeInstances = instances.filter((p) => p.years && !p.years[1]);
    /*const historicalInstances = instances
        .filter((p) => p.years && p.years[1])
        .sort((x, y) => (x.years[1] > y.years[1] ? -1 : 1));*/

    let searchRef;
    let x = $state("");
    let people = $derived(allPeople.slice(0, 25));

    const activeStructures = $derived(
        structures.filter((s) => (s.years && !s.years[1]) || !s.years),
    );
    const globalStructures = $derived(activeStructures.filter((s) => !s.local));
    const localStructures = $derived(
        activeStructures
            .filter((s) => s.local)
            .sort((x, y) =>
                x.local === y.local
                    ? x.name < y.name
                        ? -1
                        : 1
                    : x.local > y.local
                      ? 1
                      : -1,
            ),
    );
    const pastStructures = $derived(
        structures.filter((s) => s.years && s.years[1]),
    );
</script>

<svelte:head>
    <title>{$t`About`} | {config.title}</title>
</svelte:head>

<div class="mt-4 mb-10">
    <h1 class="main text-2xl">{$t`About Paralelní Polis`}</h1>
    <div class="mt-8 mb-10 markdown !text-xl">
        {@html marked.parse(AboutPageMd)}
    </div>
</div>

<div>
    <div class="sm:flex flex-wrap gap-4 mt-4 mb-8 items-center">
        <h1 class="main text-2xl grow"><a href="/people">{$t`People`}</a></h1>
    </div>

    <PeopleGrid {people} showAll={allPeople.length} />
</div>

<div class="mb-10 mt-4" id="topics">
    <h1 class="main text-2xl">
        <a href="/topics">{$t`Topics`}</a>
    </h1>
    <TopicsList {topics} />
</div>

<div class="mb-12">
    <h1 class="main text-2xl mb-6 mt-4">{$t`Global Commonwealth`}</h1>
    <StructureList arr={globalStructures} />
</div>

<div class="mb-12">
    <h1 class="main text-2xl mb-6 mt-4">{$t`Regional Commonwealth`}</h1>
    <StructureList arr={localStructures} />
</div>

<div class="mb-12">
    <h1 class="main text-2xl mb-6 mt-4">{$t`Inactive Structures`}</h1>
    <StructureList arr={pastStructures} />
</div>

<!--div class="mb-10 mt-4">
    <h1 class="main text-2xl">
        Active <a href="/instances">Instances</a>
    </h1>
    <ProjectList arr={activeInstances} type="instance" />

    <div class="mt-4 text-xl italic">
        Want to start your own Parallel Polis? Check-out our
        <a
            href="https://github.com/ParalelniPolis0/ParalelniPolis-decentralized/blob/master/README.md"
            target="_blank">know-how and guidelines →</a
        >
    </div>
</div-->

<!--div class="mb-10 mt-4">
    <h1 class="main text-2xl mb-4 mt-4">
        Active <a href="/structures">Guilds</a>
    </h1>

    <GuildList {guilds} />
</div-->

<!--div class="flex flex-wrap gap-4">
    <div>
        <input type="checkbox" id="speakers" />
        <label for="speakers">Přednášející</label>
    </div>
    <div>
        <input type="checkbox" id="authors" />
        <label for="authors">Autoři</label>
    </div>
    <div>
        <input type="checkbox" id="members" />
        <label for="members">Členové</label>
    </div>
</div-->
