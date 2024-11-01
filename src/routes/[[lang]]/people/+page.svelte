<script>
    import { people as allPeople, config } from "$lib/data.js";
    import { getContext, onMount } from "svelte";
    import PeopleGrid from "$lib/components/PeopleGrid.svelte";
    import { t } from "$lib/i18n.js";

    const pageTitle = $t`People`;

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
</div>

<PeopleGrid {people} />
