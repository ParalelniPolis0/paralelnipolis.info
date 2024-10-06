<script>
    let { people, size } = $props();

    let sizePx = $derived(size === "small" ? 75 : 110);
</script>

{#if people.length === 0}
    <div class="text-xl">No results</div>
{:else}
    <div
        class="grid gap-4 {size === 'small'
            ? 'grid-cols-4 sm:grid-cols-8 lg:grid-cols-10'
            : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7'}"
    >
        {#each people as p}
            <div
                class="w-full text-center font-semibold {size === 'small'
                    ? 'text-sm'
                    : ''}"
            >
                <a href="/p/{p.id}"
                    ><img
                        src="/people/{p.img}"
                        class="w-full inline-block aspect-square object-cover {p.rand ===
                        1
                            ? '-rotate-0'
                            : '-rotate-0'} hover:-rotate-6 hover:scale-110 transition-all rounded bg-gray-200 dark:bg-gray-800 mb-2"
                    /></a
                >
                <a href="/p/{p.id}">{p.name}</a>
                <!--div class="font-normal"></div-->
            </div>
        {/each}
    </div>
{/if}
