<script>
    import { getContext } from "svelte";
    import { config, articles } from "$lib/data.js";
    import PeopleBar from "$lib/components/PeopleBar.svelte";

    const lang = getContext();
</script>

<svelte:head>
    <title>Articles | {config.title}</title>
</svelte:head>

<h1 class="main text-2xl mb-4 mt-4">Articles</h1>

<div class="mt-8">
    {#each articles as item}
        <div
            class="flex flex-wrap flex-col-reverse md:flex-row md:flex-nowrap gap-2"
        >
            <div class="grow">
                <h2 class="text-3xl font-semibold mb-2 mt-2 md:mt-0">
                    <a href="/a/{item.slugId}">{item.title}</a>
                </h2>
                <div class="flex gap-4 mb-4">
                    <div class="opacity-50">
                        {new Date(item.publishedAt).toLocaleString({
                            lang: "en",
                        })}
                    </div>
                    <PeopleBar people={item.authors} size="text-md" />
                </div>
                <div class="">
                    {item.excerpt}
                    <a href="/a/{item.slugId}">Read article →</a>
                </div>
            </div>
            <div class="shrink-0">
                <img
                    src={item.img}
                    alt={item.title}
                    class="w-64 rounded bg-gray-200 dark:bg-gray-800"
                />
            </div>
        </div>
    {/each}
</div>
