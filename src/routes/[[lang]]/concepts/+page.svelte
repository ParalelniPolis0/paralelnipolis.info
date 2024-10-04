<script>
    import { projects } from "$lib/data.js";
    import { getContext } from "svelte";
    
    const lang = getContext("lang");

    const activeProjects = projects.filter(p => p.years && !p.years[1])
    const pastProjects = projects.filter(p => p.years && p.years[1]).sort((x, y) => x.years[1] > y.years[1] ? -1 : 1)
</script>

<svelte:head>
    <title>{lang === "cs" ? "Koncepty" : "Concepts"} | Paralelní Polis</title>
</svelte:head>


{#snippet projectList(arr, gray = false)}
    <div class="mt-8">
        {#each arr as p}
            <div class="mb-3 flex gap-6 group p-2">
                <div>
                    <img src="/projects/{p.img}" alt={p.name} class="aspect-square w-24 object-cover bg-gray-200 dark:bg-gray-800 group-hover:scale-125 transition-all rounded {gray ? "grayscale group-hover:grayscale-0" : ""} " />
                </div>
                <div>
                    <h2 class="text-2xl font-semibold">
                        <a href="/p/{p.id}">{p.name}</a>
                        <span class="font-normal text-sm opacity-50"
                            >{#if p.years}({p.years[0]} - {p.years[1]
                                    ? p.years[1]
                                    : ""}){/if}</span
                        >
                    </h2>
                    {#if p.types}
                        <div class="flex gap-2 text-sm mt-1 text-gray-500">
                            {#each p.types as t}
                                <div class="rounded bg-gray-100 dark:bg-gray-900 px-1.5">
                                    {t}
                                </div>
                            {/each}
                        </div>
                    {/if}
                <!--div class="mt-2">{p.description || p.description_cs}</div-->
                </div>
            </div>
        {/each}
    </div>
{/snippet}

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">{lang === "cs" ? "Aktivní koncepty" : "Active concepts"}</h1>
    {@render projectList(activeProjects)}
</div>

<div class="mb-10 mt-4">
    <h1 class="main text-2xl">{lang === "cs" ? "Historické koncepty" : "Historical concepts"}</h1>
    {@render projectList(pastProjects, true)}
</div>