<script>
    import { parse } from "marked";
    import { glossary } from "$lib/data.js";
    import TermBox from "$lib/components/TermBox.svelte";

    const sortedGlossary = $derived(
        glossary.sort((x, y) => (x.name > y.name ? 1 : -1)),
    );

    function findMissingLinks(arr) {
        const out = [];
        for (const item of arr) {
            if (!item.links) {
                continue;
            }
            for (const l of item.links) {
                if (l.target) {
                    continue;
                }
                const link = l.link || l.key;
                const found = out.find((x) => x.link === link);
                if (found) {
                    found.pages.push(item.id);
                } else {
                    out.push({ link, pages: [item.id] });
                }
            }
        }
        return out.sort((x, y) => (x.pages.length < y.pages.length ? 1 : -1));
    }

    const missingLinks = $derived(findMissingLinks(glossary));
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

<div class="mt-8 text-2xl">Missing links</div>
<div class="mt-4 grid grid-cols-1 gap-2">
    {#each missingLinks as ml}
        <div>
            {ml.link} ({ml.pages.length}) - {@html ml.pages
                .map((p) => `<a href="/t/${p}">${p}</a>`)
                .join(", ")}
        </div>
    {/each}
</div>
