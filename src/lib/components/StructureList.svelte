<script>
    import { imgHashUrl } from "$lib/utils.js";
    const { arr } = $props();
</script>

<div class="grid grid-cols-1 gap-4">
    {#each arr as i}
        <div class="sm:flex gap-2 items-center">
            <div class="grow flex gap-3 items-center">
                <div class="">
                    {#if i.imgHash}
                        <img
                            src={imgHashUrl("structures", i.imgHash, "s")}
                            class="w-10 rounded aspect-square"
                            alt={i.name}
                        />
                    {:else}
                        <div
                            class="w-10 rounded aspect-square bg-gray-100 dark:bg-gray-900"
                        ></div>
                    {/if}
                </div>
                <div class="text-3xl grow">
                    {#if i.local}
                        <span
                            class="font-mono mr-1 opacity-50 text-2xl block sm:inline-block"
                            >{i.local}</span
                        >
                    {/if}
                    <a
                        href="/s/{i.id}"
                        class="font-semibold {!(
                            (i.years && !i.years[1]) ||
                            !i.years
                        )
                            ? 'line-through'
                            : ''}">{i.name}</a
                    >
                    <!--span class="opacity-50 text-lg"
                        >{i.years
                            ? ` (${i.years[0]} - ${i.years[1] ? i.years[1] : ""})`
                            : ""}</span
                    -->
                </div>
            </div>

            <div class="flex gap-2 mt-1.5 sm:mt-0 text-sm">
                {#each i.labels || [] as l}
                    <div
                        class="bg-gray-200 dark:bg-gray-800 py-0.5 px-1.5 rounded"
                    >
                        {l}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
