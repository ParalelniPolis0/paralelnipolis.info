<script>
    import { parse } from "marked";
    import { glossary } from "$lib/data.js";

    const sortedGlossary = $derived(
        glossary.sort((x, y) => (x.name > y.name ? 1 : -1)),
    );
</script>

<h1 class="main text-2xl mb-4 mt-4">Glossary</h1>

<div class="mt-8 grid grid-cols-1 gap-8">
    {#each sortedGlossary as i}
        <div>
            <h2 class="text-3xl"><a href="/t/{i.id}">{i.name}</a></h2>
            {#if i.description}
                <div class="mt-2 markdown">
                    {@html parse(
                        i.description?.split("\n\n")[0] +
                            ` <a href="/t/${i.id}" class="whitespace-nowrap">Read more →</a>`,
                    )}
                </div>
            {/if}
        </div>
    {/each}
</div>
