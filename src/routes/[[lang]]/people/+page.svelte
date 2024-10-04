<script>
    import { people as allPeople } from "$lib/data.js";
    import { getContext, onMount } from "svelte";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";

    const lang = getContext("lang");
    const pageTitle = lang === "cs" ? "Lidé" : "People";

    let searchRef;
    let x = $state("");
    let people = $derived(
        x === ""
            ? allPeople
            : allPeople.filter((p) => p.name.match(new RegExp(x, "i"))),
    );

    onMount(() => {
        searchRef.focus();
    });
</script>

<svelte:head>
    <title>{pageTitle} | Paralelní Polis</title>
</svelte:head>

<div class="flex mt-4 mb-8">
    <h1 class="main text-2xl grow">{pageTitle}</h1>
    <div>
        {lang === "cs" ? "Hledat" : "Search"}:
        <input
            type="text"
            class="border px-1.5 py-1 ml-1 rounded dark:bg-gray-800 dark:border-black"
            bind:value={x}
            bind:this={searchRef}
        />
    </div>
</div>

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
<PeopleGrid {people} />
