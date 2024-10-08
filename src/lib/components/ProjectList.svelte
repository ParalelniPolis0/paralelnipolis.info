<script>
    const { arr, gray, type } = $props();
</script>

<div class="mt-8 w-full">
    {#each arr as p}
        <div class="mb-4 group p-2">
            <div class="flex gap-4 sm:gap-6">
                <div class="shrink-0 sm:mb-0 mb-4">
                    <a href="/{type === 'instance' ? 'i' : 'c'}/{p.id}">
                        <img
                            src="/{type === 'instance'
                                ? 'instances'
                                : 'projects'}/{p.img}"
                            alt={p.name}
                            class="aspect-square w-20 sm:w-24 object-cover bg-gray-200 dark:bg-gray-800 transition-all rounded {gray
                                ? 'grayscale group-hover:grayscale-0'
                                : ''} "
                        />
                    </a>
                </div>
                <div>
                    <h2 class="text-3xl font-semibold">
                        <a href="/{type === 'instance' ? 'i' : 'c'}/{p.id}"
                            >{p.name}</a
                        >
                        <span
                            class="font-normal text-lg opacity-50 block mt-1 sm:mt-0 sm:inline"
                            >{#if p.years}({p.years[0]} - {p.years[1]
                                    ? p.years[1]
                                    : ""}){/if}</span
                        >
                    </h2>
                    <!--{#if p.types}
                        <div class="flex gap-2 text-sm mt-1 text-gray-500">
                            {#each p.types as t}
                                <div
                                    class="rounded bg-gray-100 dark:bg-gray-900 px-1.5"
                                >
                                    {t}
                                </div>
                            {/each}
                        </div>
                    {/if}-->
                    {#if p.caption}
                        <div class="mt-2 hidden sm:block">{p.caption}</div>
                    {/if}
                    <!--div class="mt-2">{p.description || p.description_cs}</div-->
                </div>
            </div>
            {#if p.caption}
                <div class="block sm:hidden mt-2">{p.caption}</div>
            {/if}
        </div>
    {/each}
</div>
