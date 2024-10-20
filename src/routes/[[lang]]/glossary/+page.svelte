<script>
    import { parse } from "marked";
    import { glossary } from "$lib/data.js";
    import TermBox from "$lib/components/TermBox.svelte";

    const sortedGlossary = $derived(
        glossary.sort((x, y) => (x.name > y.name ? 1 : -1)),
    );
</script>

<h1 class="main text-2xl mb-4 mt-4">
    <a href="/c/parallel-glossary">Parallel Glossary</a>
</h1>

<div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    {#each sortedGlossary as i}
        <div class="p-4 bg-gray-50 dark:bg-gray-950 rounded">
            <TermBox term={i} />
        </div>
    {/each}
</div>
