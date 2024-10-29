<script>
    import { people as allPeople, config } from "$lib/data.js";
    import { getContext, onMount } from "svelte";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";

    const lang = getContext("lang");
    const pageTitle = lang === "cs" ? "Lidé" : "People";

    let searchRef;
    let x = $state("");
    let people = $derived(filterPeople(x));

    onMount(() => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            //searchRef.focus();
        }
    });

    function filterPeople(str) {
        const re = new RegExp(str, "i");
        if (str === "") {
            return allPeople;
        }
        return allPeople.filter(
            (p) =>
                p.name.match(re) ||
                p.altNames?.find((an) => an.match(re)) ||
                p.refs?.twitter?.match(re),
        );
    }
</script>

<svelte:head>
    <title>{pageTitle} | {config.title}</title>
</svelte:head>

<div class="sm:flex flex-wrap gap-4 mt-4 mb-8 items-center">
    <h1 class="main text-2xl grow">{pageTitle}</h1>
    <!--div class="flex items-center gap-2 mt-2 sm:mt-2">
        <div class="text-xl opacity-50">
            {people.length}
            {#if people.length !== allPeople.length}/ {allPeople.length}{/if}
        </div>
        <div>
            <input
                type="text"
                class="border px-1.5 py-1 ml-1 rounded dark:bg-gray-800 dark:border-black"
                bind:value={x}
                placeholder="{lang === 'cs' ? 'Hledat' : 'Search'} ..."
                bind:this={searchRef}
            />
        </div>
    </div-->
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
