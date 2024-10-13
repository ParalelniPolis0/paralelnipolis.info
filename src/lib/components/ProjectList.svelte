<script>
    import { projects } from "$lib/data.js";
    let { arr, gray, type } = $props();
    import { marked } from "marked";

    if (type === "instance") {
        arr = arr.map((instance) => {
            instance.activeProjects = projects
                .filter((i) => i.instances.includes(instance.id))
                .filter((i) => i.years && !i.years[1]);
            return instance;
        });
    }
</script>

{#snippet captionView(p)}
    {@html marked(p.caption)}
{/snippet}

<div class="mt-8 w-full">
    {#each arr as p}
        <div class="mb-8 group p-2">
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
                        <div class="mt-2 hidden sm:block">{@render captionView(p)}</div>
                    {/if}
                    {#if p.activeProjects?.length > 0}
                        <div class="grid grid-cols-1 gap-2 mt-4 ml-4">
                            {#each p.activeProjects as sp}
                                <div class="flex gap-3 items-center">
                                    <div>
                                        <img
                                            src="/projects/{sp.img}"
                                            class="w-8 rounded aspect-square object-cover"
                                            alt={sp.name}
                                        />
                                    </div>
                                    <div class="text-2xl">
                                        <a href="/c/{sp.id}">{sp.name}</a>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                    <!--div class="mt-2">{p.description || p.description_cs}</div-->
                </div>
            </div>
            {#if p.caption}
                <div class="block sm:hidden mt-2">
                    {@render captionView(p)}
                </div>
            {/if}
        </div>
    {/each}
</div>
