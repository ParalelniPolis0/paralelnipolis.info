<script>
    import { parse } from "marked";
    import { config } from "$lib/data.js";
    import PeopleBar from "$lib/components/PeopleBar.svelte";

    const { data } = $props();
    const i = $derived(data.item);
</script>

<svelte:head>
    <title>{i.title} | {config.title}</title>
</svelte:head>

<div class="max-w-3xl mx-auto">
    <div class="mb-2 mt-4 flex gap-4 items-center">
        <h1 class="text-4xl font-semibold">{i.title}</h1>
    </div>

    <div class="flex gap-4 items-center mb-4">
        <div class="text-xl opacity-50">
            {new Date(i.publishedAt).toLocaleString({
                lang: "en",
            })}
        </div>
        <PeopleBar people={i.authors} />
    </div>

    <div class="mt-8 mb-8">
        <div class="markdown markdown-lg">
            {@html i.html}
        </div>
    </div>

    <div class="opacity-50">
        <a href="/a/{i.id}" class="no-underline">{i.id}</a>
    </div>
</div>
