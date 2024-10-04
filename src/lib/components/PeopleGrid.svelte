<script>
    let { people, size } = $props();

    let sizePx = $derived(size === "small" ? 75 : 110);
</script>

<div class="flex {size === 'small' ? 'gap-1' : 'gap-4'} flex-wrap">
    {#each people as p}
        <div
            class="text-center font-semibold {size === 'small'
                ? 'text-sm'
                : ''}"
            style="width: {sizePx + 10}px;"
        >
            <a href="/u/{p.id}"
                ><img
                    src="/people/{p.img}"
                    style="width: {sizePx}px; height: {sizePx}px;"
                    class="inline-block aspect-square object-cover {p.rand === 1
                        ? '-rotate-0'
                        : '-rotate-0'} hover:-rotate-6 hover:scale-110 transition-all rounded bg-gray-200 dark:bg-gray-800 mb-2"
                /></a
            >
            <a href="/u/{p.id}">{p.name}</a>
            <!--div class="font-normal"></div-->
        </div>
    {/each}
</div>
